import * as Haptics from 'expo-haptics';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { apiUrl, webUrl } from '../../globals.js';

const AbsiKeranjangPO = ({ route, navigation }) => {
  const { selectedItems } = route.params;
  const [totalItems, setTotalItems] = useState(0);
  const [produkData, setProdukData] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedQuantities, setSelectedQuantities] = useState({});

  const handleQuantityIncrease = (itemId) => {
    const currentQuantity = selectedQuantities[itemId] || 0;
    if (currentQuantity < 10) {
      const newQuantity = currentQuantity + 1;
      setSelectedQuantities(prevState => ({
        ...prevState,
        [itemId]: newQuantity
      }));
      setProdukData(prevData => prevData.map(item => {
        if (item.kode === itemId) {return { ...item, qty: item.qty - 1 }}
        return item;
      }));
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleQuantityDecrease = (itemId) => {
    const currentQuantity = selectedQuantities[itemId] || 0;
    if (currentQuantity > 0) {
      const newQuantity = currentQuantity - 1;
      setSelectedQuantities(prevState => ({
        ...prevState,
        [itemId]: newQuantity
      }));
      setProdukData(prevData => prevData.map(item => {
        if (item.kode === itemId) {return { ...item, qty: item.qty + 1 }}
        return item;
      }));
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleSendData = () => {
    Alert.alert(
      '',
      'Apakah anda sudah yakin?',
      [
        {
          text: 'Ya',
          onPress: sendData(),
        },
        {
          text: 'Tidak',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  const sendData = () => {
    console.log( produkData );
  }

  useEffect(() => {
    let totalItemsCount = 0;
    let totalQuantityCount = 0;
    let isAnyItemWithoutQuantity = false;
    for (const item of selectedItems) {
      const quantity = selectedQuantities[item.kode] || 0;
      if (!quantity) {
        isAnyItemWithoutQuantity = true;
        break;
      }
      totalItemsCount++;
      totalQuantityCount += quantity;
    }
    setTotalItems(totalItemsCount);
    setTotalQuantity(totalQuantityCount);
    setIsButtonDisabled(totalQuantityCount === 0 || isAnyItemWithoutQuantity);
  }, [selectedItems, selectedQuantities]);

  useEffect(() => {
    const fetchDataProduk = async () => {
      try {
        const storedData = await AsyncStorage.getItem('produk_data');
        if (storedData !== null) {setProdukData(JSON.parse(storedData))}
      } catch (error) {
        //
      }
    };
    fetchDataProduk();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>ISI KERANJANG</Text>
        <ScrollView style={styles.scroll}>
          {selectedItems.map((item, index) => {
            const produk = produkData.find(data => data.kode === item.kode);
            if (!produk) return null;
            return (
              <View key={index} style={styles.card}>
                <Text style={styles.cardText1}>{`${item.kode}`}</Text>
                <Text style={styles.cardText2}>{`${produk.nama_produk}`}</Text>
                <View style={styles.cardLeft}>
                  <View><Text style={styles.cardText2}>{`Stok: ${produk.qty}`}</Text></View>
                  <View style={styles.cardRight}>
                    <TouchableOpacity style={styles.icon1} onPress={() => handleQuantityDecrease(item.kode)}>
                      <MaterialCommunityIcons size={20} name="minus" color="white"/>
                    </TouchableOpacity>
                    <Text style={styles.iconText}>{selectedQuantities[item.kode] || 0}</Text>
                    <TouchableOpacity style={styles.icon2} onPress={() => handleQuantityIncrease(item.kode, produk.qty)}>
                      <MaterialCommunityIcons size={20} name="plus" color="white"/>
                    </TouchableOpacity> 
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.cardBottom}>
          <View style={styles.cardContainer}>
            <Text style={styles.cardTextleft}>Macam Artikel:</Text>
            <Text style={styles.cardTextright}>{totalItems}</Text>
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.cardTextleft}>Total Artikel:</Text>
            <Text style={styles.cardTextright}>{totalQuantity}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleSendData} disabled={isButtonDisabled} style={isButtonDisabled ? styles.buttonOff : styles.buttonOn}>
          <Text style={styles.buttonText}>KIRIM</Text>
        </TouchableOpacity>
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
  label: {
    fontSize: 16,
    marginTop: -10,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  scroll: {
    flex: 1,
    marginBottom: 10,
  },
  card: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#071952',
    backgroundColor: 'white',
  },
  cardLeft: {
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
  },
  cardRight: {
    marginTop: -5,
    marginBottom: -5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon1: {
    padding: 5,
    borderWidth: 2,
    marginRight: 10,
    borderRadius: 100,
    marginVertical: 2,
    backgroundColor: 'red',
  },
  icon2: {
    padding: 5,
    borderWidth: 2,
    marginLeft: 10,
    borderRadius: 100,
    marginVertical: 2,
    backgroundColor: 'green',
  },
  iconText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardBottom: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 70,
    borderColor: '#071952',
    backgroundColor: 'white',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTextleft: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  cardTextright: {
    fontSize: 16,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  buttonOn: {
    bottom: 30,
    padding: 15,
    width: '100%',
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#071952',
  },
  buttonOff: {
    bottom: 30,
    padding: 15,
    opacity: 0.5,
    width: '100%',
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
export default AbsiKeranjangPO;