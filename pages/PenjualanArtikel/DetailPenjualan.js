import { apiUrl } from '../../globals.js';
import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AbsiDetailPenjualan = () => {
  const [penjualanData, setPenjualanData] = useState(null);
  const [detailPenjualanData, setDetailPenjualanData] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchData = async () => {
    try {
      const selectedIdPenjualan = await AsyncStorage.getItem('selected_id_penjualan');
      if (selectedIdPenjualan) {
        const formData = new FormData();
        formData.append('id_jual', selectedIdPenjualan);
        const response = await fetch(`${apiUrl}/getJualDetail`, { method: 'POST', body: formData });
        const data = await response.json();
        if (data.success) {
          setPenjualanData(data.jual);
          setDetailPenjualanData(data.detail);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.header}>
          <View style={styles.headerCard}>
            <Text style={styles.headerCardText1}>{penjualanData && penjualanData.id}</Text>
            <Text style={styles.headerCardText2}>{penjualanData && formatDate(penjualanData.created_at)}</Text>
          </View>
        </View>
        <FlatList
          data={detailPenjualanData}
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
export default AbsiDetailPenjualan;
