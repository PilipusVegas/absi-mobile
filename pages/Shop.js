import {useState, useEffect} from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, Image, FlatList, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

const AbsiShop = ({navigation}) => {
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [storeData, setStoreData] = useState([]);
  const handleStorePress = (store) => {navigation.navigate('Menu', {selectedStore: store})};

  const formatAddress = (address) => {
    const formattedAddress = address.trim().toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    return formattedAddress.replace(/(\s+\b\w\b)/g, (match) => match.trim());
  };

  const saveStoreDataToStorage = async (stores) => {
    try {
      const storeDataToSave = stores.map((store) => ({
        id_toko: store.id_toko,
        nama_toko: store.nama_toko,
      }));
      await AsyncStorage.setItem('storeData', JSON.stringify(storeDataToSave));
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    const getDataFromStorage = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        const storedUsername = await AsyncStorage.getItem('username');
        setUserId(storedUserId);
        setUsername(storedUsername);
      } catch (error) {
        //
      }
    };
    getDataFromStorage();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const formData = new FormData();
          formData.append('id_user', userId);
          const apiUrl = 'https://globalindo-group.com/absi_demo/api/getToko';
          const response = await fetch(apiUrl, { method: 'POST', body: formData });
          const result = await response.json();
          console.log(`success: ${result.success}, message: ${result.message}`);
          console.log(result.stores);
          if (result.success) {setStoreData(result.stores); saveStoreDataToStorage(result.stores)}
        }
      } catch (error) {
        //
      }
    };
    fetchData();
  }, [userId]);

  const renderStoreCard = ({item}) => (
    <TouchableOpacity onPress={() => handleStorePress(item)} style={styles.containerStore}>
      <View style={styles.store}>
        <Image style={styles.storeImage} source={require('../images/PlusIcon.png')}/>
        <View style={styles.storeCard}>
          <Text style={styles.storeText1}>{item.nama_toko.toUpperCase()}</Text>
          <Text style={styles.storeText2}>{formatAddress(item.alamat)}</Text>
          <Text style={styles.storeText2}>{item.telp}</Text>
        </View>
        <MaterialCommunityIcons size={22} name="arrow-right-thick"/>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../images/AbsiLogo.png')}/>
      <View style={styles.form}>
        <View style={styles.label}>
          <Text style={styles.labelText1}>Selamat datang, </Text>
          <Text style={styles.labelText2}>{username}</Text>
        </View>
        <View style={styles.label}>
          <Text style={styles.labelText1}>Anda memiliki {storeData.length} toko yang dapat di kelola,</Text>
        </View>
        <View style={styles.label}>
          <Text style={styles.labelText1}>{storeData.length > 0 ? 'silakan pilih toko yang ingin anda kelola.' : ''}</Text>
        </View>
        <ScrollView>
          <View style={styles.card}>
            {error ? (
              <Text style={styles.error}>{error}</Text>
            ) : (
              <FlatList data={storeData} style={styles.flatlist} renderItem={renderStoreCard}/>
            )}
          </View>
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
  image: {
    width: 300,
    height: 95,
    marginTop: 15,
    marginBottom: 15,
    alignSelf: 'center',
  },
  form: {
    flex: 1,
    padding: 20,
    borderRadius: 25,
    marginBottom: -20,
    backgroundColor: 'white',
  },
  label: {
    width: '100%',
    paddingStart: 20,
    flexDirection: 'row',
  },
  labelText1: {
    fontSize: 18,
  },
  labelText2: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    fontSize: 16, 
  },
  flatlist: {
    paddingBottom: 20,
  },
  containerStore: {
    padding: 15, 
    elevation: 2, 
    marginBottom: 15, 
    backgroundColor: '#F7F7F7',
  },
  store: {
    alignItems: 'center', 
    flexDirection: 'row',
  },
  storeImage: {
    width: 60, 
    height: 60, 
    borderWidth: 1, 
    marginRight: 15, 
    borderRadius: 10, 
    borderColor: 'black',
  },
  storeCard: {
    flex: 1,
  },
  storeText1: {
    fontSize: 16, 
    fontWeight: 'bold',
  },
  storeText2: {
    fontSize: 16,
  },
});
export default AbsiShop;