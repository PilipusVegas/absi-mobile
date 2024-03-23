import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const statusDescriptions = {
  0: 'Menunggu di approve Leader',
  1: 'Menunggu di approve MV',
  2: 'Sudah di approve MV',
  3: 'Sedang di siapkan',
  4: 'Sedang di kirim',
  5: 'Selesai',
  6: 'Di Tolak',
};

const AbsiDetailPO = () => {
  const [poData, setPoData] = useState(null);
  const [detailPoData, setDetailPoData] = useState([]);
  const totalItems = detailPoData.reduce((total, barang) => total + parseInt(barang.qty), 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedIdPo = await AsyncStorage.getItem('selected_id_po');
        const formData = new FormData();
        formData.append('id_po', selectedIdPo);
        const apiUrl = 'https://globalindo-group.com/absi_demo/api/getPoDetail';
        const response = await fetch(apiUrl, {method: 'POST', body: formData});
        const data = await response.json();
        console.log(`success: ${data.success}, message: ${data.message}`);
        console.log(data.detail_po);
        if (data.success) {setPoData(data.po); setDetailPoData(data.detail_po)}
      } catch (error) {
        console.error(error);
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
            <Text style={styles.headerLeft}>{poData && poData.id}</Text>
            <Text style={styles.headerRight}>{poData && new Date(poData.created_at).toLocaleDateString()}</Text>
          </View>
          <View style={styles.headerColumn}>
            <Text style={styles.headerLeft}>{`Status: ${statusDescriptions[poData && poData.status]}`}</Text>
          </View>
        </View>
        <View style={styles.label}>
          <Text style={styles.labelText1}>No.</Text>
          <Text style={styles.labelText2}>List Artikel</Text>
          <Text style={styles.labelText3}>Jumlah</Text>
        </View>
        <ScrollView style={styles.scroll}>
          {detailPoData.map((barang, index) => (
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
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    justifyContent: 'space-between',
  },
  headerColumn: {
    flexDirection: 'row',
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
  scroll: {
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
  cardColumn: {
    flex: 1,
  },
  cardText1: {
    fontSize: 16,
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
  labelText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default AbsiDetailPO;