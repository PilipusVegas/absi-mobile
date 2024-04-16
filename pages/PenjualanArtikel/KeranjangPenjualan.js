import * as Haptics from 'expo-haptics';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { View, Text, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const quantities = [ 10, 20, 30, 40, 50];
const AbsiKeranjangPenjualan = ({ route, navigation }) => {
  const {selectedItems} = route.params;
  const [totalItems, setTotalItems] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [dateLabel, setDateLabel] = useState('Silakan pilih tanggal');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const toggleDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };
const handleQuantityIncrease = (itemId) => {
    const currentQuantity = selectedQuantities[itemId] || 0;
    const index = quantities.indexOf(currentQuantity);
    if (index < quantities.length - 1) {
      setSelectedQuantities({
        ...selectedQuantities,
        [itemId]: quantities[index + 1],
      });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
  };
  const handleQuantityDecrease = (itemId) => {
    const currentQuantity = selectedQuantities[itemId] || 0;
    const index = quantities.indexOf(currentQuantity);
    if (currentQuantity !== 0) {
      setSelectedQuantities({
        ...selectedQuantities,
        [itemId]: quantities[index - 1],
      });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    } else {
      setSelectedQuantities({ ...selectedQuantities, [itemId]: 0 });
    }
  };
  const handleSendData = () => {
    Alert.alert(
      '',
      'Apakah anda sudah yakin?',
      [
        {
          text: 'Ya',
          onPress: () => {
            navigation.navigate('Penjualan');
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
  useEffect(() => {
    let totalItemsCount = 0;
    let totalQuantityCount = 0;
    let isAnyItemWithoutQuantity = false;
    for (const item of selectedItems) {
      if (!selectedQuantities[item.id] || selectedQuantities[item.id] === 0) {
        isAnyItemWithoutQuantity = true;
        break;
      }
      totalItemsCount++;
      totalQuantityCount += selectedQuantities[item.id];
    }
    const isDateSelected = selectedDate !== null;
    setTotalItems(totalItemsCount);
    setTotalQuantity(totalQuantityCount);
    setIsButtonDisabled(totalQuantityCount === 0 || isAnyItemWithoutQuantity || !isDateSelected);
  }, [selectedQuantities, selectedDate]);
  useEffect(() => {
    if (selectedDate !== null) {
      setDateLabel('Tanggal dipilih: ' + selectedDate.toDateString());
    } else {
      setDateLabel('Silakan pilih tanggal');
    }
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>ISI KERANJANG</Text>
        <ScrollView style={styles.scroll}>
          {selectedItems.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardText1}>{`${item.kode}`}</Text>
              <Text style={styles.cardText2}>{`${item.nama_produk}`}</Text>
              <View style={styles.cardLeft}>
                <View><Text style={styles.cardText2}>{`Stok: ${item.qty}`}</Text></View>
                <View style={styles.cardRight}>
                  <TouchableOpacity style={styles.icon1} onPress={() => handleQuantityDecrease(item.id)}>
                    <MaterialCommunityIcons size={20} name="minus" color="white"/>
                  </TouchableOpacity>
                  <Text style={styles.iconText}>{selectedQuantities[item.id] || 0}</Text>
                  <TouchableOpacity style={styles.icon2} onPress={() => handleQuantityIncrease(item.id)}>
                    <MaterialCommunityIcons size={20} name="plus" color="white"/>
                  </TouchableOpacity> 
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.cardBottom}>
          <View style={styles.cardTanggal}>
            <Text style={[styles.cardTextleft, { fontWeight: 'bold', fontSize: 16 }]}>Silakan pilih tanggal:</Text>
            <TouchableOpacity onPress={toggleDatePicker}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons size={20} name="calendar" />
                {selectedDate && (
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{selectedDate.toLocaleDateString('en-GB')}</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.cardArtikel}>
            <Text style={styles.cardTextleft}>Total Artikel:</Text>
            <Text style={styles.cardTextright}>{totalItems}</Text>
          </View>
          <View style={styles.cardArtikel}>
            <Text style={styles.cardTextleft}>Total Quantity:</Text>
            <Text style={styles.cardTextright}>{totalQuantity}</Text>
          </View>
          <DateTimePickerModal
            mode="date"
            maximumDate={new Date()}
            isVisible={isDatePickerVisible}
            onCancel={() => setDatePickerVisibility(false)}
            minimumDate={new Date(new Date().setMonth(new Date().getMonth() - 1))}
            onConfirm={(date) => {
              setSelectedDate(date);
              setDatePickerVisibility(false);
            }}
          />
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
  cardText3: {
    fontSize: 16,
    marginBottom: -5,
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
  cardTanggal: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardArtikel: {
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
export default AbsiKeranjangPenjualan;
