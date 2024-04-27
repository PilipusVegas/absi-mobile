import {apiUrl} from '../../globals.js';
import {useState, useEffect, useCallback} from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';

const AbsiBuatPO = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataArtikel, setDataArtikel] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredDataArtikel, setFilteredDataArtikel] = useState([]);

  const handleSearch = useCallback((text) => {
    setSearchQuery(text);
    const filtered = dataArtikel.filter((item) => item.kode.toLowerCase().includes(text.toLowerCase()));
    setFilteredDataArtikel(filtered);
  }, [dataArtikel]);

  const handleNavigate = useCallback(() => {
    if (selectedCount === 0) {
      return; 
    } else {
      navigation.navigate('KeranjangPo', { selectedItems });
    }
  }, [selectedCount, selectedItems, navigation]);

  const handleItemPress = useCallback((barang) => {
    const newSelectedItems = [...selectedItems];
    const itemIndex = newSelectedItems.findIndex((item) => item.id === barang.id);
    if (itemIndex !== -1) {
      newSelectedItems.splice(itemIndex, 1);
    } else {
      newSelectedItems.push(barang);
    }
    setSelectedCount(newSelectedItems.length);
    setSelectedItems(newSelectedItems);
  }, [selectedItems]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const id_toko = await AsyncStorage.getItem('id_toko');
      const formData = new FormData();
      formData.append('id_toko', id_toko || '');
      const response = await fetch(apiUrl + '/listProdukToko', {method: 'POST', body: formData});
      const data = await response.json();
      if (Array.isArray(data)) {
        setDataArtikel(data);
        setFilteredDataArtikel(data);
        setTimeout(() => {setIsLoading(false)}, 200);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput value={searchQuery} selectionColor="black" style={styles.textInput} onChangeText={handleSearch} autoCapitalize="characters" placeholder="Cari ID Artikel ..."/>
        {isLoading ? (
          <ActivityIndicator size="large" color="#071952"/>
        ) : (
          <FlatList
            style={styles.flatList}
            data={filteredDataArtikel}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card} onPress={() => handleItemPress(item)}>
                <View style={styles.cardRow}>
                  <View style={styles.cardColumn}>
                    <Text style={styles.cardText1}>{`${item.kode}`}</Text>
                    <Text style={styles.cardText2}>{`${item.nama_produk}`}</Text>
                  </View>
                  <Text style={[styles.cardButton, { borderColor: selectedItems.some((selectedItem) => selectedItem.id === item.id) ? 'red' : '#071952' }]}>{selectedItems.some((selectedItem) => selectedItem.id === item.id) ? 'HAPUS' : 'TAMBAH'}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
        <TouchableOpacity onPress={handleNavigate} disabled={selectedCount === 0} style={[styles.buttonOn, selectedCount === 0 && styles.buttonOff]}>
          <Text style={styles.buttonText}>{selectedCount ? `${selectedCount} ARTIKEL TERPILIH` : '0 ARTIKEL TERPILIH'}</Text>
          <MaterialCommunityIcons size={25} color="white" name="arrow-right-bold"/>
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
  textInput: {
    padding: 10,
    marginTop: -10,
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: 'grey',
    backgroundColor: '#F7F7F7',
  },
  flatList: {
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
    marginBottom: -5,
  },
  cardButton: {
    padding: 5,
    fontSize: 16,
    color: 'black',
    borderWidth: 2,
    borderRadius: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#F7F7F7',
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
export default AbsiBuatPO;
