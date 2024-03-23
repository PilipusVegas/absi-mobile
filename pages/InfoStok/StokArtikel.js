import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

const AbsiStokArtikel = () => {
  const [dataBarang ] = useState([
    { id: '1', kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', jumlah: '10' },
    { id: '2', kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', jumlah: '10' },
    { id: '3', kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', jumlah: '10' },
    { id: '4', kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', jumlah: '10' },
    { id: '5', kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', jumlah: '10' },
    { id: '6', kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', jumlah: '10' },
    { id: '7', kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', jumlah: '10' },
    { id: '8', kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 3-1 (L)', jumlah: '10' },
    { id: '9', kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', jumlah: '10' },
  ]);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = dataBarang.filter(
      (item) => item.kodeArtikel.toLowerCase().indexOf(text.toLowerCase()) !== -1
    );
    setFilteredItems(filtered);
  };
  useEffect(() => {
    setFilteredItems(dataBarang);
  }, [dataBarang]);
  useEffect(() => {
    let total = 0;
    filteredItems.forEach((barang) => {
      total += parseInt(barang.jumlah);
    });
    setTotalItems(total);
  }, [filteredItems]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.labelColumn}>
          <View style={styles.labelRow}>
            <Text style={styles.labelText}>Total Artikel:</Text>
            <Text style={styles.labelText}>{filteredItems.length}</Text>
          </View>
          <View style={styles.labelRow}>
            <Text style={styles.labelText}>Total Stok Artikel:</Text>
            <Text style={styles.labelText}>{totalItems}</Text>
          </View>
        </View>
        <TextInput
          value={searchQuery}
          style={styles.search}
          onChangeText={handleSearch}
          placeholder="Cari kode barang..."
        />
        <View style={styles.label}>
          <Text style={styles.labelText1}>No.</Text>
          <Text style={styles.labelText2}>List Artikel</Text>
          <Text style={styles.labelText3}>Jumlah</Text>
        </View>
        <ScrollView style={styles.scroll}>
          {filteredItems.map((barang, index) => (
            <View
              key={index}
              onPress={() => handleItemPress(barang)}
              style={[styles.card, barang.jumlah === '20' ? styles.cardBackground : null]}
            >
              <View style={styles.cardRow}>
                <Text style={styles.cardText1}>{`${barang.id}.`}</Text>
                <View style={styles.cardColumn}>
                  <Text style={styles.cardText2}>{`${barang.kodeArtikel}`}</Text>
                  <Text style={styles.cardText3}>{`${barang.namaArtikel}`}</Text>
                </View>
                <Text style={styles.cardText5}>{`${barang.jumlah}`}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
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
  labelColumn: {
    padding: 10,
    marginTop: -10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'column',
    backgroundColor: '#071952',
  }, 
  labelRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  search: {
    padding: 10,
    width: '100%',
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 25,
    alignSelf: 'center',
    borderColor: '#071952',
    backgroundColor: 'white',
  },
  label: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    justifyContent: 'space-between',
  },
  labelText1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  labelText2: {
    fontSize: 16,
    marginLeft: -185,
    fontWeight: 'bold',
  },
  labelText3: {
    fontSize: 16,
    marginRight: 15,
    fontWeight: 'bold',
  },
  scroll: {
    marginBottom: 10,
  },
  card: {
    width: '95%',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#071952',
  },
  cardBackground: {
    backgroundColor: 'red',
  },
  cardRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardColumn: {
    flex: 1,
  },
  cardText1: {
    fontSize: 16,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  cardText2: {
    fontSize: 16,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  cardText3: {
    fontSize: 16,
    marginLeft: 15,
  },
  cardText5: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
  },
});
export default AbsiStokArtikel;