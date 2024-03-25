import WebViewComponent from './WebView';
import {useState, useEffect} from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

const AbsiHome = ({route}) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [showInfo1, setShowInfo1] = useState(false);
  const [showInfo2, setShowInfo2] = useState(false);
  const [showInfo3, setShowInfo3] = useState(false);
  const [showInfo4, setShowInfo4] = useState(false);
  const [showInfo5, setShowInfo5] = useState(false);
  const [showInfo6, setShowInfo6] = useState(false);
  const [showInfo7, setShowInfo7] = useState(false);
  const [showInfo8, setShowInfo8] = useState(false);
  const [showInfo9, setShowInfo9] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const toggleInfo1 = () => {setShowInfo1(!showInfo1); setShowInfo2(false); setShowInfo3(false); setShowInfo4(false); setShowInfo5(false); setShowInfo6(false); setShowInfo7(false); setShowInfo8(false); setShowInfo9(false)};
  const toggleInfo2 = () => {setShowInfo1(false); setShowInfo2(!showInfo2); setShowInfo3(false); setShowInfo4(false); setShowInfo5(false); setShowInfo6(false); setShowInfo7(false); setShowInfo8(false); setShowInfo9(false)};
  const toggleInfo3 = () => {setShowInfo1(false); setShowInfo2(false); setShowInfo3(!showInfo3); setShowInfo4(false); setShowInfo5(false); setShowInfo6(false); setShowInfo7(false); setShowInfo8(false); setShowInfo9(false)};
  const toggleInfo4 = () => {setShowInfo1(false); setShowInfo2(false); setShowInfo3(false); setShowInfo4(!showInfo4); setShowInfo5(false); setShowInfo6(false); setShowInfo7(false); setShowInfo8(false); setShowInfo9(false)};
  const toggleInfo5 = () => {setShowInfo1(false); setShowInfo2(false); setShowInfo3(false); setShowInfo4(false); setShowInfo5(!showInfo5); setShowInfo6(false); setShowInfo7(false); setShowInfo8(false); setShowInfo9(false)};
  const toggleInfo6 = () => {setShowInfo1(false); setShowInfo2(false); setShowInfo3(false); setShowInfo4(false); setShowInfo5(false); setShowInfo6(!showInfo6); setShowInfo7(false); setShowInfo8(false); setShowInfo9(false)};
  const toggleInfo7 = () => {setShowInfo1(false); setShowInfo2(false); setShowInfo3(false); setShowInfo4(false); setShowInfo5(false); setShowInfo6(false); setShowInfo7(!showInfo7); setShowInfo8(false); setShowInfo9(false)};
  const toggleInfo8 = () => {setShowInfo1(false); setShowInfo2(false); setShowInfo3(false); setShowInfo4(false); setShowInfo5(false); setShowInfo6(false); setShowInfo7(false); setShowInfo8(!showInfo8); setShowInfo9(false)};
  const toggleInfo9 = () => {setShowInfo1(false); setShowInfo2(false); setShowInfo3(false); setShowInfo4(false); setShowInfo5(false); setShowInfo6(false); setShowInfo7(false); setShowInfo8(false); setShowInfo9(!showInfo9)};

  const getDataFromStorage = async () => {
    try {
      const storedStoreData = await AsyncStorage.getItem('storeData');
      if (storedStoreData) {
        const parsedStoreData = JSON.parse(storedStoreData);
        setSelectedStore(parsedStoreData[0]);
        await AsyncStorage.setItem('id_toko', parsedStoreData[0].id_toko);
      }
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {setUsername(storedUsername)}
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  useEffect(() => {
    getDataFromStorage();
  }, [route.params]);

  useEffect(() => {
    if (route.params && route.params.selectedStore) {
      const {selectedStore} = route.params;
      setSelectedStore(selectedStore);
      AsyncStorage.setItem('id_toko', selectedStore.id_toko);
    }
  }, [route.params]);

  useFocusEffect(() => {
    if (route.params && route.params.selectedStore) {
      const {selectedStore} = route.params;
      setSelectedStore(selectedStore);
      AsyncStorage.setItem('id_toko', selectedStore.id_toko);
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={require('../images/AbsiIcon.png')} />
        <View>
          <Text style={styles.headerLabel}>PT. Vista Mandiri Gemilang</Text>
          <Text style={styles.headerLabel}>{selectedStore ? selectedStore.nama_toko : 'Nama Toko'}</Text>
        </View>
      </View>
      
      <View style={styles.form} >
        <View style={styles.formLabel}>
          <Text style={styles.label}>Menu Utama</Text>
        </View>
        <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('PoArtikel', {selectedStore: selectedStore})}>
          <View style={styles.menuButton}>
            <MaterialCommunityIcons style={styles.menuIcon} name="tag-plus-outline"/>
          </View>
          <Text style={styles.menuLabel}>PO Artikel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('TerimaArtikel')}>
          <View style={styles.menuButton}>
            <MaterialCommunityIcons style={styles.menuIcon} name="text-box-check-outline"/>
          </View>
          <Text style={styles.menuLabel}>Terima Artikel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('Penjualan')}>
          <View style={styles.menuButton}>
            <MaterialCommunityIcons style={styles.menuIcon} name="cart-outline"/>
          </View>
          <Text style={styles.menuLabel}>Penjualan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('StokArtikel')}>
          <View style={styles.menuButton}>
            <MaterialCommunityIcons style={styles.menuIcon} name="folder-information-outline"/>
          </View>
          <Text style={styles.menuLabel}>Info Stok</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('UpdateAset')}>
          <View style={styles.menuButton}>
            <MaterialCommunityIcons style={styles.menuIcon} name="database-refresh-outline"/>
          </View>
          <Text style={styles.menuLabel}>Update Aset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('StokOpname')}>
          <View style={styles.menuButton}>
            <MaterialCommunityIcons style={styles.menuIcon} name="format-list-numbered"/>
          </View>
          <Text style={styles.menuLabel}>Stok Opname</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('TerimaMutasi')}>
          <View style={styles.menuButton}>
            <MaterialCommunityIcons style={styles.menuIcon} name="database-check"/>
          </View>
          <Text style={styles.menuLabel}>Terima Mutasi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('Retur')}>
          <View style={styles.menuButton}>
            <MaterialCommunityIcons style={styles.menuIcon} name="truck-delivery-outline"/>
          </View>
          <Text style={styles.menuLabel}>Retur</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('Bap')}>
          <View style={styles.menuButton}>
            <MaterialCommunityIcons style={styles.menuIcon} name="..."/>
          </View>
          <Text style={styles.menuLabel}>BAP</Text>
        </TouchableOpacity>

        <View style={styles.formLabel}>
          <Text style={styles.label}>Tutorial</Text>
        </View>
        <WebViewComponent showInfo1={showInfo1} showInfo2={showInfo2} showInfo3={showInfo3} showInfo4={showInfo4} showInfo5={showInfo5} showInfo6={showInfo6} showInfo7={showInfo7} showInfo8={showInfo8} toggleInfo1={toggleInfo1} toggleInfo2={toggleInfo2} toggleInfo3={toggleInfo3} toggleInfo4={toggleInfo4} toggleInfo5={toggleInfo5} toggleInfo6={toggleInfo6} toggleInfo7={toggleInfo7} toggleInfo8={toggleInfo8}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071952',
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerImage: {
    width: 75,
    height: 55,
    margin: 25,
  },
  headerLabel: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
    padding: 10,
    width: '100%',
    flexWrap: 'wrap',
    borderRadius: 25,
    marginBottom: -20,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  formLabel: {
    width: '100%',
    borderRadius: 5,
    paddingStart: 15,
    borderColor: 'white',
    flexDirection: 'row',
    backgroundColor: '#0B666A',
  },
  label:{
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  menu: {
    width: '25%',
    marginTop: 10,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    width: '75%',
    aspectRatio: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B666A',
  },
  menuIcon: {
    fontSize: 40,
    color: 'white',
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
export default AbsiHome;
