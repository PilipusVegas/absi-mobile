import {useState, useEffect} from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

const statusDescriptions = {
  0: 'Menunggu di approve Leader',
  1: 'Menunggu di approve MV',
  2: 'Sudah di approve MV',
  3: 'Sedang di siapkan',
  4: 'Sedang di kirim',
  5: 'Selesai',
  6: 'Di Tolak',
};

const AbsiPOArtikel = ({route, navigation}) => {
  const [idToko, setIdToko] = useState(null);
  const [dataToShow, setDataToShow] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonName) => {setActiveButton(buttonName)};

  useEffect(() => {
    const fetchDataBasedOnParams = async () => {
      if (route.params && route.params.selectedStore) {
        const {selectedStore} = route.params;
        setIdToko(selectedStore.id_toko);
        await fetchData(selectedStore.id_toko);
      } else {
        const getStoredIdToko = async () => {
          try {
            const storedIdToko = await AsyncStorage.getItem('id_toko');
            if (storedIdToko) {setIdToko(storedIdToko); fetchData(storedIdToko)}
          } catch (error) {
            //
          }
        };
        getStoredIdToko();
      }
    };
    fetchDataBasedOnParams();
  }, [route.params]);

  const handleCardClick = async (data) => {
    try {
      await AsyncStorage.setItem('selected_id_po', data.id);
      navigation.navigate('DetailPo', { 
        pm: data.pm,
        status: data.status,
        tanggal: data.tanggal,
      });
    } catch (error) {
      //
    }
  };

  const renderFilteredData = () => {
    let filteredData = dataToShow;
    if (searchText.trim() !== '') {filteredData = filteredData.filter(item => item.id.toString().toLowerCase().includes(searchText.toLowerCase().trim()))}
    if (activeButton === 'Proses') {
      filteredData = filteredData.filter(data => [0, 1, 2, 3, 4].includes(parseInt(data.status)));
    } else if (activeButton === 'Selesai') {
      filteredData = filteredData.filter(data => parseInt(data.status) === 5);
    } else if (activeButton === 'Tolak') {
      filteredData = filteredData.filter(data => parseInt(data.status) === 6);
    }
    return renderData(filteredData);
  };

  const fetchData = async (id_toko) => {
    try {
      const formData = new FormData();
      formData.append('id_toko', id_toko);
      const apiUrl = 'https://globalindo-group.com/absi_demo/api/getPo';
      const response = await fetch(apiUrl, {method: 'POST', body: formData});
      const data = await response.json();
      console.log(`success: ${data.success}, message: ${data.message}`);
      console.log(data.permintaan);
      if (data.success) {
        const idPoArray = data.permintaan.map(item => item.id);
        await AsyncStorage.setItem('id_po', JSON.stringify(idPoArray));
        setDataToShow(data.permintaan);
      }
    } catch (error) {
      //
    }
  };

  const renderData = (data) => {
    return (
      <ScrollView style={styles.scroll}>
        {data.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleCardClick(item)} style={[styles.card, item.status === '0' && {borderColor: '#071952'}, item.status === '6' && {borderColor: 'red'}]}>
            <Text style={styles.cardText1}>{`${item.id}`}</Text>
            <Text style={styles.cardText2}>{`Status: ${statusDescriptions[item.status]}`}</Text>
            <Text style={styles.cardText3}>{`Tanggal: ${new Date(item.created_at).toLocaleDateString()}`}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput value={searchText} style={styles.search} selectionColor="black" autoCapitalize="none" placeholder="Cari ID Artikel ..." onChangeText={(text) => setSearchText(text)}/>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => handleButtonClick('Proses')} style={[styles.buttonOff, activeButton === 'Proses' && styles.buttonOn]}>
            <Text style={[styles.buttonOfftext, activeButton === 'Proses' && styles.buttonOntext]}>DI PROSES</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonClick('Selesai')} style={[styles.buttonOff, activeButton === 'Selesai' && styles.buttonOn]}>
            <Text style={[styles.buttonOfftext, activeButton === 'Selesai' && styles.buttonOntext]}>SELESAI</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonClick('Tolak')} style={[styles.buttonOff, activeButton === 'Tolak' && styles.buttonOn]}>
            <Text style={[styles.buttonOfftext, activeButton === 'Tolak' && styles.buttonOntext]}>DI TOLAK</Text>
          </TouchableOpacity>
        </View>
        {renderFilteredData()}
      </View>
      <TouchableOpacity style={styles.buttonColumn} onPress={() => navigation.navigate('BuatPo')}>
        <MaterialCommunityIcons size={20} name="plus" color="white" />
        <Text style={styles.buttonText}>BUAT PO</Text>
      </TouchableOpacity>
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
  buttonRow: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonOff: {
    padding: 10,
    width: '32%',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#071952',
    backgroundColor: '#F7F7F7',
  },
  buttonOn: {
    borderColor: 'white',
    backgroundColor: '#071952',
  },
  buttonOfftext: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  buttonOntext: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  scroll: {
    marginBottom: 70,
  },
  card: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#071952',
    backgroundColor: 'white',
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
  buttonColumn: {
    bottom: 10,
    padding: 15,
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#071952',
  },
  buttonText: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default AbsiPOArtikel;