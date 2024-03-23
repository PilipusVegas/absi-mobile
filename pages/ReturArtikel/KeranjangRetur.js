import {useState, useEffect} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {View, Text, Image, Alert, TextInput, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

const AbsiKeranjangRetur = ({route, navigation}) => {
  const {selectedItems} = route.params;
  const [selectedDate, setSelectedDate] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [selectedFotoArtikel, setSelectedFotoArtikel] = useState(null);
  const [selectedFotoPacking, setSelectedFotoPacking] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedFotoLampiran, setSelectedFotoLampiran] = useState(null);
  const [selectedItemsState, setSelectedItemsState] = useState(selectedItems);

  const toggleDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const handleConditionSelect = (condition, index) => {
    const updatedSelectedItems = [...selectedItemsState];
    updatedSelectedItems[index].condition = condition;
    setSelectedItemsState(updatedSelectedItems);
  };

  const handleQuantityChange = (text, index) => {
    const updatedQuantities = { ...selectedQuantities };
    const quantity = parseInt(text, 10);
    updatedQuantities[selectedItemsState[index].id] = isNaN(quantity) ? 0 : quantity;
    setSelectedQuantities(updatedQuantities);
  };

  const openImagePicker = async (type) => {
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
        const response = await fetch(result.uri);
        const blob = await response.blob();
        const fileSizeInBytes = blob.size;
        const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
        if (fileSizeInMB > 2.5) {
          alert('Ukuran file melebihi batas maksimal, silakan pilih file dengan ukuran yang lebih kecil dari 2,5MB.');
          return;
        }
        if (type === 'fotoArtikel') {
          setSelectedFotoArtikel(result.uri);
          logImageFileSize(result.uri);
        } else if (type === 'fotoLampiran') {
          setSelectedFotoLampiran(result.uri);
          logImageFileSize(result.uri);
        } else if (type === 'fotoPacking') {
          setSelectedFotoPacking(result.uri);
          logImageFileSize(result.uri);
        }
      }
    } catch (error) {
      //
    }
  };

  const logImageFileSize = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const fileSizeInBytes = blob.size;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
      console.log("Image size:", fileSizeInMB.toFixed(2), "MB");
    } catch (error) {
      //
    }
  };

  const handleSendData = () => {
    Alert.alert(
      '',
      'Apakah anda sudah yakin?',
      [
        {
          text: 'Ya',
          onPress: () => {
            navigation.navigate('Retur');
          },
        },
        {
          text: 'Tidak',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    let totalQuantityCount = 0;
    let isAnyImageInCardEmpty = false;
    let isAnyItemWithoutQuantity = false;
    for (const item of selectedItemsState) {
      if (!selectedQuantities[item.id] || selectedQuantities[item.id] === 0) {
        isAnyItemWithoutQuantity = true;
        break;
      }
      totalItemsCount++;
      totalQuantityCount += selectedQuantities[item.id];
    }
    const isDatePickerEmpty = !selectedDate;
    const isFotoArtikelEmpty = !selectedFotoArtikel;
    const isFotoPackingEmpty = !selectedFotoPacking;
    const isFotoLampiranEmpty = !selectedFotoLampiran;
    const isAnyConditionNotSelected = selectedItemsState.some(item => !item.condition);
    setIsButtonDisabled(
      isDatePickerEmpty ||
      isFotoArtikelEmpty ||
      isFotoPackingEmpty ||
      isFotoLampiranEmpty ||
      isAnyImageInCardEmpty ||
      totalQuantityCount === 0 || 
      isAnyItemWithoutQuantity || 
      isAnyConditionNotSelected
    );
  }, [selectedQuantities, selectedItemsState, selectedFotoArtikel, selectedFotoLampiran, selectedFotoPacking, selectedDate]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>ISI KERANJANG</Text>
        <ScrollView style={styles.scrollContainer}>
          {selectedItems.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardColumn}>
                <Text style={styles.cardText1}>{`${item.kodeArtikel}`}</Text>
                <Text style={styles.cardText2}>{`${item.namaArtikel}`}</Text>
                <View style={styles.cardRow}>
                  <TouchableOpacity style={styles.cardLeft} onPress={() => openImagePicker('fotoArtikel')}>
                    {selectedFotoArtikel ? (
                      <Image style={styles.imageStyle} source={{uri: selectedFotoArtikel}}/>
                    ) : (
                      <MaterialCommunityIcons size={24} name="camera" color="black"/>
                    )}
                  </TouchableOpacity>
                  <View style={styles.cardRight}>
                    <Text style={styles.cardLabel}>Jumlah:</Text>
                    <TextInput style={styles.input} value={item.quantity} keyboardType="numeric" selectionColor="black" onChangeText={(text) => handleQuantityChange(text, index)}/>
                    <Text style={styles.cardLabel}>Kondisi:</Text>
                    <View style={styles.conditionContainer}>
                      <TouchableOpacity onPress={() => handleConditionSelect('Bagus', index)} style={[styles.conditionButton, item.condition === 'Bagus' ? styles.selectedCondition : null]}>
                        <Text style={item.condition === 'Bagus' ? styles.selectedText : null}>Bagus</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleConditionSelect('Rusak', index)}
                        style={[styles.conditionButton, item.condition === 'Rusak' ? styles.selectedCondition : null]}>
                        <Text style={item.condition === 'Rusak' ? styles.selectedText : null}>Rusak</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <Text style={styles.cardLabel}>Catatan:</Text>
                  <TextInput style={styles.input} value={item.quantity} selectionColor="black" onChangeText={(text) => handleQuantityChange(text, index)}/>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.cardBottom}>
          <View style={styles.cardTanggal}>
            <Text style={styles.cardTextleft}>Silakan pilih tanggal pengiriman:</Text>
            <TouchableOpacity onPress={toggleDatePicker}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons size={20} name="calendar"/>
                {selectedDate && (
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{selectedDate.toLocaleDateString('en-GB')}</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>

          <DateTimePickerModal mode="date" isVisible={isDatePickerVisible} onCancel={() => setDatePickerVisibility(false)} minimumDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)} maximumDate={new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)} onConfirm={(date) => {setSelectedDate(date); setDatePickerVisibility(false)}}/>

          <View style={styles.cardBottomRow}>
            <View style={styles.cardContainer}>
              <Text style={styles.cardLabel}>Lampiran</Text>
              <TouchableOpacity style={styles.cardButton} onPress={() => openImagePicker('fotoLampiran')}>
                {selectedFotoLampiran ? (
                  <Image style={styles.imageStyle} source={{uri: selectedFotoLampiran}}/>
                ) : (
                  <MaterialCommunityIcons size={24} name="camera" color="black"/>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
              <Text style={styles.cardLabel}>Foto Packing</Text>
              <TouchableOpacity style={styles.cardButton} onPress={() => openImagePicker('fotoPacking')}>
                {selectedFotoPacking ? (
                  <Image style={styles.imageStyle} source={{uri: selectedFotoPacking}}/>
                ) : (
                  <MaterialCommunityIcons size={24} name="camera" color="black" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={handleSendData} disabled={isButtonDisabled} style={isButtonDisabled ? styles.buttonOff : styles.buttonOn}>
          <Text style={styles.buttonText}>KIRIM</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  cardBottomRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTanggal: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTextleft: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold',
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
  label: {
    fontSize: 16,
    marginTop: -10,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 10,
  },
  card: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    borderColor: '#071952',
    backgroundColor: 'white',
  },
  cardColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  cardText1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardText2: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardRow: {
    flexDirection: 'row',
  },
  cardLeft: {
    flex: 0.5,
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
    borderColor: 'grey',
    paddingHorizontal: 10,
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
  cardBottom: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 80,
    borderColor: '#071952',
    backgroundColor: 'white',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardButton: {
    padding: 40,
    width: '90%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
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
  },
  buttonText: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default AbsiKeranjangRetur;