import { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const AbsiBuatBap = ({ navigation }) => {
  const dataPenerimaanArtikel = [
    { km: 'KM-202401001', tanggal: '01/01/2024' },
    { km: 'KM-202401002', tanggal: '02/01/2024' },
    { km: 'KM-202401003', tanggal: '03/01/2024' },
    { km: 'KM-202401004', tanggal: '04/01/2024' },
    { km: 'KM-202401005', tanggal: '05/01/2024' },
  ];

  const dataMutasiArtikel = [
    { km: 'KM-202401006', tanggal: '06/01/2024' },
    { km: 'KM-202401007', tanggal: '07/01/2024' },
    { km: 'KM-202401008', tanggal: '08/01/2024' },
    { km: 'KM-202401009', tanggal: '09/01/2024' },
  ];

  const [dataToShow, setDataToShow] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [activeButton, setActiveButton] = useState('Penerimaan'); // Set default active button
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCardClick = (data) => {
    let detailScreen = 'KeranjangBap';
    navigation.navigate(detailScreen, { 
      km: data.km,
      tanggal: data.tanggal,
    });
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === 'Penerimaan') {
      setDataToShow(dataPenerimaanArtikel);
    } else if (buttonName === 'Mutasi') {
      setDataToShow(dataMutasiArtikel);
    }
  };

  useEffect(() => {
    handleButtonClick(activeButton); // Ensure dataToShow is set when component mounts
  }, [activeButton]); // Listen for changes in activeButton

  const filteredData = dataToShow.filter(
    (data) =>
      data.km.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput value={searchText} style={styles.search} selectionColor="black" autoCapitalize="characters" placeholder="Cari Kode Artikel ..." onChangeText={(text) => setSearchText(text)} />
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => handleButtonClick('Penerimaan')} style={[styles.buttonOff, activeButton === 'Penerimaan' && styles.buttonOn]}>
            <Text style={[styles.buttonOfftext, activeButton === 'Penerimaan' && styles.buttonOntext]}>PENERIMAAN ARTIKEL</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonClick('Mutasi')} style={[styles.buttonOff, activeButton === 'Mutasi' && styles.buttonOn]}>
            <Text style={[styles.buttonOfftext, activeButton === 'Mutasi' && styles.buttonOntext]}>MUTASI ARTIKEL</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scroll}>
          {filteredData.map((data, index) => (
            <TouchableOpacity key={index} style={styles.card1} onPress={() => handleCardClick(data)}>
              <View style={styles.cardRow1}>
                <View style={styles.cardColumn1}>
                  <Text style={styles.cardText1}>{`${data.km}`}</Text>
                  <Text style={styles.cardText3}>{`Tanggal: ${data.tanggal}`}</Text>
                </View>
                <Text style={styles.cardButton1}>PILIH</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card1: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#071952',
    backgroundColor: 'white',
  },
  cardRow1: {
    flexDirection: 'row',
  },
  cardColumn1: {
    flex: 1,
    marginRight: 5,
  },
  cardButton1: {
    padding: 10,
    fontSize: 16,
    color: 'black',
    borderWidth: 2,
    borderRadius: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#F7F7F7',
  },
  buttonOn1: {
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
  buttonOff1: {
    opacity: 0.5,
    backgroundColor: '#071952',
  },
  buttonText1: {
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
  search: {
    padding: 10,
    marginTop: -10,
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 10,
    borderColor: 'grey',
    backgroundColor: '#F7F7F7',
  },
  buttonRow: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonOff: {
    padding: 10,
    width: '48%',
    borderWidth: 2,
    borderRadius: 25,
    alignItems: 'center',
    borderColor: '#071952',
    backgroundColor: '#F7F7F7',
  },
  buttonOn: {
    borderColor: 'white',
    backgroundColor: '#071952',
  },
  buttonOfftext: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  buttonOntext: {
    fontSize: 16,
    color: 'white',
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
    backgroundColor: 'white',
  },
  cardText1: {
    fontSize: 16,
    marginTop: -5,
    fontWeight: 'bold',
  },
  cardText2: {
    fontSize: 16,
  },
  cardText3: {
    fontSize: 16,
    marginBottom: -5,
  },
  buttonColumn: {
    bottom: 10,
    padding: 15,
    width: '90%',
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
export default AbsiBuatBap;