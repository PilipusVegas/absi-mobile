import {useState, useEffect} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {apiUrl, imageUrl} from '../../globals.js';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, Image, Alert, TextInput, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

const AbsiUpdateAset = ({ navigation }) => {
  const [cardData, setCardData] = useState([]);
  const [keterangan, setKeterangan] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const capitalizeWords = (str) => {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };

  const handleQuantityChange = (text, index) => {
    const updatedCardData = [...cardData];
    updatedCardData[index].quantity = text;
    setCardData(updatedCardData);
    checkButtonStatus(updatedCardData);
  };

  const handleConditionSelect = (selectedCondition, index) => {
    const updatedCardData = [...cardData];
    updatedCardData[index].condition = selectedCondition;
    setCardData(updatedCardData);
    checkButtonStatus(updatedCardData);
  };

  const checkButtonStatus = (updatedCardData) => {
    const isAnyItemWithoutQuantity = updatedCardData.some(item => !item.quantity);
    const isAnyItemWithoutCondition = updatedCardData.some(item => !item.condition);
    const isAnyItemWithoutPhoto = updatedCardData.some(item => !item.photoUri);
    const isAllFieldsFilled = !isAnyItemWithoutQuantity && !isAnyItemWithoutCondition && !isAnyItemWithoutPhoto;
    setIsButtonDisabled(!isAllFieldsFilled);
  };

  const fetchData = async () => {
    try {
      const idToko = await AsyncStorage.getItem('id_toko');
      const formData = new FormData();
      formData.append('id_toko', idToko);
      const response = await fetch(apiUrl + '/getAset', {method: 'POST', body: formData});
      const responseData = await response.json();
      if (responseData.success && responseData.aset) {
        setCardData(responseData.aset);
        checkButtonStatus(responseData.aset);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSendData = () => {
    Alert.alert(
      '',
      'Apakah anda sudah yakin?',
      [
        {
          text: 'Ya',
          onPress: () => {navigation.navigate('Beranda')},
        },
        {
          text: 'Tidak',
          style: 'cancel',
        },
      ],
      { cancelable: false }
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
        checkButtonStatus(updatedCardData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <ScrollView style={styles.scrollView}>
          {cardData.map((card, index) => (
            <View style={styles.card}>
              <Text style={styles.label}>{capitalizeWords(card.nama_aset)}</Text>
              <View key={index} style={styles.cardRow}>
                <TouchableOpacity style={[styles.cardLeft, { flex: 0.5 }]} onPress={() => openImagePicker(index)}>
                  {card.foto_aset ? (
                    <Image source={{ uri: `${imageUrl}/aset/toko/${card.foto_aset}` }} style={styles.imageStyle}/>
                  ) : (
                    <MaterialCommunityIcons name="camera" size={24} color="black"/>
                  )}
                </TouchableOpacity>
                <View style={[styles.cardRight, { flex: 0.5 }]}>
                  <Text style={styles.label}>Jumlah:</Text>
                  <TextInput style={styles.input} keyboardType="numeric" selectionColor="black" value={card.qty_updated} onChangeText={(text) => handleQuantityChange(text, index)}/>
                  <Text style={styles.label}>Kondisi:</Text>
                  <View style={styles.conditionContainer}>
                    <TouchableOpacity onPress={() => handleConditionSelect('Baik', index)} style={[styles.conditionButton, card.kondisi === 'Baik' ? styles.selectedCondition : null]}>
                      <Text style={[styles.conditionText, card.kondisi === 'Baik' ? styles.selectedText : null]}>A</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleConditionSelect('Kurang Baik', index)} style={[styles.conditionButton, card.kondisi === 'Kurang Baik' ? styles.selectedCondition : null]}>
                      <Text style={[styles.conditionText, card.kondisi === 'Kurang Baik' ? styles.selectedText : null]}>B</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleConditionSelect('Rusak', index)} style={[styles.conditionButton, card.kondisi === 'Rusak' ? styles.selectedCondition : null]}>
                      <Text style={[styles.conditionText, card.kondisi === 'Rusak' ? styles.selectedText : null]}>C</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Text style={styles.label}>Keterangan:</Text>
              <TextInput maxLength={50} numberOfLines={2} style={styles.input} selectionColor="black" onChangeText={setKeterangan} value={card.keterangan || '-'}/>
            </View>
          ))}
        </ScrollView>
        <View style={styles.keterangan}>
          <Text style={styles.keteranganText}> A = Baik || B = Kurang Baik || C = Rusak</Text>
        </View>
        <TouchableOpacity onPress={handleSendData} disabled={isButtonDisabled} style={isButtonDisabled ? styles.buttonOff : styles.buttonOn}>
          <Text style={styles.floatingButtonText}>KIRIM</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  scrollView: {
    flex: 1,
    marginTop: -10,
    marginBottom: 10,
  },
  card: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#071952',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardRow: {
    flexDirection: 'row',
  },
  cardLeft: {
    borderWidth: 2,
    marginRight: 10,
    borderRadius: 10,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },
  imageStyle: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardRight: {
    flex: 1,
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    paddingStart: 10,
    borderColor: 'grey',
    backgroundColor: '#F7F7F7',
  },
  conditionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  conditionButton: {
    borderWidth: 2,
    borderRadius: 10,
    fontWeight: 'bold',
    borderColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: '#F7F7F7',
  },
  selectedCondition: {
    borderColor: 'white',
    backgroundColor: '#071952',
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonOff: {
    bottom: 40,
    padding: 15,
    opacity: 0.5,
    width: '100%',
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#071952',
    marginBottom: -10,
  },
  buttonOn: {
    bottom: 40,
    padding: 15,
    width: '100%',
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#071952',
    marginBottom: -10,
  },
  floatingButtonText: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  keterangan: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 65,
    alignItems: 'center',
    borderColor: '#071952',
    backgroundColor: 'white',
  },
  keteranganText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default AbsiUpdateAset;
