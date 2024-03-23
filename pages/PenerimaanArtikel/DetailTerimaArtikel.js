import { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const AbsiDetailTerimaArtikel = ({ route, navigation }) => {
  const [dataArtikel] = useState([
    { kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)' },
    { kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)' },
    { kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)' },
    { kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)' },
    { kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)' },
  ]);
  const { km, tanggal } = route.params;
  const [inputValues, setInputValues] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const isAnyInputEmpty = inputValues.some(value => value === '');
  const [validationAttempts, setValidationAttempts] = useState(0);
  const handleInputChange = (text, index) => {
    const newDataBarang = [...filteredItems];
    newDataBarang[index].input = text;
    setFilteredItems(newDataBarang);
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);
  };
  const handleSendData = () => {
    if (validationAttempts < 2) {
      Alert.alert(
        '',
        `Anda memiliki ${2 - validationAttempts} kesempatan lagi untuk memperbaiki.`,
        [
          {
            text: 'OK',
            onPress: () => setValidationAttempts(validationAttempts + 1),
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        '',
        'Apakah anda sudah yakin?',
        [
          {
            text: 'Ya',
            onPress: () => {
              navigation.navigate('TerimaArtikel');
            },
          },
          {
            text: 'Tidak',
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    }
  };
  useEffect(() => {
    setFilteredItems(dataArtikel);
    const initialInputValues = Array(dataArtikel.length).fill('');
    setInputValues(initialInputValues);
  }, [dataArtikel]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerLeft}>{km}</Text>
            <Text style={styles.headerRight}>{tanggal}</Text>
          </View>
          <Text style={styles.headerBottom}>Catatan: Ada 5 buah kerdus</Text>
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
        <TouchableOpacity
          onPress={handleSendData}
          disabled={isAnyInputEmpty}
          style={[styles.button, isAnyInputEmpty ? styles.buttonOff : styles.buttonOn]}
        >
          <Text style={styles.buttonText}>SIMPAN</Text>
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
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  headerLeft: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  headerRight: {
    fontSize: 16,
    color: 'white',
    textAlign: 'right',
  },
  headerBottom: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
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
    marginBottom: 70,
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
export default AbsiDetailTerimaArtikel;