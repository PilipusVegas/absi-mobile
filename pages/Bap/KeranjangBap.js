import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, Alert, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const AbsiKeranjangBap = ({ route, navigation }) => {
  const [dataArtikel, setDataArtikel] = useState([
    { id: '1', kodeArtikel: 'A', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', quantity: '100' },
    { id: '2', kodeArtikel: 'B', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', quantity: '100' },
    { id: '3', kodeArtikel: 'C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', quantity: '100' },
    { id: '4', kodeArtikel: 'D', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', quantity: '100' },
    { id: '5', kodeArtikel: 'E', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', quantity: '100' },
  ]);

  const { km, tanggal } = route.params;
  const [totalItems, setTotalItems] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [inputValues, setInputValues] = useState(dataArtikel.map(() => ''));

  const handleInputChange = (text, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text.trim();
    setInputValues(newInputValues);
  };

  const handleSendData = () => {
    Alert.alert(
      '',
      'Apakah anda sudah yakin?',
      [
        {
          text: 'Ya',
          onPress: () => {
            navigation.navigate('Bap');
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
    let total = 0;
    dataArtikel.forEach((barang) => {total += parseInt(barang.update)});
    setTotalItems(total);
    const allInputsFilled = inputValues.every(value => value.trim() !== '');
    setIsButtonDisabled(!allInputsFilled);
  }, [dataArtikel, inputValues]);

  useEffect(() => {
    if (route.params?.selectedItems) {
      const newItems = route.params.selectedItems.map((item) => ({
        ...item,
        quantity: '0',
      }));
      setDataArtikel((prevItems) => [...prevItems, ...newItems]);
    }
  }, [route.params?.selectedItems]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>{km}</Text>
            <Text style={styles.headerText}>{tanggal}</Text>
          </View>
        </View>
        <View style={styles.label}>
          <Text style={styles.label1}>NO.</Text>
          <Text style={styles.label1}>ARTIKEL</Text>
          <Text style={styles.label2}>QUANTITY</Text>
          <Text style={styles.label3}>UPDATE</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          {dataArtikel.map((barang, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardRow}>
                <Text style={styles.cardText1}>{`${barang.id}`}</Text>
                <View style={styles.cardLeft}>
                  <Text style={styles.cardText2}>{`${barang.kodeArtikel}`}</Text>
                  <Text style={styles.cardText2}>{`${barang.namaArtikel}`}</Text>
                </View>
                <View style={styles.cardRight}>
                  <Text style={styles.cardText3}>{`${barang.quantity}`}</Text>
                  <TextInput value={barang.update} keyboardType="numeric" style={styles.cardTextInput} onChangeText={text => handleInputChange(text, index)}/>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('ArtikelBap')} style={styles.button}>
          <MaterialCommunityIcons name="plus" size={24} color="white" />
          <Text style={styles.buttonText}>TAMBAH ARTIKEL</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendData} disabled={isButtonDisabled} style={isButtonDisabled ? styles.buttonOff : styles.buttonOn}>
          <Text style={styles.buttonText}>KIRIM</Text>  
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
  header: {
    padding: 15,
    marginTop: -10,
    borderRadius: 10,
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#071952',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    marginBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
  },
  label1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  label2: {
    fontSize: 16,
    marginLeft: 25,
    fontWeight: 'bold',
  },
  label3: {
    fontSize: 16,
    marginRight: 25,
    fontWeight: 'bold',
  },
  scrollView: {
    marginBottom: 130,
  },
  card: {
    width: '95%',
    marginBottom: 5,
    borderBottomWidth: 1,
  },
  cardRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardText1: {
    fontSize: 16,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  cardLeft: {
    flex: 1,
    marginRight: 10,
  },
  cardText2: {
    fontSize: 16,
    marginLeft: 20,
  },
  cardRight: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardText3: {
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    marginRight: 50,
    borderRadius: 5,
  },
  cardTextInput: {
    width: 45,
    padding: 5,
    fontSize: 16,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#F7F7F7',
  },
  buttonOn1: {
    bottom: 90,
    padding: 15,
    width: '100%',
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#071952',
  },
  buttonOff1: {
    bottom: 90,
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
  button: {
    bottom: 90,
    padding: 15,
    width: '100%',
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#071952',
  },
  buttonOn: {
    bottom: 30,
    padding: 15,
    width: '100%',
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#071952',
  },
  buttonOff: {
    bottom: 30,
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
  buttonText: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default AbsiKeranjangBap;