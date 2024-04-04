import * as Haptics from 'expo-haptics';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { apiUrl } from '../../globals.js';

const AbsiKeranjangPO = ({ route, navigation }) => {
  const [ produkData, setProdukData ] = useState(route.params.selectedItems);
  const [totalItems, setTotalItems] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const idUser = AsyncStorage.getItem('userId');
  const idToko = AsyncStorage.getItem('id_toko');
  
  const handleQuantityIncrease = (index,qty) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!qty) {
      qty = 0;
    }
    const newData = produkData.map ((item, i) => {
      if (i === index) {
        return { ...item, qtyEdit: parseInt(qty)+1 };
      }
      return item;
    })
    setProdukData(newData);
  };

  const handleQuantityDecrease = (index, qty) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!qty) {
      qty = 0;
    }
    const newData = produkData.map ((item, i) => {
      if (i === index) {
        return { ...item, qtyEdit: parseInt(qty)-1 };
      }
      return item;
    })
    setProdukData(newData);
  };

  const handleSendData = () => {
    Alert.alert(
      '',
      'Apakah anda sudah yakin?',
      [
        {
          text: 'Ya',
          onPress: () => {
            sendData();
          },
        },
        {
          text: 'Tidak',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  const sendData = async () => {
    
    try {
      const formData = new FormData();
      formData.append('id_user', await idUser);
      formData.append('id_toko', await idToko);
      formData.append('pt', totalQuantity);
      produkData.forEach((item, index) => {
        formData.append(`detail[${index}][id_produk]`, item.id.toString());
        formData.append(`detail[${index}][qty]`, item.qtyEdit.toString());
      });
      const response = await fetch(apiUrl + '/savePo', { method: 'POST', body: formData });
      if (response) {
        navigation.navigate('PoArtikel');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setTotalItems(produkData.length);
    let qtyEdit = 0;
    let error = 0;
    produkData.map ((item) => {
      if (item.qtyEdit) {
        qtyEdit += item.qtyEdit;
      } 
      setTotalQuantity(qtyEdit);

      if (!item.qtyEdit || item.qtyEdit === 0) {
        error++;
      }
    })

    if (error > 0) {
      setIsButtonDisabled(true);
    }
    else {
      setIsButtonDisabled(false);
    }
  },[produkData]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>ISI KERANJANG</Text>
        <ScrollView style={styles.scroll}>
          {produkData.map((item, index) => {
            return (
              <View key={index} style={styles.card}>
                <Text style={styles.cardText1}>{`${item.kode}`}</Text>
                <Text style={styles.cardText2}>{`${item.nama_produk}`}</Text>
                <View style={styles.cardLeft}>
                  <View><Text style={styles.cardText2}>{`Stok: ${item.qty}`}</Text></View>
                  <View style={styles.cardRight}>
                    <TouchableOpacity style={styles.icon1} onPress={() => handleQuantityDecrease(index,item.qtyEdit)}>
                      <MaterialCommunityIcons size={20} name="minus" color="white"/>
                    </TouchableOpacity>
                    <Text style={styles.iconText}>{item.qtyEdit || 0}</Text>
                    <TouchableOpacity style={styles.icon2} onPress={() => handleQuantityIncrease(index,item.qtyEdit)}>
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
            <Text style={styles.cardTextleft}>Total Artikel:</Text>
            <Text style={styles.cardTextright}>{totalItems}</Text>
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.cardTextleft}>Total Quantity:</Text>
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