import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const AbsiDetailPenerimaanArtikel = ({ route }) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const { id_kirim, created_at, catatan_spg } = route.params;
  const [quantityMismatch, setQuantityMismatch] = useState(false);

  let totalSent = 0; 
  filteredItems.forEach((barang) => {totalSent += parseInt(barang.qty)});

  let totalReceived = 0; 
  filteredItems.forEach((barang) => {totalReceived += parseInt(barang.qty_diterima)});

  useEffect(() => {
    let mismatchDetected = false;
    filteredItems.forEach((barang) => {
      if (parseInt(barang.qty) !== parseInt(barang.qty_diterima)) {
        mismatchDetected = true;
      }
    });
    setQuantityMismatch(mismatchDetected);
  }, [filteredItems]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        formData.append('id_kirim', id_kirim);
        console.log('ID Kirim:', id_kirim);
        const apiUrl = 'https://globalindo-group.com/absi_demo/api/getTerimaDetail';
        const response = await fetch(apiUrl, { method: 'POST', body: formData });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('API Response:', data);
        if (data.success) {setFilteredItems(data.detail_po)}
      } catch (error) {
        //
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>{id_kirim}</Text>
            <Text style={styles.headerText}>{created_at.split(' ')[0].split('-').reverse().join('-')}</Text>
          </View>
          <Text style={styles.headerText}>Catatan: {catatan_spg ? catatan_spg : '-'}</Text>
        </View>
        <View style={styles.label}>
          <Text style={styles.labelText1}>NO.</Text>
          <Text style={styles.labelText2}>ARTIKEL</Text>
        </View>
        <ScrollView style={styles.scroll}>
          {filteredItems.map((barang, index) => (
            <TouchableOpacity key={index} style={[styles.card, parseInt(barang.qty) !== parseInt(barang.qty_diterima) ? styles.cardError : null]}>
              <View style={styles.cardRow}>
                <Text style={styles.cardText1}>{`${index + 1}.`}</Text>
                <View style={styles.cardColumn}>
                  <Text style={styles.cardText2}>{`${barang.kode}`}</Text>
                  <Text style={styles.cardText2}>{`${barang.nama_produk}`}</Text>
                  <Text style={styles.cardText2}>{`Jumlah Kirim: ${barang.qty}`}</Text>
                  <Text style={styles.cardText2}>{`Jumlah Terima: ${barang.qty_diterima}`}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {quantityMismatch && (<Text style={styles.textInfo}>Selisih (Jumlah artikel yang diterima tidak sesuai dengan jumlah artikel yang dikirim, segera laporkan ini ke Team Leader atau buat BAP).</Text>)}
        <View style={styles.bottom}>
          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Total Kirim:</Text>
            <Text style={styles.bottomText}>{totalSent} Artikel</Text>
          </View>
          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Total Terima:</Text>
            <Text style={styles.bottomText}>{totalReceived} Artikel</Text>
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
    padding: 10,
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
  headerText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    justifyContent: 'space-between',
  },
  labelText1: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  labelText2: {
    fontSize: 16,
    marginRight: 150,
    fontWeight: 'bold',
  },
  scroll: {
    marginBottom: 10,
  },
  card: {
    width: '95%',
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'green',
  },
  cardError: {
    width: '95%',
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'red',
  },
  cardRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardText1: {
    fontSize: 16,
    marginLeft: 15,
  },
  cardColumn: {
    flex: 1,
  },
  cardText2: {
    fontSize: 16,
    marginLeft: 50,
  },
  textInfo: {
    padding: 10,
    color: 'red',
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: 'red',
  },
  bottom: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#071952',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default AbsiDetailPenerimaanArtikel;
