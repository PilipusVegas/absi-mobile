import { useState, useEffect } from 'react';
import { CheckBox } from 'react-native-elements';
import { View, Text, Alert, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const AbsiStockOpname = ({ navigation }) => {
  const [dataArtikel] = useState([
    { kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)' },
    { kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)' },
    { kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)' },
    { kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)' },
    { kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)' },
  ]);
  const [isChecked, setIsChecked] = useState(false);
  const [inputValues, setInputValues] = useState([]);
  const isButtonDisabled = isAnyInputEmpty || !isChecked;
  const [filteredItems, setFilteredItems] = useState([]);
  const isAnyInputEmpty = inputValues.some(value => value === '');
  const currentDate = new Date().toLocaleDateString('en-GB', { timeZone: 'Asia/Jakarta' });
  const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toLocaleDateString('en-GB', { timeZone: 'Asia/Jakarta' });
  const handleInputChange = (text, index) => {
    const newDataBarang = [...filteredItems];
    newDataBarang[index].input = text;
    setFilteredItems(newDataBarang);
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
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
            navigation.navigate('Home');
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
    setFilteredItems(dataArtikel);
    const initialInputValues = Array(dataArtikel.length).fill('');
    setInputValues(initialInputValues);
  }, [dataArtikel]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.container1}>
          <Text style={{ color: 'white', fontSize: 16 }}>
            Hasil SO adalah jumlah fisik artikel di toko + artikel yang terjual pada tanggal {firstDayOfMonth} - {currentDate}
          </Text>
        </View>
        <View style={styles.label}>
          <Text style={styles.labelLeft}>List Artikel</Text>
          <Text style={styles.labelRight}>Jumlah</Text>
        </View>
        <ScrollView style={styles.scroll}>
          {filteredItems.map((barang, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardRow}>
                <View style={styles.cardColumn}>
                  <Text style={styles.cardText1}>{`${barang.kodeArtikel}`}</Text>
                  <Text style={styles.cardText2}>{`${barang.namaArtikel}`}</Text>
                </View>
                <TextInput
                  maxLength={3}
                  keyboardType="numeric"
                  selectionColor="black"
                  style={styles.cardInput}
                  onChangeText={(text) => handleInputChange(text, index)}
                />
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.containerBottom}>
          <CheckBox
              checked={isChecked}
              containerStyle={styles.checkbox}
              onPress={() => setIsChecked(!isChecked)}
            />
          <Text style={styles.additionalInfo}>
            Dengan ini saya memastikan bahwa data yang isi benar {"\n"}dan dapat di pertanggung jawabkan.
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleSendData}
          disabled={isButtonDisabled}
          style={[styles.button, isButtonDisabled ? styles.buttonOff : styles.buttonOn]}
        >
          <Text style={styles.buttonText}>SIMPAN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerBottom: {
    flexDirection: 'row',
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  additionalInfo: {
    fontSize: 14,
    marginBottom: 70,
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
  container1: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#071952',
  },
  label: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelLeft: {
    fontSize: 16,
    paddingLeft: 20,
    fontWeight: 'bold',
  },
  labelRight: {
    fontSize: 16,
    paddingRight: 20,
    fontWeight: 'bold',
  },
  scroll: {
    marginBottom: 5,
  },
  card: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#071952',
    backgroundColor: '#fff',
  },
  cardRow: {
    flexDirection: 'row',
  },
  cardColumn: {
    flex: 1,
    marginRight: 5,
  },
  cardText1: {
    fontSize: 16,
    marginTop: -5,
    fontWeight: 'bold',
  },
  cardText2: {
    fontSize: 16,
  },
  cardInput: {
    padding: 10,
    width: '15%',
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    borderColor: '#071952',
  },
  button: {
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
    opacity: 0.5,
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
export default AbsiStockOpname;