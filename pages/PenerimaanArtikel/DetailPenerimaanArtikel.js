import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AbsiDetailPenerimaanArtikel = ({ route }) => {
  const [setSelectedCount] = useState(0);
  const { km, tanggal } = route.params;
  const [totalItems, setTotalItems] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [quantityMismatch, setQuantityMismatch] = useState(false);
  const [dataBarang] = useState([
    { id: '1', kodeBarang: 'FG-HXKL-205MX-C', namaBarang: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', jumlahKirim: '10', jumlahTerima: '10', tanggalTerima: '05/01/2024' },
    { id: '2', kodeBarang: 'FG-HXKL-205MX-C', namaBarang: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', jumlahKirim: '20', jumlahTerima: '10', tanggalTerima: '05/01/2024' },
    { id: '3', kodeBarang: 'FG-HXKL-205MX-C', namaBarang: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', jumlahKirim: '10', jumlahTerima: '10', tanggalTerima: '05/01/2024' },
    { id: '4', kodeBarang: 'FG-HXKL-205MX-C', namaBarang: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', jumlahKirim: '20', jumlahTerima: '10', tanggalTerima: '05/01/2024' },
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
      total += parseInt(barang.jumlahTerima);
    });
    setTotalItems(total);
  }, [filteredItems]);
  useEffect(() => {
    let total = 0;
    let mismatchDetected = false;
    filteredItems.forEach((barang) => {
      total += parseInt(barang.jumlahTerima);
      if (parseInt(barang.jumlahKirim) !== parseInt(barang.jumlahTerima)) {
        mismatchDetected = true;
      }
    });
    setTotalItems(total);
    setQuantityMismatch(mismatchDetected);
  }, [filteredItems]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTextleft}>{km}</Text>
            <Text style={styles.headerText}>{tanggal}</Text>
          </View>
          <Text style={styles.headerText}>{`Tanggal Di Terima: ${dataBarang[0].tanggalTerima}`}</Text>
          <Text style={styles.headerText}>{`Catatan: Ada 5 buah kerdus`}</Text>
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
              style={[
                styles.card,
                barang.jumlahKirim !== barang.jumlahTerima ? styles.cardError : null,
              ]}
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
        {quantityMismatch && (
          <Text style={styles.textError}>
            * Jumlah artikel yang diterima tidak sesuai dengan jumlah artikel yang dikirim, segera laporkan ini ke Team Leader atau buat BAP.
          </Text>
        )}
        <View style={styles.labela}>
          <Text style={styles.labelText}>Total Barang:</Text>
          <Text style={styles.labelText}>{totalItems}</Text>
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
  headerTextleft: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 16,
    color: 'white',
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
  cardError: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'red',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
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
  textError: {
    color: 'red',
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 5,
  },
  labela: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#071952',
    justifyContent: 'space-between',
  },
  labelText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default AbsiDetailPenerimaanArtikel;