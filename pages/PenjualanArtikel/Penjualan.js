import { apiUrl } from '../../globals.js';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const AbsiPenjualan = ({ route, navigation }) => {
  const [idToko, setIdToko] = useState(null);
  const [dataToShow, setDataToShow] = useState([]);
  const [searchText, setSearchText] = useState('');

  const filterDataById = (text) => {
    const filteredData = dataToShow.filter((item) =>
      item.id.toLowerCase().includes(text.toLowerCase())
    );
    setDataToShow(filteredData);
  };

  const handleCardClick = async (data) => {
    try {
      if (data.id) {
        await AsyncStorage.setItem('selected_id_penjualan', data.id);
        navigation.navigate('DetailPenjualan', { pj: data.id });
      }
    } catch (error) {
      console.error('Error handling card click:', error);
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
      const response = await fetch(apiUrl + '/getPenjualan', { method: 'POST', body: formData });
      const responseData = await response.json();
      if (responseData.success && responseData.penjualan) {
        setDataToShow(responseData.penjualan);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchDataBasedOnParams = async () => {
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
    };
    fetchDataBasedOnParams();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
      <TextInput value={searchText} selectionColor="black" style={styles.textInput} autoCapitalize="characters" placeholder="Cari ID Pengiriman ..." onChangeText={(text) => setSearchText(text)}/>
        <FlatList
          style={styles.flatList}
          keyExtractor={(item) => item.id.toString()}
          data={dataToShow.filter((data) => data.id.includes(searchText))}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleCardClick(item)}>
              <View style={styles.cardButton}>
                <Text style={styles.cardText1}>{item.id}</Text>
                <Text style={styles.cardText2}>{`${formatDate(item.created_at)}`}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BuatPenjualan')}>
        <MaterialCommunityIcons name="plus" size={24} color="white"/>
        <Text style={styles.buttonText}>Input Penjualan</Text>
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
  flatList: {
    marginBottom: 75,
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
export default AbsiPenjualan;
