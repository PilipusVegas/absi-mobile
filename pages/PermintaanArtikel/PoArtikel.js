import {apiUrl } from '../../globals.js';
import {useState, useEffect} from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';

const statusData = {
  0: 'Permintaan artikel belum disetujui TL',
  1: 'Permintaan artikel belum disetujui MV',
  2: 'Permintaan artikel sudah disetujui',
  3: 'Permintaan artikel sedang diproses',
  4: 'Permintaan artikel sedang dikirim',
  5: 'Permintaan artikel selesai',
  6: 'Permintaan artikel ditolak',
};

const AbsiPOArtikel = ({ route, navigation }) => {
  const [idToko, setIdToko] = useState(null);
  const [dataToShow, setDataToShow] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeButton, setActiveButton] = useState('Proses');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleCardClick = async (data) => {
    try {
      await AsyncStorage.setItem('selected_id_po', data.id);
      navigation.navigate('DetailPo', { pm: data.pm });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData = async (id_toko) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('id_toko', id_toko);
      const response = await fetch(apiUrl + '/getPo', {method: 'POST', body: formData});
      const data = await response.json();
      setTimeout(() => {setIsLoading(false)}, 200);
      if (data.success) {
        const idPoArray = data.permintaan.map((item) => item.id);
        await AsyncStorage.setItem('id_po', JSON.stringify(idPoArray));
        setDataToShow(data.permintaan);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const renderFilteredData = () => {
    if (isLoading) {
      return <ActivityIndicator size={24} color="#071952"/>;
    }
    if (dataToShow.length === 0) {
      return <Text style={styles.cardEmpty}>"TIDAK ADA DATA"</Text>;
    }
    let filteredData = dataToShow;
    if (searchText.trim() !== '') {
      filteredData = filteredData.filter((item) => item.id .toString() .toLowerCase() .includes(searchText.toLowerCase().trim()));
    }
    if (activeButton === 'Proses') {
      filteredData = filteredData.filter((data) => [0, 1, 2, 3, 4].includes(parseInt(data.status)));
    } else if (activeButton === 'Selesai') {
      filteredData = filteredData.filter((data) => parseInt(data.status) === 5);
    } else if (activeButton === 'Tolak') {
      filteredData = filteredData.filter((data) => parseInt(data.status) === 6);
    }
    const noDataForAnyCategory = filteredData.every((item) => {
      if (activeButton === 'Proses') {
        return ![0, 1, 2, 3, 4].includes(parseInt(item.status));
      } else if (activeButton === 'Selesai') {
        return parseInt(item.status) !== 5;
      } else if (activeButton === 'Tolak') {
        return parseInt(item.status) !== 6;
      }
      return false;
    });
    if (noDataForAnyCategory) {
      return <Text style={styles.cardEmpty}>"TIDAK ADA DATA"</Text>;
    }
    return renderData(filteredData);
  };

  useEffect(() => {
    setActiveButton('Proses');
  }, [route.params]);

  useEffect(() => {
    const fetchDataBasedOnParams = async () => {
      if (route.params && route.params.selectedStore) {
        const { selectedStore } = route.params;
        setIdToko(selectedStore.id_toko);
        await fetchData(selectedStore.id_toko);
      } else {
        const getStoredIdToko = async () => {
          try {
            const storedIdToko = await AsyncStorage.getItem('id_toko');
            if (storedIdToko) {setIdToko(storedIdToko); fetchData(storedIdToko)}
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        getStoredIdToko();
      }
    };
    fetchDataBasedOnParams();
  }, [route.params]);

  const renderData = (data) => {
    return (
      <FlatList
        data={data}
        style={styles.flatList}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.id} onPress={() => handleCardClick(item)} style={[styles.card, item.status === '0' && { borderColor: '#071952' }, item.status === '6' && { borderColor: 'red' }]}>
            <View style={styles.cardButton}>
              <Text style={styles.cardText1}>{`${item.id}`}</Text>
              <Text style={styles.cardText2}>{`${formatDate(item.created_at)}`}</Text>
            </View>
            <View style={styles.cardButton}>
              <Text style={styles.cardText3}>{`Status: ${statusData[item.status]}`}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput value={searchText} autoCapitalize="none" selectionColor="black" style={styles.textInput} placeholder="Cari ID Permintaan Artikel ..." onChangeText={(text) => setSearchText(text.toUpperCase())}/>
        <View style={styles.buttonMenu}>
          <TouchableOpacity onPress={() => handleButtonClick('Proses')} style={[styles.buttonOff, activeButton === 'Proses' && styles.buttonOn]}>
            <Text style={[styles.buttonOfftext, activeButton === 'Proses' && styles.buttonOntext]}>PROSES</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonClick('Selesai')} style={[styles.buttonOff, activeButton === 'Selesai' && styles.buttonOn]}>
            <Text style={[styles.buttonOfftext, activeButton === 'Selesai' && styles.buttonOntext]}>SELESAI</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonClick('Tolak')} style={[styles.buttonOff, activeButton === 'Tolak' && styles.buttonOn]}>
            <Text style={[styles.buttonOfftext, activeButton === 'Tolak' && styles.buttonOntext]}>TOLAK</Text>
          </TouchableOpacity>
        </View>
        {renderFilteredData()}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BuatPo')}>
        <MaterialCommunityIcons size={24} name="plus" color="white"/>
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
  textInput: {
    padding: 10,
    marginTop: -10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: 'grey',
    backgroundColor: '#F7F7F7',
  },
  buttonMenu: {
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
  cardEmpty: {
    padding: 15,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flatList: {
    marginBottom: 75,
  },
  card: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#071952',
    backgroundColor: '#F7F7F7',
  },
  cardButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText1: {
    fontSize: 16,
    marginTop: -5,
    fontWeight: 'bold',
  },
  cardText2: {
    fontSize: 16,
    marginTop: -5,
  },
  cardText3: {
    fontSize: 16,
    marginBottom: -5,
  },
  button: {
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
