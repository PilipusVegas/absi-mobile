import moment from 'moment';
import {useState, useEffect} from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, Image, Alert, Modal, Linking, Keyboard, TextInput, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

const AbsiLogin = ({onLoginSuccess, enableFingerprint}) => {
  const companyOptions = ['VISTA'];
  const [company, setCompany] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRamadan, setIsRamadan] = useState(false);
  const [modalTelepon, setModalTelepon] = useState('');
  const [saveAccount, setSaveAccount] = useState(false);
  const [modalUsername, setModalUsername] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [validCredentials, setValidCredentials] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isModalButtonDisabled, setIsModalButtonDisabled] = useState(true);
  const [isPasswordRecoveryVisible, setIsPasswordRecoveryVisible] = useState(false);
  const togglePasswordVisibility = () => {setIsPasswordVisible(!isPasswordVisible)};
  const togglePasswordRecovery = () => {setIsPasswordRecoveryVisible(!isPasswordRecoveryVisible)};
  const handleUsernameChange = (text) => {setUsername(text); checkButtonState(text, company, password)};
  const handlePasswordChange = (text) => {setPassword(text); checkButtonState(username, company, text)};
  const selectCompany = (selectedOption) => {setShowDropdown(false); setCompany(selectedOption); checkButtonState(username, selectedOption, password)};
  const checkModalButtonState = (enteredUsername, enteredTelepon) => {const isAllFilled = enteredUsername !== '' && enteredTelepon !== ''; setIsModalButtonDisabled(!isAllFilled)};
  const checkButtonState = (enteredUsername, selectedCompany, enteredPassword) => {const isAllFilled = enteredUsername !== '' && selectedCompany !== '' && enteredPassword !== ''; setIsButtonDisabled(!isAllFilled)};

  const handleFingerprintLogin = async () => {
    try {
      const hasFingerprintSupport = await LocalAuthentication.hasHardwareAsync();
      if (hasFingerprintSupport) {
        const result = await LocalAuthentication.authenticateAsync({promptMessage: 'Biometrik Sidik Jari'});
        if (result.success) {
          onLoginSuccess();
          setLoggedIn(true);
        } else {
          Alert.alert('LOGIN GAGAL', 'terjadi kesalahan, coba kembali.');
        }
      } else {
        Alert.alert('LOGIN GAGAL', 'sidik jari tidak tersedia pada perangkat anda.');
      }
    } catch (error) {
        Alert.alert('LOGIN GAGAL', 'Terjadi kesalahan, gunakan cara lain.');
      }
  };

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      const response = await fetch('https://globalindo-group.com/absi_demo/api/login', {method: 'POST', body: formData});
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          onLoginSuccess();
          setValidCredentials(saveAccount);
          console.log(`success: ${responseData.success}, message: ${responseData.message}, user_id: ${responseData.user_id}, namaUser: ${responseData.namaUser}`);
          await AsyncStorage.setItem('isLoggedIn', 'true');
          await AsyncStorage.setItem('userId', responseData.user_id.toString());
          await AsyncStorage.setItem('username', responseData.namaUser);
        } else {
          Alert.alert('LOGIN GAGAL', 'Username atau Password yang anda masukkan salah.');
        }
      }
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    if (enableFingerprint) {setValidCredentials(true);}
  }, [enableFingerprint]);

  useEffect(() => {
    const currentDate = moment();
    const ramadanStart = moment().year(currentDate.year()).month(2).date(11);
    const ramadanEnd = moment().year(currentDate.year()).month(3).date(10);
    const isCurrentDateInRamadan = currentDate.isBetween(ramadanStart, ramadanEnd, 'day', '[]');
    setIsRamadan(isCurrentDateInRamadan);
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {setValidCredentials(true)}
      } catch (error) {
        //
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <ImageBackground style={styles.container} source={isRamadan ? require('../images/ramadan.jpg') : null}>
      <Image style={styles.image} source={require('../images/AbsiLogo.png')}/>

      <View style={styles.form}>
        <Text style={styles.label}>LOGIN</Text>
        <ScrollView>
          <TouchableOpacity style={styles.containerInput} onPress={() => setShowDropdown(!showDropdown)}>
            <Text style={styles.input1}>{company || 'Select Company'}</Text>
          </TouchableOpacity>
          {showDropdown && (
            <View style={styles.dropdown}>
              {companyOptions.map((option) => (
                <TouchableOpacity key={option} style={styles.dropdownButton} onPress={() => selectCompany(option)}>
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.containerInput}>
            <MaterialCommunityIcons size={20} color="grey" name="account" style={styles.iconLeft}/>
            <TextInput value={username} style={styles.input2} autoCapitalize="none" placeholder="Username" selectionColor="black" onChangeText={handleUsernameChange} accessibilityLabel="Username Input"/>
          </View>

          <View style={styles.containerInput}>
            <MaterialCommunityIcons size={20} name="lock" color="grey" style={styles.iconLeft}/>
            <TextInput value={password} style={styles.input2} autoCapitalize="none" placeholder="Password" selectionColor="black" onChangeText={handlePasswordChange} accessibilityLabel="Password Input" secureTextEntry={!isPasswordVisible}/>          
            <TouchableOpacity style={styles.iconRight} onPress={togglePasswordVisibility}>
              <MaterialCommunityIcons size={20} color="grey" name={isPasswordVisible ? 'eye-off' : 'eye'}/>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.buttonForgotPassword} onPress={togglePasswordRecovery}>Lupa password ?</Text>
          <Modal transparent={true} animationType="slide" visible={isPasswordRecoveryVisible} onRequestClose={togglePasswordRecovery}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.containerModal}>
                <View style={styles.modal}>
                  <Text style={styles.modalText}>Untuk mendapatkan "Password", silakan isi "Username" & "Nomor Telepon" yang sudah terdaftar.</Text>
                  <TextInput autoCapitalize="none" placeholder="Username" selectionColor="black" style={styles.modalInput} onChangeText={(text) => {setModalUsername(text); checkModalButtonState(text, modalTelepon)}}/>
                  <TextInput placeholder="Telepon" keyboardType="numeric" selectionColor="black" style={styles.modalInput} onChangeText={(text) => {setModalTelepon(text); checkModalButtonState(modalUsername, text)}}/>
                  <TouchableOpacity onPress={togglePasswordRecovery} disabled={isModalButtonDisabled} style={[styles.modalButton1, {backgroundColor: isModalButtonDisabled ? 'grey' : '#071952'}]}>
                    <Text style={styles.buttonText}>KIRIM</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButton2}>
                    <Text style={styles.buttonText}>KEMBALI</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <View style={styles.containerButton}>
            <TouchableOpacity onPress={handleLogin} disabled={isButtonDisabled} style={[styles.buttonLogin1, { backgroundColor: isButtonDisabled ? 'grey' : '#071952' }]}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity disabled={!validCredentials} onPress={handleFingerprintLogin} style={[styles.buttonLogin2, { backgroundColor: validCredentials ? '#071952' : 'grey' }]}>
              <MaterialCommunityIcons size={22} color="white" name="fingerprint"/>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{flex: 1, height: 2, marginTop: 10, marginBottom: 15, fontWeight: 'bold', backgroundColor: 'grey'}}/>
          </View>

          <TouchableOpacity style={styles.buttonHelp} onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=6281398470053')}>
            <Text style={styles.buttonText}>BANTUAN</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <Text style={{fontSize: 14, color: 'black', fontWeight: 'bold', alignSelf: 'center'}}>ABSI version 2.2.1 || copyright © 2023 GLOBALINDO GROUP</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071952',
  },
  image: {
    width: 300,
    height: 95,
    marginTop: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },
  form: {
    flex: 1,
    padding: 20,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 50,
    marginTop: -10,
    marginLeft: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  containerInput: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
    borderColor: 'grey',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
  },
  input1: {
    padding: 15,
    fontSize: 16,
    width: '100%',
    color: 'grey',
  },
  dropdown: {
    zIndex: 1,
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: 'grey',
    backgroundColor: '#F7F7F7',
  },
  dropdownButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  iconLeft: {
    left: 10,
    top: '50%',
    position: 'absolute',
    transform: [{ translateY: -12 }],
  },
  input2: {
    padding: 10,
    fontSize: 16,
    width: '100%',
    marginLeft: 25,
  },
  iconRight: {
    top: 15,
    right: 10,
    position: 'absolute',
  },
  buttonForgotPassword: {
    fontSize: 16,
    color: 'grey',
    marginRight: 10,
    marginBottom: 10,
    textAlign: 'right',
  },
  containerModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    padding: 20,
    width: '100%',
    marginTop: 90,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
    backgroundColor: 'white',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalInput: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: 'grey',
  },
  modalButton1: {
    padding: 10,
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#071952',
  },
  buttonText: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButton2: {
    padding: 10,
    width: '100%',
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonLogin1: {
    padding: 10,
    width: '75%',
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: 'center',
    borderColor: 'grey',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#071952',
  },
  buttonLogin2: {
    padding: 10,
    width: '20%',
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: 'center',
    borderColor: 'grey',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#071952',
  },
  buttonHelp: {
    padding: 10,
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: 'center',
    borderColor: 'grey',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#25D366',
  },
});
export default AbsiLogin;