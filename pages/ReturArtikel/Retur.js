import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const AbsiRetur = ({ navigation }) => {
  const dataProses = [
    { rm: 'RM-202401001', status: 'Proses', tanggal: '01/01/2024' },
    { rm: 'RM-202401002', status: 'Proses', tanggal: '01/01/2024' },
    { rm: 'RM-202401003', status: 'Proses', tanggal: '01/01/2024' },
    { rm: 'RM-202401004', status: 'Proses', tanggal: '01/01/2024' },
    { rm: 'RM-202401004', status: 'Proses', tanggal: '01/01/2024' },
  ];
  const dataSelesai = [
    { rm: 'RM-202401006', status: 'Selesai', tanggal: '01/01/2024' },
    { rm: 'RM-202401007', status: 'Selesai', tanggal: '01/01/2024' },
    { rm: 'RM-202401008', status: 'Selesai', tanggal: '01/01/2024' },
  ];
  const dataTolak = [
    { rm: 'RM-202401009', status: 'Tolak', tanggal: '01/01/2024' }
  ];
  const [dataToShow, setDataToShow] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [activeButton, setActiveButton] = useState(null);
  const allData = [...dataProses, ...dataSelesai, ...dataTolak];
  const filteredData = dataToShow.filter(
    (data) =>
      data.rm.toLowerCase().includes(searchText.toLowerCase())  
  );
  const handleCardClick = (data) => {
    let detailScreen = 'DetailRetur';
    navigation.navigate(detailScreen, { 
      rm: data.rm,
      status: data.status,
      tanggal: data.tanggal,
    });
  };
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === 'Proses') {
      setDataToShow(dataProses);
    } else if (buttonName === 'Tolak') {
      setDataToShow(dataTolak);
    } else if (buttonName === 'Selesai') {
      setDataToShow(dataSelesai);
    } else if (buttonName === 'All') {
      setDataToShow(allData);
    }
  };
  useEffect(() => {
    handleButtonClick('Proses');
    //
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput value={searchText} style={styles.search} selectionColor="black" autoCapitalize="characters" placeholder="Cari Kode Artikel ..." onChangeText={(text) => setSearchText(text)}/>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => handleButtonClick('Proses')} style={[styles.buttonOff, activeButton === 'Proses' && styles.buttonOn]}>
            <Text style={[styles.buttonOfftext, activeButton === 'Proses' && styles.buttonOntext]}>DI PROSES</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonClick('Selesai')} style={[styles.buttonOff, activeButton === 'Selesai' && styles.buttonOn]}>
            <Text style={[styles.buttonOfftext, activeButton === 'Selesai' && styles.buttonOntext]}>SELESAI</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonClick('Tolak')} style={[styles.buttonOff, activeButton === 'Tolak' && styles.buttonOn]}>
            <Text style={[styles.buttonOfftext, activeButton === 'Tolak' && styles.buttonOntext]}>DI TOLAK</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scroll}>
          {filteredData.map((data, index) => (
            <TouchableOpacity key={index} onPress={() => handleCardClick(data)} style={[styles.card, data.status === 'Proses' && {borderColor: '#071952'}, data.status === 'Selesai' && {borderColor: 'green'}, data.status === 'Tolak' && {borderColor: 'red'}]}>
              <Text style={styles.cardText1}>{`${data.rm}`}</Text>
              <Text style={styles.cardText2}>{`Status: ${data.status}`}</Text>
              <Text style={styles.cardText3}>{`Tanggal: ${data.tanggal}`}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.buttonColumn} onPress={() => navigation.navigate('BuatRetur')}>
        <MaterialCommunityIcons size={20} name="plus" color="white" />
        <Text style={styles.buttonText}>BUAT RETUR</Text>
      </TouchableOpacity>
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
    width: '32%',
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
export default AbsiRetur;