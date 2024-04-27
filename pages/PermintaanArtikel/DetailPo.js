import {apiUrl} from '../../globals.js';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, FlatList, StyleSheet, ActivityIndicator} from 'react-native';

const statusData = {
  0: 'Permintaan artikel belum disetujui TL',
  1: 'Permintaan artikel belum disetujui MV',
  2: 'Permintaan artikel sudah disetujui',
  3: 'Permintaan artikel sedang diproses',
  4: 'Permintaan artikel sedang dikirim',
  5: 'Permintaan artikel selesai',
  6: 'Permintaan artikel ditolak',
};

const AbsiDetailPO = () => {
  const [poData, setPoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [detailPoData, setDetailPoData] = useState([]);

  const noDataForAnyCategory = !isLoading && detailPoData.length === 0 && !poData;
  const totalItems = detailPoData.reduce((total, barang) => total + parseInt(barang.qty), 0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {setIsLoading(false)}, 200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedIdPo = await AsyncStorage.getItem('selected_id_po');
        const formData = new FormData();
        formData.append('id_po', selectedIdPo);
        const response = await fetch(apiUrl + '/getPoDetail', {method: 'POST', body: formData});
        const data = await response.json();
        if (data.success) {
          setPoData(data.po);
          setDetailPoData(data.detail_po);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setTimeout(() => {setIsLoading(false)}, 200);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#071952"/>
        ) : (
          <>
            {noDataForAnyCategory ? (
              <View><Text style={styles.cardEmpty}>"TIDAK ADA DATA"</Text></View>
            ) : (
              <>
                <View style={styles.header}>
                  <View style={styles.headerCard}>
                    <Text style={styles.headerCardText1}>{poData && poData.id}</Text>
                    <Text style={styles.headerCardText2}>{poData && formatDate(poData.created_at)}</Text>
                  </View>
                  <View style={styles.headerCard}>
                    <Text style={styles.headerCardText3}>{`Status: ${statusData[poData && poData.status]}`}</Text>
                  </View>
                </View>
                <FlatList
                  data={detailPoData}
                  keyExtractor={(item) => item.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.card}>
                      <Text style={styles.cardText1}>{`${item.kode}`}</Text>
                      <Text style={styles.cardText2}>{`${item.nama_produk}`}</Text>
                      <Text style={styles.cardText3}>{`Jumlah: ${item.qty}`}</Text>
                    </View>
                  )}
                />
                <View style={styles.footer}>
                  <Text style={styles.labelText}>Total Artikel:</Text>
                  <Text style={styles.labelText}>{totalItems}</Text>
                </View>
              </>
            )}
          </>
        )}
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
  cardEmpty: {
    padding: 15,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
  scroll: {
    marginBottom: 10,
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
  },
  cardText3: {
    fontSize: 16,
    marginBottom: -5,
  },
  footer: {
    padding: 10,
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
export default AbsiDetailPO;
