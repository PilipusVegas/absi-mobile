import { apiUrl } from '../../globals.js';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const statusDescriptions = {
  0: 'Menunggu di approve Leader',
  1: 'Menunggu di approve MV',
  2: 'Sudah di approve',
  3: 'Proses Retur',
  4: 'Proses Retur',
  5: 'Selesai',
  6: 'Di Tolak',
};

const AbsiReturArtikel = ({route, navigation}) => {
  const [idToko, setIdToko] = useState(null);
  const [dataToShow, setDataToShow] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [activeButton, setActiveButton] = useState('Proses');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchData = async (id_toko) => {
    try {
      const formData = new FormData();
      formData.append('id_toko', id_toko);
      const response = await fetch(`${apiUrl}/getRetur`, { method: 'POST', body: formData });
      const data = await response.json();
      if (data.success) {
        setDataToShow(data.retur);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCardClick = async (data) => {
    try {
      await AsyncStorage.multiSet([
        ['selected_id', data.id],
        ['selected_status', data.status],
        ['selected_tanggal', data.created_at],
      ]);
      navigation.navigate('DetailRetur', {
        id: data.id,
        status: data.status,
        tanggal: data.created_at,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderFilteredData = () => {
    let filteredData = dataToShow;
    if (searchText.trim() !== '') {
      filteredData = filteredData.filter(item => item.id.toString().toLowerCase().includes(searchText.toLowerCase().trim()));
    }
    if (activeButton === 'Proses') {
      filteredData = filteredData.filter(data => [0, 1, 2, 3, 4].includes(parseInt(data.status)));
    } else if (activeButton === 'Selesai') {
      filteredData = filteredData.filter(data => parseInt(data.status) === 5);
    } else if (activeButton === 'Tolak') {
      filteredData = filteredData.filter(data => parseInt(data.status) === 6);
    }
    return filteredData;
  };

  useEffect(() => {
    const fetchDataBasedOnParams = async () => {
      let selectedIdToko = null;
      if (route.params && route.params.selectedStore) {
        selectedIdToko = route.params.selectedStore.id_toko;
      } else {
        selectedIdToko = await AsyncStorage.getItem('id_toko');
      }
      if (selectedIdToko) {
        setIdToko(selectedIdToko);
        fetchData(selectedIdToko);
      }
    };
    fetchDataBasedOnParams();
  }, [route.params]);
  const filteredData = renderFilteredData();

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput value={searchText} autoCapitalize="none" selectionColor="black" style={styles.textInput} placeholder="Cari ID Retur ..." onChangeText={(text) => setSearchText(text)}/>
        <View style={styles.buttonMenu}>
          <TouchableOpacity onPress={() => handleButtonClick('Proses')} style={[styles.buttonOff, activeButton === 'Proses' && styles.buttonOn]}>
            <Text style={[styles.buttonOffText, activeButton === 'Proses' && styles.buttonOnText]}>PROSES</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonClick('Selesai')} style={[styles.buttonOff, activeButton === 'Selesai' && styles.buttonOn]}>
            <Text style={[styles.buttonOffText, activeButton === 'Selesai' && styles.buttonOnText]}>SELESAI</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonClick('Tolak')} style={[styles.buttonOff, activeButton === 'Tolak' && styles.buttonOn]}>
            <Text style={[styles.buttonOffText, activeButton === 'Tolak' && styles.buttonOnText]}>TOLAK</Text>
          </TouchableOpacity>
        </View>
        <FlatList 
          data={filteredData}
          style={styles.flatList}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCardClick(item)} style={[styles.card, item.status === '5' && { borderColor: 'green' }, item.status === '6' && { borderColor: 'red' }]}>
              <View style={styles.cardButton}>
                <Text style={styles.cardText1}>{`${item.id}`}</Text>
                <Text style={styles.cardText2}>{`${formatDate(item.created_at)}`}</Text>
              </View>
              <View style={styles.cardButton}>
                <Text style={styles.cardText3}>{`Status: ${statusDescriptions[item.status]}`}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity style={styles.buttonNext} onPress={() => navigation.navigate('BuatRetur')}>
        <MaterialCommunityIcons size={24} name="plus" color="white"/>
        <Text style={styles.buttonNextText}>BUAT RETUR</Text>
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
  textInput: {
    padding: 10,
    marginTop: -10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: 'grey',
    backgroundColor: '#F7F7F7',
  },
  buttonMenu: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonOff: {
    padding: 10,
    width: '32%',
    borderWidth: 2,
    borderRadius: 10,
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
  flatList: {
    marginBottom: 75,
  },
  card: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#071952',
    backgroundColor: 'white',
  },
  cardButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText1: {
    fontSize: 16,
    marginTop: -5,
    fontWeight: 'bold',
  },
  cardText2: {
    fontSize: 16,
    marginTop: -5,
  },
  cardText3: {
    fontSize: 16,
    marginBottom: -5,
  },
  buttonNext: {
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
  buttonNextText: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default AbsiReturArtikel;
