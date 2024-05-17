import { apiUrl } from '../../globals.js';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';

const AbsiStokArtikel = ({ route }) => {
  const [idToko, setIdToko] = useState('');
  const [dataBarang, setDataBarang] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = dataBarang.filter(
      (item) => item.kode.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const fetchData = async (id_toko) => {
    try {
      const formData = new FormData();
      formData.append('id_toko', id_toko);
      const response = await fetch(`${apiUrl}/listProdukToko`, { method: 'POST', body: formData });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const json = await response.json();
      setDataBarang(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    setFilteredItems(dataBarang);
  }, [dataBarang]);

  useEffect(() => {
    const fetchDataBasedOnParams = async () => {
      if (route.params && route.params.selectedStore) {
        const { selectedStore } = route.params;
        setIdToko(selectedStore.id_toko);
        await fetchData(selectedStore.id_toko);
      } else {
        const getStoredIdToko = async () => {
          try {
            const storedIdToko = await AsyncStorage.getItem('id_toko');
            if (storedIdToko) {
              setIdToko(storedIdToko);
              await fetchData(storedIdToko);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        getStoredIdToko();
      }
    };
    fetchDataBasedOnParams();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput value={searchQuery} selectionColor="black" style={styles.textInput} onChangeText={handleSearch} autoCapitalize="characters" placeholder="Cari ID Artikel ..."/>
        <FlatList 
          data={filteredItems} 
          style={styles.flatList}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText1}>{item.kode} / {item.nama_produk}</Text>
              <Text style={styles.cardText2}>{`Jumlah: ${item.qty}`}</Text>
            </View>
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
    marginBottom: 10,
  },
  card: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#071952',
  },
  cardText1: {
    fontSize: 16,
    marginTop: -5,
    fontWeight: 'bold',
  },
  cardText2: {
    fontSize: 16,
    marginBottom: -5,
  },
});
export default AbsiStokArtikel;
