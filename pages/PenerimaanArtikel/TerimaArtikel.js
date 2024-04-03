import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const status = {
  0: 'Menunggu di approve',
  1: 'Proses kirim',
  2: 'Selesai',
  3: 'Selisih',
};

const AbsiTerimaArtikel = ({ navigation, route }) => {
  const [idToko, setIdToko] = useState(null);
  const [dataProses, setDataProses] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [dataSelesai, setDataSelesai] = useState([]);
  const [activeButton, setActiveButton] = useState('Proses');
  const handleButtonClick = (buttonName) => setActiveButton(buttonName);

  const handleCardClick = (data) => {
    if (['0', '1'].includes(data.status)) {
      navigation.navigate('DetailTerimaArtikel', {id_kirim: data.id, created_at: data.created_at, catatan_spg: data.catatan_spg});
    } else if (['2', '3'].includes(data.status)) {
      navigation.navigate('DetailPenerimaanArtikel', {id_kirim: data.id, created_at: data.created_at, catatan_spg: data.catatan_spg});
    }
  };

  const fetchData = async (id_toko) => {
    try {
      const formData = new FormData();
      formData.append('id_toko', id_toko);
      const apiUrl = 'https://globalindo-group.com/absi_demo/api/getTerimaPo';
      const response = await fetch(apiUrl, { method: 'POST', body: formData });
      const responseData = await response.json();
      if (responseData.success) {
        const data = responseData.pengiriman;
        const dataProsesFiltered = data.filter((item) =>
          ['0', '1'].includes(item.status)
        );
        const dataSelesaiFiltered = data.filter((item) =>
          ['2', '3'].includes(item.status)
        );
        setDataProses(dataProsesFiltered);
        setDataSelesai(dataSelesaiFiltered);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchDataBasedOnParams = async () => {
      try {
        if (route.params && route.params.selectedStore) {
          const { selectedStore } = route.params;
          setIdToko(selectedStore.id_toko);
          await fetchData(selectedStore.id_toko);
        } else {
          const storedIdToko = await AsyncStorage.getItem('id_toko');
          if (storedIdToko) {
            setIdToko(storedIdToko);
            await fetchData(storedIdToko);
          }
        }
      } catch (error) {
        //
      }
    };
    fetchDataBasedOnParams();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput value={searchText} style={styles.search} autoCapitalize="none" selectionColor="black" placeholder="Cari ID Pengiriman ..." onChangeText={(text) => setSearchText(text)}/>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => handleButtonClick('Proses')} style={[styles.buttonOff, activeButton === 'Proses' && styles.buttonOn]}>
            <Text style={[styles.buttonOffText, activeButton === 'Proses' && styles.buttonOnText]}>PROSES</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonClick('Selesai')} style={[styles.buttonOff, activeButton === 'Selesai' && styles.buttonOn]}>
            <Text style={[styles.buttonOffText, activeButton === 'Selesai' && styles.buttonOnText]}>SELESAI</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scroll}>
          {(activeButton === 'Proses' && dataProses.length === 0) || (activeButton === 'Selesai' && dataSelesai.length === 0) ? (
            <Text style={styles.cardEmpty}>TIDAK ADA DATA</Text>
          ) : (
            <>
              {activeButton === 'Proses'
                ? dataProses
                  .filter((data) => data.id.includes(searchText))
                  .map((data, index) => (
                    <TouchableOpacity key={index} style={styles.card} onPress={() => handleCardClick(data)}>
                      <View style={styles.cardRow}>
                        <View style={styles.cardLeft}>
                          <Text style={styles.cardText1}>{`${data.id}`}</Text>
                          <Text style={styles.cardText2}>{`No. PO: ${data.id_permintaan}`}</Text>
                          <Text style={styles.cardText2}>{`Tanggal: ${data.created_at.split(' ')[0].split('-').reverse().join('-')}`}</Text>
                          <Text style={styles.cardText3}>{`Status: ${status[data.status]}`}</Text>
                        </View>
                        <Text style={styles.cardRight}>TERIMA</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                : dataSelesai
                  .filter((data) => data.id.includes(searchText))
                  .map((data, index) => (
                    <TouchableOpacity key={index} onPress={() => handleCardClick(data)} style={[styles.card, {borderColor: data.status === '2' ? 'green' : 'red'}]}>
                      <View style={styles.cardRow}>
                        <View style={styles.cardLeft}>
                          <Text style={styles.cardText1}>{`${data.id}`}</Text>
                          <Text style={styles.cardText2}>{`No. PO: ${data.id_permintaan}`}</Text>
                          <Text style={styles.cardText2}>{`Tanggal: ${data.created_at.split(' ')[0].split('-').reverse().join('-')}`}</Text>
                          <Text style={styles.cardText3}>{`Status: ${status[data.status]}`}</Text>
                        </View>
                        <Text style={styles.cardRight}>DETAIL</Text>
                      </View>
                    </TouchableOpacity>
                  ))
              }
            </>
          )}
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
  search: {
    padding: 10,
    marginTop: -10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: 'grey',
    backgroundColor: '#F7F7F7',
  },
  button: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonOff: {
    padding: 10,
    width: '49%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  buttonOn: {
    borderColor: 'white',
    backgroundColor: '#071952',
  },
  buttonOffText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  buttonOnText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  scroll: {
    marginBottom: 10,
  },
  cardEmpty: {
    padding: 32,
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    borderColor: '#071952',
  },
  card: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#071952',
    backgroundColor: '#fff',
  },
  cardRow: {
    flexDirection: 'row',
  },
  cardLeft: {
    flex: 1,
    marginRight: 5,
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
  cardRight: {
    padding: 10,
    fontSize: 16,
    color: 'black',
    borderWidth: 2,
    borderRadius: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    borderColor: 'grey',
    backgroundColor: '#F7F7F7',
  },
});
export default AbsiTerimaArtikel;
