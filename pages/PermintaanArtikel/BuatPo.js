import { useState, useEffect, useCallback } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const AbsiBuatPO = ({ navigation }) => {
  const [dataArtikel, setDataArtikel] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSearch = useCallback((text) => {
    setSearchQuery(text);
    const filtered = dataArtikel.filter((item) => item.kode.toLowerCase().indexOf(text.toLowerCase()) !== -1);
    setDataArtikel(filtered);
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
    try {
      const id_toko = await AsyncStorage.getItem('id_toko');
      const formData = new FormData();
      formData.append('id_toko', id_toko || '');
      const apiUrl = 'https://globalindo-group.com/absi_demo/api/listProdukToko';
      const response = await fetch(apiUrl, { method: 'POST', body: formData });
      const data = await response.json();
      if (Array.isArray(data)) {
        setDataArtikel(data);
      }
    } catch (error) {
      //
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput value={searchQuery} style={styles.search} selectionColor="black" onChangeText={handleSearch} autoCapitalize="characters" placeholder="Cari Kode Artikel ..." />
        <Text style={styles.label}>LIST ARTIKEL</Text>
        <ScrollView style={styles.scroll}>
          {dataArtikel.map((barang, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => handleItemPress(barang)}>
              <View style={styles.cardRow}>
                <View style={styles.cardColumn}>
                  <Text style={styles.cardText1}>{`${barang.kode}`}</Text>
                  <Text style={styles.cardText2}>{`${barang.nama_produk}`}</Text>
                </View>
                <Text style={[styles.cardButton, { borderColor: selectedItems.some((item) => item.id === barang.id) ? 'red' : '#071952' }]}>{selectedItems.some((item) => item.id === barang.id) ? 'HAPUS' : 'TAMBAH'}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={handleNavigate} disabled={selectedCount === 0} style={[styles.buttonOn, selectedCount === 0 && styles.buttonOff]}>
          <Text style={styles.buttonText}>{selectedCount ? `${selectedCount} ARTIKEL TERPILIH` : '0 ARTIKEL TERPILIH'}</Text>
          <MaterialCommunityIcons size={20} color="white" name="arrow-right-bold" />
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
  search: {
    padding: 10,
    marginTop: -10,
    borderWidth: 2,
    marginBottom: 5,
    borderRadius: 10,
    borderColor: 'grey',
    backgroundColor: '#F7F7F7',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  scroll: {
    flex: 1,
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