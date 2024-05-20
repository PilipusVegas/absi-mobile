import { apiUrl } from '../../globals.js';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const status = {
  0: 'Menunggu di approve',
  1: 'Proses kirim',
  2: 'Selesai',
  3: 'Selisih',
};

const AbsiTerimaMutasi = ({ route, navigation }) => {
  const [idToko, setIdToko] = useState(null);
  const [dataMutasi, setDataMutasi] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [activeButton, setActiveButton] = useState('Proses');

  const handleButtonClick = (buttonName) => setActiveButton(buttonName);

  const handleCardClick = async (data) => {
    try {
      await AsyncStorage.setItem('selected_id_mutasi', data.id);
      navigation.navigate('DetailPenerimaanMutasi', { mu: data.mu });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
      const response = await fetch(`${apiUrl}/getMutasi`, { method: 'POST', body: formData });
      const responseData = await response.json();
      if (responseData.success) {
        setDataMutasi(responseData.mutasi);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchDataBasedOnParams = async () => {
      try {
        if (route.params && route.params.selectedStore) {
          const { selectedStore } = route.params;
          setIdToko(selectedStore.id_toko);
          await fetchData(selectedStore.id_toko);
        } else {
          const storedIdToko = await AsyncStorage.getItem('id_toko');
          if (storedIdToko) {
            setIdToko(storedIdToko);
            await fetchData(storedIdToko);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDataBasedOnParams();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput value={searchText} style={styles.search} autoCapitalize="none" selectionColor="black" placeholder="Cari ID Penerimaan Mutasi ..." onChangeText={(text) => setSearchText(text)}/>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => handleButtonClick('Proses')} style={[styles.buttonOff, activeButton === 'Proses' && styles.buttonOn]}>
            <Text style={[styles.buttonOffText, activeButton === 'Proses' && styles.buttonOnText]}>PROSES</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonClick('Selesai')} style={[styles.buttonOff, activeButton === 'Selesai' && styles.buttonOn]}>
            <Text style={[styles.buttonOffText, activeButton === 'Selesai' && styles.buttonOnText]}>SELESAI</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          keyExtractor={(item) => item.id}
          data={dataMutasi.filter((data) => data.id.includes(searchText) && (activeButton === 'Proses' ? ['0', '1'].includes(data.status) : ['2', '3'].includes(data.status)))}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleCardClick(item)}>
              <View style={styles.cardButton}>
                <Text style={styles.cardText1}>{`${item.id}`}</Text>
                <Text style={styles.cardText2}>{`${formatDate(item.created_at)}`}</Text>
              </View>
              <View style={styles.cardButton}>
                <Text style={styles.cardText3}>{`Asal: ${item.asal}`}</Text>
              </View>
              <View style={styles.cardButton}>
                <Text style={styles.cardText3}>{`Tujuan: ${item.tujuan}`}</Text>
              </View>
              <View style={styles.cardButton}>
                <Text style={styles.cardText4}>{`Status: ${status[item.status]}`}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
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
  search: {
    padding: 10,
    marginTop: -10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: 'grey',
    backgroundColor: '#F7F7F7',
  },
  button: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonOff: {
    padding: 10,
    width: '49%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
    alignItems: 'center',
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
  card: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#071952',
    backgroundColor: '#F7F7F7',
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
  },
  cardText4: {
    fontSize: 16,
    marginBottom: -5,
  },
});
export default AbsiTerimaMutasi;
