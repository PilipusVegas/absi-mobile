import { apiUrl } from '../../globals.js';
import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
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
        const response = await fetch(`${apiUrl}/getReturDetail`, { method: 'POST', body: formData });
        const data = await response.json();
        if (data.success) {
          setReturData(data.retur);
          setDetailReturData(data.detail);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.header}>
          <View style={styles.headerCard}>
            <Text style={styles.headerCardText1}>{returData && returData.id}</Text>
            <Text style={styles.headerCardText2}>{returData && formatDate(returData.created_at)}</Text>
          </View>
          <View style={styles.headerCard}>
            <Text style={styles.headerCardText3}>{`Status: ${statusDescriptions[returData && returData.status]}`}</Text>
          </View>
        </View>
        <FlatList
          data={detailReturData}
          style={styles.flatList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText1}>{`${item.kode} / ${item.nama_produk}`}</Text>
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
  header: {
    padding: 10,
    marginTop: -10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#071952',
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerCardText1: {
    fontSize: 16,
    marginTop: -5,
    color: 'white',
    fontWeight: 'bold',
  },
  headerCardText2: {
    fontSize: 16,
    marginTop: -5,
    color: 'white',
  },
  headerCardText3: {
    fontSize: 16,
    color: 'white',
    marginBottom: -5,
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
export default AbsiDetailRetur;
