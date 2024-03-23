import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const AbsiTerimaMutasi = ({ navigation }) => {
  const [searchText] = useState('');
  const allData = [...dataProses, ...dataSelesai];
  const [dataToShow, setDataToShow] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const filteredData = dataToShow.filter(
    (data) =>
      data.mu.toLowerCase().includes(searchText.toLowerCase()) ||
      data.toko.toLowerCase().includes(searchText.toLowerCase()) ||
      data.tanggal.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleCardClick = (data) => {
    let detailScreen = 'DetailTerimaMutasi';
    
    if (activeButton === 'Selesai') {
      detailScreen = 'DetailPenerimaanMutasi';
    }

    navigation.navigate(detailScreen, { 
      itemId: data.mu,
      toko: data.toko,
      tanggal: data.tanggal,
    });
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === 'Proses') {
      setDataToShow(dataProses);
    } else if (buttonName === 'Tolak') {
      setDataToShow(dataTolak);
    } else if (buttonName === 'Selesai') {
      setDataToShow(dataSelesai);
    } else if (buttonName === 'All') {
      setDataToShow(allData);
    }
  };
  const dataProses = [
    { mu: 'MU-202301001', toko: 'Benteng Mart', tanggal: '01/01/2024' },
    { mu: 'MU-202301002', toko: 'Benteng Mart', tanggal: '01/01/2024' },
    { mu: 'MU-202301003', toko: 'Benteng Mart', tanggal: '01/01/2024' },
    { mu: 'MU-202301004', toko: 'Benteng Mart', tanggal: '01/01/2024' },
    { mu: 'MU-202301005', toko: 'Benteng Mart', tanggal: '01/01/2024' },
  ];
  const dataSelesai = [
    { mu: 'MU-202301006', toko: 'Benteng Mart', tanggal: '01/01/2024' },
    { mu: 'MU-202301007', toko: 'Benteng Mart', tanggal: '01/01/2024' },
    { mu: 'MU-202301008', toko: 'Benteng Mart', tanggal: '01/01/2024' },
    { mu: 'MU-202301009', toko: 'Benteng Mart', tanggal: '01/01/2024' },
  ];
  useEffect(() => {
    handleButtonClick('Proses');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.buttonOff, activeButton === 'Proses' && styles.buttonOn ]}
            onPress={() => handleButtonClick('Proses')}
          >
            <Text style={[styles.buttonOfftext, activeButton === 'Proses' && styles.buttonOntext]}>DI PROSES</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonOff, activeButton === 'Selesai' && styles.buttonOn]}
            onPress={() => handleButtonClick('Selesai')}
          >
            <Text style={[styles.buttonOfftext, activeButton === 'Selesai' && styles.buttonOntext]}>SELESAI</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scroll}>
          {filteredData.map((data, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => handleCardClick(data)}
            >
              <View style={styles.cardRow}>
                <View style={styles.cardColumn}>
                  <Text style={styles.cardText1}>{`${data.mu}`}</Text>
                  <Text style={styles.cardText2}>{`dari: ${data.toko}`}</Text>
                  <Text style={styles.cardText3}>{`Tanggal: ${data.tanggal}`}</Text>
                </View>
                <Text style={styles.cardButton}>
                  {activeButton === 'Proses' ? 'TERIMA' : activeButton === 'Selesai' ? 'DETAIL' : ''}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
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
    marginTop: -10,
    borderRadius: 25,
    marginBottom: -20,
    backgroundColor: 'white',
  },
  buttonRow: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonOff: {
    padding: 10,
    width: '49%',
    borderWidth: 2,
    borderRadius: 25,
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
    marginBottom: 10,
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
  },
  cardText3: {
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
});
export default AbsiTerimaMutasi;