import { apiUrl } from '../../globals.js';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const statusDescriptions = {
  0: 'Menunggu di approve Leader',
  1: 'Menunggu di approve MV',
  2: 'Sudah di approve MV',
  3: 'Sedang di siapkan',
  4: 'Sedang di kirim',
  5: 'Selesai',
  6: 'Di Tolak',
}

const AbsiBap = ({ route, navigation }) => {
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

  const handleCardClick = async (bapItem) => {
    try {
      await AsyncStorage.setItem('selected_id', bapItem.id);   
      let detailScreen = 'DetailBap';
      navigation.navigate(detailScreen, { 
        id: bapItem.id,
        id_kirim: bapItem.id_kirim,
        kategori: bapItem.kategori,
        status: bapItem.status,
        catatan: bapItem.catatan,
        created_at: formatDate(bapItem.created_at),
      });
    } catch (error) {
      // 
    }
  };
  
  const filteredData = dataToShow.filter((data) => {
    if (activeButton === 'Proses') {
      return ['0', '1', '2', '3', '4'].includes(data.status);
    } else if (activeButton === 'Selesai') {
      return data.status === '5';
    } else if (activeButton === 'Tolak') {
      return data.status === '6';
    }
    return false;
  });

  const fetchData = async (id_toko) => {
    try {
      const formData = new FormData();
      formData.append('id_toko', id_toko);
      const response = await fetch(apiUrl + '/getBap', { method: 'POST', body: formData });
      const responseData = await response.json();
      if (responseData.success) {
        setDataToShow(responseData.bap);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchDataBasedOnButton = async () => {
      let selectedStoreId = null;
      if (route.params && route.params.selectedStore) {
        selectedStoreId = route.params.selectedStore.id_toko;
      } else {
        selectedStoreId = await AsyncStorage.getItem('id_toko');
      }
      if (selectedStoreId) {
        fetchData(selectedStoreId);
      }
    };
    fetchDataBasedOnButton();
  }, [activeButton]);  

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
          {filteredData.length === 0 && <Text style={styles.cardEmpty}>TIDAK ADA DATA</Text>}
          {filteredData.map((bapItem, index) => (
            <TouchableOpacity key={index} onPress={() => handleCardClick(bapItem)} style={[styles.card, bapItem.status === '5' && { borderColor: 'green' }, bapItem.status === '6' && { borderColor: 'red' }]}>
              <View style={styles.cardMain}>
                <Text style={styles.cardText}>{`${bapItem.id_kirim}`}</Text>
                <Text style={styles.cardText}>{`${formatDate(bapItem.created_at)}`}</Text>
              </View>
              <View style={styles.cardMain}>
                <Text style={styles.cardText}>{`Status: ${statusDescriptions[bapItem.status]}`}</Text>
              </View>
              <View style={styles.cardMain}>
                <Text style={styles.cardText}>{`Catatan: ${bapItem.catatan}`}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BuatBap')}>
        <MaterialCommunityIcons size={20} name="plus" color="white" />
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
  cardEmpty: {
    padding: 32,
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    borderColor: '#071952',
  },
});
export default AbsiBap;
