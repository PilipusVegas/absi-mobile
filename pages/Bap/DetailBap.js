import { apiUrl } from '../../globals.js';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const statusData = {
  0: 'Menunggu di approve Leader',
  1: 'Menunggu di approve MV',
  2: 'Selesai',
  3: 'Di Tolak',
};

const kategoriData = {
  1: 'Pengiriman artikel',
  2: 'Mutasi artikel',
};

const AbsiDetailBap = ({ route }) => {
  const [totalItems, setTotalItems] = useState(0);
  const [dataArtikel, setDataArtikel] = useState([]);
  const { id, status, kategori, catatan, id_kirim, created_at } = route.params;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedIdBap = await AsyncStorage.getItem('selected_id');
        const formData = new FormData();
        formData.append('id_bap', selectedIdBap);
        const response = await fetch(apiUrl + '/getBapDetail', { method: 'POST', body: formData });
        const data = await response.json();
        if (data.success) {
          setDataArtikel(data.detail);
        }
      } catch (error) {
        //
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    let total = 0;
    dataArtikel.forEach((barang) => { total += parseInt(barang.updatedJumlah) });
    setTotalItems(total);
  }, [dataArtikel]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerLabel}>{id_kirim}</Text>
            <Text style={styles.headerLabel}>{formatDate(created_at)}</Text>
          </View>
          <View style={styles.headerColumn}>
            <Text style={styles.headerLabel}>Kategori: {kategoriData[kategori]}</Text>
          </View>
          <View style={styles.headerColumn}>
            <Text style={styles.headerLabel}>Status: {statusData[status]}</Text>
          </View>
          <View style={styles.headerColumn}>
            <Text style={styles.headerLabel}>Catatan: {catatan}</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          {dataArtikel.map((barang, index) => (
            <View key={index} style={[styles.card, barang.updatedJumlah === '20' ? styles.cardBackground : null]}>
              <View style={styles.cardRow}>
                <Text style={styles.headerText1}>{`${index + 1}.`}</Text>
                <View style={styles.cardColumn}>
                  <Text style={styles.headerText2}>{`${barang.kode}`}</Text>
                  <Text style={styles.headerText2}>{`${barang.nama_produk}`}</Text>
                  <Text style={styles.headerText2}>{`Quantity: ${barang.qty_awal}`} || {`Update: ${barang.qty_update}`}</Text>
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
  scrollView: {
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
