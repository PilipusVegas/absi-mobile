import { apiUrl } from '../../globals.js';
import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const statusDescriptions = {
  0: 'Menunggu di approve Leader',
  1: 'Menunggu di approve MV',
  2: 'Sudah di approve',
  3: 'Proses Retur',
  4: 'Proses Retur',
  5: 'Selesai',
  6: 'Di Tolak',
};

const AbsiDetailRetur = () => {
  const [returData, setReturData] = useState(null);
  const [detailReturData, setDetailReturData] = useState([]);
  const totalItems = detailReturData.reduce((total, barang) => total + parseInt(barang.qty), 0);

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
        const selectedIdRetur = await AsyncStorage.getItem('selected_id');
        const formData = new FormData();
        formData.append('id_retur', selectedIdRetur);
        const response = await fetch(apiUrl + '/getReturDetail', { method: 'POST', body: formData });
        const data = await response.json();
        if (data.success) {
          setReturData(data.retur);
          setDetailReturData(data.detail);
        }
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
            <Text style={styles.headerLeft}>{returData && returData.id}</Text>
            <Text style={styles.headerRight}>{returData && formatDate(returData.created_at)}</Text>
          </View>
          <View style={styles.headerColumn}>
            <Text style={styles.headerLeft}>{`Status: ${statusDescriptions[returData && returData.status]}`}</Text>
          </View>
        </View>
        <View style={styles.label}>
          <Text style={styles.labelText1}>No.</Text>
          <Text style={styles.labelText2}>List Artikel</Text>
          <Text style={styles.labelText3}>Jumlah</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          {detailReturData.map((barang, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardRow}>
                <Text style={styles.cardText1}>{`${index + 1}.`}</Text>
                <View style={styles.cardColumn}>
                  <Text style={styles.cardText2}>{`${barang.kode}`}</Text>
                  <Text style={styles.cardText2}>{`${barang.nama_produk}`}</Text>
                </View>
                <Text style={styles.cardText3}>{`${barang.qty}`}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerLabel}>Total Barang:</Text>
          <Text style={styles.footerLabel}>{totalItems}</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    justifyContent: 'space-between',
  },
  headerLeft: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  headerRight: {
    fontSize: 16,
    color: 'white',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  headerColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginLeft: -100,
    fontWeight: 'bold',
  },
  labelText3: {
    fontSize: 16,
    marginRight: 15,
    fontWeight: 'bold',
  },
  scrollView: {
    marginBottom: 10,
  },
  card: {
    width: '95%',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#071952',
  },
  cardRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardText1: {
    fontSize: 16,
  },
  cardColumn: {
    flex: 1,
  },
  cardText2: {
    fontSize: 16,
    marginLeft: 50,
  },
  cardText3: {
    fontSize: 16,
    marginRight: 10,
  },
  footer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#071952',
    justifyContent: 'space-between',
  },
  footerLabel: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default AbsiDetailRetur;
