import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, Image, Alert, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const AbsiProfil = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const handleNamePress = () => {setShowNamePopup(true)};
  const handlePhonePress = () => {setShowPhonePopup(true)};
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('123-456-789');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [fullName, setFullName] = useState('Firqi Argoprasetyo');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [cardData, setCardData] = useState([{ photoUri: '../images/FA.jpg' }]);
  const handleNameChange = (newName) => {setFullName(newName); setShowNamePopup(false)};
  const handlePhoneChange = (newPhone) => {setPhoneNumber(newPhone); setShowPhonePopup(false)};

  const handleSendData = () => {
    Alert.alert(
      '', 'Apakah anda sudah yakin?',
      [{text: 'Ya', onPress: () => {navigation.navigate('Home')}}, {text: 'Tidak', style: 'cancel'}], { cancelable: false }
    );
  };
  const openImagePicker = async (index) => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Izin akses galeri diperlukan untuk memilih foto.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        const updatedCardData = [...cardData];
        updatedCardData[index].photoUri = result.uri;
        setCardData(updatedCardData);
      }
    } catch (error) {
      console.log('Error when picking an image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <ScrollView style={styles.scroll}>
          {cardData.map((card, index) => (
            <View key={index} style={[styles.cardLeft, { flex: 0.5 }]}>
              <TouchableOpacity style={styles.cameraIcon} onPress={() => openImagePicker(index)}>
                <Image
                  style={styles.image}
                  source={card.photoUri === '../images/FA.jpg' ? require('../images/FA.jpg') : { uri: card.photoUri }}
                />
              </TouchableOpacity>
            </View>
          ))}
          <Text style={styles.label}>Akun</Text>
          <TouchableOpacity style={styles.labelButton} onPress={handleNamePress}>
            <Text style={styles.labelText1}>Nama Lengkap:</Text>
            <View style={styles.labelTextinput}>
              <Text style={styles.labelText2}>{fullName}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.labelButton} onPress={handlePhonePress}>
            <Text style={styles.labelText1}>Nomor Telepon:</Text>
            <View style={styles.labelTextinput}>
              <Text style={styles.labelText2}>{phoneNumber}</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.label}>Keamanan</Text>
          <Text style={styles.labelText1}>Password Saat Ini</Text>
          <View style={styles.labelContainer}>
            <TextInput selectionColor="black" value={currentPassword} style={styles.labelTextinput} secureTextEntry={!showCurrentPassword} onChangeText={(text) => setCurrentPassword(text)}/>
            <TouchableOpacity style={styles.labelIconbutton} onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
              <MaterialCommunityIcons size={20} style={styles.labelIcon} name={showCurrentPassword ? 'eye' : 'eye-off'}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.labelText1}>Password Baru:</Text>
          <View style={styles.labelContainer}>
            <TextInput value={newPassword} selectionColor="black" style={styles.labelTextinput} secureTextEntry={!showNewPassword} onChangeText={(text) => setNewPassword(text)}/>
            <TouchableOpacity style={styles.labelIconbutton} onPress={() => setShowNewPassword(!showNewPassword)}>
              <MaterialCommunityIcons size={20} style={styles.labelIcon} name={showNewPassword ? 'eye' : 'eye-off'}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.labelText1}>Konfirmasi Password:</Text>
          <View style={styles.labelContainer}>
            <TextInput selectionColor="black" value={confirmPassword} style={styles.labelTextinput} secureTextEntry={!showConfirmPassword} onChangeText={(text) => setConfirmPassword(text)}/>
            <TouchableOpacity style={styles.labelIconbutton} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <MaterialCommunityIcons size={20} style={styles.labelIcon} name={showConfirmPassword ? 'eye' : 'eye-off'}/>
            </TouchableOpacity>
          </View>
        <TouchableOpacity style={styles.button} onPress={handleSendData}>
          <Text style={styles.buttonText}>SIMPAN</Text>
        </TouchableOpacity>
        </ScrollView>
        {showNamePopup && (
          <View style={styles.popup}>
            <View style={styles.popupContainer}>
              <Text style={styles.popupLabel}>Ubah Nama Lengkap</Text>
              <TextInput value={fullName} selectionColor="black" style={styles.popupTextinput} onChangeText={(text) => setFullName(text)}/>
              <TouchableOpacity style={styles.popupButton} onPress={() => handleNameChange(fullName)}>
                <Text style={styles.popupButtontext}>SIMPAN</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {showPhonePopup && (
          <View style={styles.popup}>
            <View style={styles.popupContainer}>
              <Text style={styles.popupLabel}>Ubah Nomor Telepon</Text>
              <TextInput value={phoneNumber} selectionColor="black" style={styles.popupTextinput} onChangeText={(text) => setPhoneNumber(text)}/>
              <TouchableOpacity style={styles.popupButton} onPress={() => handlePhoneChange(phoneNumber)}>
                <Text style={styles.popupButtontext}>SIMPAN</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    bottom: 10,
    padding: 15,
    width: '95%',
    marginTop: 10,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#071952',
  },
  buttonText: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#071952',
  },
  form: {
    flex: 1,
    padding: 20,
    borderRadius: 25,
    marginBottom: -20,
    backgroundColor: 'white',
  },
  image: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderRadius: 75,
    marginBottom: 10,
    alignSelf: 'center',
    borderColor: 'black',
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  labelText1: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  labelText2: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  labelTextinput: {
    padding: 10,
    width: '95%',
    marginLeft: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: 'grey',
    backgroundColor: '#F7F7F7',
  },
  labelContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelIconbutton: {
    right: 10,
    position: 'absolute',
  },
  labelIcon: {
    color:'grey',
    marginRight:10,
    marginBottom:10,
  },
  popup: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    width: 250,
    height: 200,
    padding: 20,
    borderWidth: 2,
    borderRadius: 10,
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  popupLabel: {
    fontSize: 20,
    marginTop: -10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  popupTextinput: {
    padding: 10,
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    paddingStart: 10,
    borderColor: 'grey',
    backgroundColor: '#F7F7F7',
  },
  popupButton: {
    padding: 15,
    width: '100%',
    marginTop: 110,
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#071952',
  },
  popupButtontext: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default AbsiProfil;