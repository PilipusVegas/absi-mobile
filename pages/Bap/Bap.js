import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const statusDescriptions = {
  0: 'Menunggu di approve Leader',
  1: 'Menunggu di approve MV',
  2: 'Sudah di approve MV',
  3: 'Sedang di siapkan',
  4: 'Sedang di kirim',
  5: 'Selesai',
  6: 'Di Tolak',
};

const AbsiBap = ({ navigation }) => {
  const dataProses = [
    { pm: 'BAP-202401001', status: '0', tanggal: '01/01/2024', modul: '0' },
    { pm: 'BAP-202401001', status: '1', tanggal: '01/01/2024', modul: '0' },
    { pm: 'BAP-202401001', status: '2', tanggal: '01/01/2024', modul: '0' },
    { pm: 'BAP-202401001', status: '3', tanggal: '01/01/2024', modul: '0' },
    { pm: 'BAP-202401001', status: '4', tanggal: '01/01/2024', modul: '0' },
  ];

  const dataSelesai = [
    { pm: 'BAP-202401001', status: '5', tanggal: '01/01/2024', modul: '1' },
    { pm: 'BAP-202401001', status: '5', tanggal: '01/01/2024', modul: '1' },
    { pm: 'BAP-202401001', status: '5', tanggal: '01/01/2024', modul: '1' },
  ];

  const dataTolak = [
    { pm: 'BAP-202401001', status: '6', tanggal: '01/01/2024', modul: '1' },
  ];

  const [dataToShow, setDataToShow] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [activeButton, setActiveButton] = useState(null);
  const allData = [...dataProses, ...dataSelesai, ...dataTolak];
  const filteredData = dataToShow.filter((data) => data.pm.toLowerCase().includes(searchText.toLowerCase()));

  const handleCardClick = (data) => {
    let detailScreen = 'DetailBap';
    navigation.navigate(detailScreen, { 
      pm: data.pm,
      status: data.status,
      tanggal: data.tanggal,
      modul: data.modul,
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
  
  useEffect(() => {setDataToShow(allData)}, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput value={searchText} style={styles.search} selectionColor="black" autoCapitalize="characters" placeholder="Cari Kode Artikel ..." onChangeText={(text) => setSearchText(text)}/>

        <View style={styles.buttonOption}>
          <TouchableOpacity onPress={() => handleButtonClick('Proses')} style={[styles.buttonOff, activeButton === 'Proses' && styles.buttonOn]}>
            <Text style={[styles.buttonOffText, activeButton === 'Proses' && styles.buttonOnText]}>DI PROSES</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonClick('Selesai')} style={[styles.buttonOff, activeButton === 'Selesai' && styles.buttonOn]}>
            <Text style={[styles.buttonOffText, activeButton === 'Selesai' && styles.buttonOnText]}>SELESAI</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonClick('Tolak')} style={[styles.buttonOff, activeButton === 'Tolak' && styles.buttonOn]}>
            <Text style={[styles.buttonOffText, activeButton === 'Tolak' && styles.buttonOnText]}>DI TOLAK</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          {filteredData.map((data, index) => (
            <TouchableOpacity key={index} onPress={() => handleCardClick(data)} style={[styles.card, data.status === '5' && { borderColor: 'green' }, data.status === '6' && { borderColor: 'red' }]}>
              <View style={styles.cardMain}>
                <Text style={styles.cardText}>{`${data.pm}`}</Text>
                <Text style={styles.cardText}>{`${data.tanggal}`}</Text>
              </View>
              <View style={styles.cardMain}>
                <Text style={styles.cardText}>{`Status: ${statusDescriptions[data.status]}`}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BuatBap')}>
        <MaterialCommunityIcons size={20} name="plus" color="white"/>
        <Text style={styles.buttonText}>BUAT BAP</Text>
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
  buttonOption: {
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
  buttonOffText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  buttonOnText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  scrollView: {
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
  cardMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
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
export default AbsiBap;