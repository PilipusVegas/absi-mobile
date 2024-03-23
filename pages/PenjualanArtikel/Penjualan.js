import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const AbsiPenjualan = ({ navigation }) => {
  const dataProses = [
    { pj: 'PJ-202301001', tanggal: '01/01/2024' },
    { pj: 'PJ-202301002', tanggal: '01/01/2024' },
    { pj: 'PJ-202301003', tanggal: '01/01/2024' },
    { pj: 'PJ-202301004', tanggal: '01/01/2024' },
    { pj: 'PJ-202301005', tanggal: '01/01/2024' },
    { pj: 'PJ-202301006', tanggal: '02/01/2024' },
    { pj: 'PJ-202301007', tanggal: '02/01/2024' },
    { pj: 'PJ-202301008', tanggal: '02/01/2024' },
    { pj: 'PJ-202301009', tanggal: '02/01/2024' },
  ];
  const [searchText, setSearchText] = useState('');
  const [dataToShow, setDataToShow] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const [selectedDate, setSelectedDate] = useState('dd/mm/yyyy');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const filteredData = dataToShow.filter(
    (data) => data.pj.toLowerCase().includes(searchText.toLowerCase())    
  );
  const handleResetButtonClick = () => {
    setSelectedDate('DD/MM/YYYY');
    setSearchText('');
    handleButtonClick('Proses');
  };
  const handleCardClick = (data) => {
    let detailScreen = 'DetailPenjualan';
    navigation.navigate(detailScreen, { 
      pj: data.pj,
      tanggal: data.tanggal,
    });
  };
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === 'Proses') {
      const sortedData = [...dataProses].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
      const slicedData = sortedData.slice(0, 10);
      setDataToShow(slicedData);
    }
  };
  const handleDateConfirm = (date) => {
    setDatePickerVisibility(false);
    filterAndSetData(date);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    setSelectedDate(formattedDate);
  };
  const filterAndSetData = (date) => {
    const formattedDate = `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
    const filteredData = dataProses.filter(
      (data) => {
        const formattedDataDate = data.tanggal;
        return formattedDataDate === formattedDate;
      }
    );
    setDataToShow(filteredData);
  };
  useEffect(() => {
    handleButtonClick('Proses');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setSelectedDate('dd/mm/yyyy');
  }, []);
  useEffect(() => {
    const initialFilteredData = dataProses.filter(
      (data) => new Date(data.tanggal).toDateString() === new Date().toDateString()
    );
    setDataToShow(initialFilteredData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const sortedData = [...dataProses].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    const slicedData = sortedData.slice(0, 10);
    setDataToShow(slicedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.search}>
          <TextInput
            value={searchText}
            selectionColor="black"
            style={styles.textInput}
            autoCapitalize="characters"
            placeholder="Cari Kode Artikel ..."
            onChangeText={(text) => setSearchText(text)}
          />
          <View style={styles.calender}>
            <TouchableOpacity onPress={showDatePicker} style={styles.calenderButton}>
              <MaterialCommunityIcons size={20} color="white" name="calendar" marginRight={5}/>
              <Text style={styles.calenderText}>{selectedDate === 'dd/mm/yyyy' ? 'DD/MM/YYYY' : selectedDate}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calenderButton} onPress={handleResetButtonClick}>
              <Text style={styles.calenderReset}>RESET</Text>
            </TouchableOpacity>
          </View>
        </View>
        <DateTimePickerModal
          mode="date"
          onConfirm={handleDateConfirm}
          isVisible={isDatePickerVisible}
          onCancel={() => setDatePickerVisibility(false)}
        />
        <ScrollView style={styles.scroll}>
          {filteredData.map((data, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => handleCardClick(data)}>
              <View style={styles.cardRow}>
                <View style={styles.cardColumn}>
                  <Text style={styles.cardText1}>{`${data.pj}`}</Text>
                  <Text style={styles.cardText2}>{`Tanggal: ${data.tanggal}`}</Text>
                </View>
                <Text style={styles.cardButton}>
                  {activeButton === 'Proses' ? 'DETAIL' : ''}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BuatPenjualan')}>
        <MaterialCommunityIcons name="plus" size={24} color="white" />
        <Text style={styles.buttonText}>Input Penjualan</Text>
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
    marginBottom: 10,
  },
  textInput: {
    padding: 10,
    marginTop: -10,
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 10,
    borderColor: 'grey',
    backgroundColor: '#F7F7F7',
  },
  calender: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calenderButton: {
    padding: 10,
    width: '49%',
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#071952',
  },
  calenderText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  calenderReset: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  scroll: {
    marginBottom: 75,
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
  cardColumn: {
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
    marginBottom: -5,
  },
  cardButton: {
    padding: 10,
    fontSize: 16,
    color: 'black',
    borderWidth: 2,
    borderRadius: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#F7F7F7',
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
export default AbsiPenjualan;