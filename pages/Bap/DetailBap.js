import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const statusDescriptions = {
  0: 'Menunggu di approve Leader',
  1: 'Menunggu di approve MV',
  2: 'Sudah di approve MV',
  3: 'Sedang di siapkan',
  4: 'Sedang di kirim',
  5: 'Selesai',
  6: 'Di Tolak',
};

const modulDescriptions = {
  0: 'Penerimaan artikel',
  1: 'Mutasi artikel',
};

const AbsiDetailBap = ({ route }) => {
  const [dataArtikel, setDataArtikel] = useState([
    { id: '1', kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', quantity: '100', update: '100' },
    { id: '2', kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', quantity: '100', update: '100' },
    { id: '3', kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', quantity: '100', update: '100' },
    { id: '4', kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', quantity: '100', update: '100' },
    { id: '5', kodeArtikel: 'FG-HXKL-205MX-C', namaArtikel: 'Hicoop Boxer Karet Luar Mix Max Seri 2-1 (L)', quantity: '100', update: '100' },
  ]);

  const [totalItems, setTotalItems] = useState(0);
  const { pm, status, tanggal, modul } = route.params;

  useEffect(() => {
    let total = 0;
    dataArtikel.forEach((barang) => {total += parseInt(barang.updatedJumlah)});
    setTotalItems(total);
  }, [dataArtikel]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerLabel}>{pm}</Text>
            <Text style={styles.headerLabel}>{tanggal}</Text>
          </View>
          <View style={styles.headerColumn}>
            <Text style={styles.headerLabel}>{`Modul: ${modulDescriptions[modul] || modul}`}</Text>
          </View>
          <View style={styles.headerColumn}>
            <Text style={styles.headerLabel}>{`Status: ${statusDescriptions[status] || status}`}</Text>
          </View>
        </View>

        <ScrollView style={styles.scroll}>
          {dataArtikel.map((barang, index) => (
            <View key={index} style={[styles.card, barang.updatedJumlah === '20' ? styles.cardBackground : null]}>
              <View style={styles.cardRow}>
                <Text style={styles.headerText1}>{`${barang.id}.`}</Text>
                <View style={styles.cardColumn}>
                  <Text style={styles.headerText2}>{`${barang.kodeArtikel}`}</Text>
                  <Text style={styles.headerText2}>{`${barang.namaArtikel}`}</Text>
                  <Text style={styles.headerText2}>{`Quantity: ${barang.quantity}`} || {`Update: ${barang.update}`}</Text>
                </View>
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
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    justifyContent: 'space-between',
  },
  headerLabel: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  headerColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scroll: {
    marginBottom: 10,
  },
  card: {
    width: '95%',
    marginBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#071952',
  },
  cardRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText1: {
    fontSize: 16,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  cardColumn: {
    flex: 1,
  },
  headerText2: {
    fontSize: 16,
    marginLeft: 20,
  },
});
export default AbsiDetailBap;