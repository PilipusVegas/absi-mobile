import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AbsiDetailPenerimaanMutasi = ({ route }) => {
  const [setSelectedCount] = useState(0);
  const { itemId, toko, tanggal } = route.params;
  const [totalItemsa, setTotalItemsa] = useState(0);
  const [totalItemsb, setTotalItemsb] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [dataBarang] = useState([
    { id: '1', kodeBarang: 'FG-HXKL-205MX-C', namaBarang: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', jumlahKirim: '10', jumlahTerima: '10', tanggalTerima: '05/01/2024' },
    { id: '2', kodeBarang: 'FG-HXKL-205MX-C', namaBarang: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', jumlahKirim: '10', jumlahTerima: '10', tanggalTerima: '05/01/2024' },
    { id: '3', kodeBarang: 'FG-HXKL-205MX-C', namaBarang: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', jumlahKirim: '10', jumlahTerima: '10', tanggalTerima: '05/01/2024' },
    { id: '4', kodeBarang: 'FG-HXKL-205MX-C', namaBarang: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', jumlahKirim: '10', jumlahTerima: '10', tanggalTerima: '05/01/2024' },
    { id: '5', kodeBarang: 'FG-HXKL-205MX-C', namaBarang: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', jumlahKirim: '10', jumlahTerima: '10', tanggalTerima: '05/01/2024' },
  ]);
  const handleItemPress = (barang) => {
    const itemIndex = selectedItems.findIndex((item) => item.id === barang.id);
    if (itemIndex !== -1) {
      const newSelectedItems = [...selectedItems];
      newSelectedItems.splice(itemIndex, 1);
      setSelectedItems(newSelectedItems);
      setSelectedCount(selectedItems.length - 1);
    } else {
      setSelectedItems([...selectedItems, barang]);
      setSelectedCount(selectedItems.length + 1);
    }
  };
  useEffect(() => {
    setFilteredItems(dataBarang);
  }, [dataBarang]);
  useEffect(() => {
    let total = 0;
    filteredItems.forEach((barang) => {
      total += parseInt(barang.jumlahKirim);
    });
    setTotalItemsa(total);
  }, [filteredItems]);
  useEffect(() => {
    let total = 0;
    filteredItems.forEach((barang) => {
      total += parseInt(barang.jumlahTerima);
    });
    setTotalItemsb(total);
  }, [filteredItems]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerLeft}>{itemId}</Text>
            <Text style={styles.headerRight}>{tanggal}</Text>
          </View>
          <View style={styles.headera}>
            <Text style={styles.headerLeft}>{`Dari: ${toko}`}</Text>
            <Text style={styles.headerRight}>{`Tanggal Di Terima: ${dataBarang[0].tanggalTerima}`}</Text>
          </View>
        </View>
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
                  <Text style={styles.cardText2}>{`${barang.kodeBarang}`}</Text>
                  <Text style={styles.cardText3}>{`${barang.namaBarang}`}</Text>
                  <Text style={styles.cardText4}>{`Jumlah Di Kirim: ${barang.jumlahKirim}`}</Text>
                </View>
                <Text style={styles.cardText5}>{`${barang.jumlahTerima}`}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.labela}>
          <View style={styles.labelb}>
            <Text style={styles.labelText}>Jumlah Barang Dikirim:</Text>
            <Text style={styles.labelText}>{totalItemsa}</Text>
          </View>
          <View style={styles.labelb}>
            <Text style={styles.labelText}>Jumlah Barang Diterima:</Text>
            <Text style={styles.labelText}>{totalItemsb}</Text>
          </View>
        </View>
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
  header: {
    padding: 15,
    marginTop: -10,
    borderRadius: 10,
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#071952',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  headera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
  },
  headerRight: {
    fontSize: 16,
    color: 'white',
    textAlign: 'right',
  },
  label: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
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
  cardText4: {
    fontSize: 16,
    marginLeft: 15,
  },
  cardText5: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
  },
  labela: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#071952',
  },
  labelb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default AbsiDetailPenerimaanMutasi;