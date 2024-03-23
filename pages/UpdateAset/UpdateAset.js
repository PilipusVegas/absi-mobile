import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, Alert, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const AbsiUpdateAset = ({ navigation }) => {
  const [cardData, setCardData] = useState([
    { quantity: '', condition: '', photoUri: null },
    { quantity: '', condition: '', photoUri: null },
    { quantity: '', condition: '', photoUri: null },
    { quantity: '', condition: '', photoUri: null },
    { quantity: '', condition: '', photoUri: null },
  ]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const handleQuantityChange = (text, index) => {
    const updatedCardData = [...cardData];
    updatedCardData[index].quantity = text;
    setCardData(updatedCardData);
    checkButtonStatus(updatedCardData);
  };
  const handleConditionSelect = (selectedCondition, index) => {
    const updatedCardData = [...cardData];
    updatedCardData[index].condition = selectedCondition;
    setCardData(updatedCardData);
    checkButtonStatus(updatedCardData);
  };
  const checkButtonStatus = (updatedCardData) => {
    const isAnyItemWithoutQuantity = updatedCardData.some(item => !item.quantity);
    const isAnyItemWithoutCondition = updatedCardData.some(item => !item.condition);
    const isAnyItemWithoutPhoto = updatedCardData.some(item => !item.photoUri);
    const isAllFieldsFilled = !isAnyItemWithoutQuantity && !isAnyItemWithoutCondition && !isAnyItemWithoutPhoto;
    setIsButtonDisabled(!isAllFieldsFilled);
  };
  const openImagePicker = async (index) => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Memerlukan izin untuk dapat mengakses galeri');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        const updatedCardData = [...cardData];
        updatedCardData[index].photoUri = result.uri;
        setCardData(updatedCardData);
        checkButtonStatus(updatedCardData);
      }
    } catch (error) {
      console.log('Error when picking an image:', error);
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
            navigation.navigate('Beranda');
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

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          {cardData.map((card, index) => (
            <View key={index} style={styles.card}>
              <TouchableOpacity style={[styles.cardLeft, { flex: 0.5 }]} onPress={() => openImagePicker(index)}>
                {card.photoUri ? (
                  <Image source={{ uri: card.photoUri }} style={styles.imageStyle} />
                ) : (
                  <MaterialCommunityIcons name="camera" size={24} color="black" />
                )}
              </TouchableOpacity>
              <View style={[styles.cardRight, { flex: 0.5 }]}>
                <Text style={styles.label}>{`Aset ${String.fromCharCode(65 + index)}`}</Text>
                <Text style={styles.label}>Jumlah:</Text>
                <TextInput style={styles.input} value={card.quantity} keyboardType="numeric" selectionColor="black" onChangeText={(text) => handleQuantityChange(text, index)}/>
                <Text style={styles.label}>Kondisi:</Text>
                <View style={styles.conditionContainer}>
                  <TouchableOpacity onPress={() => handleConditionSelect('Bagus', index)} style={[styles.conditionButton, card.condition === 'Bagus' ? styles.selectedCondition : null]}>
                    <Text style={[styles.conditionText, card.condition === 'Bagus' ? styles.selectedText : null]}>Bagus</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleConditionSelect('Rusak', index)} style={[styles.conditionButton, card.condition === 'Rusak' ? styles.selectedCondition : null]}>
                    <Text style={[styles.conditionText, card.condition === 'Rusak' ? styles.selectedText : null]}>Rusak</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={handleSendData} disabled={isButtonDisabled} style={isButtonDisabled ? styles.buttonOff : styles.buttonOn}>
          <Text style={styles.floatingButtonText}>KIRIM</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: 20,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    borderColor: '#071952',
    backgroundColor: 'white',
  },
  cardLeft: {
    borderWidth: 2,
    marginRight: 10,
    borderRadius: 10,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },
  cardRight: {
    flex: 1,
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
    paddingHorizontal: 10,
    backgroundColor: '#F7F7F7',
  },
  container: {
    flex: 1,
    backgroundColor: '#071952',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 75,
  },
  form: {
    flex: 1,
    padding: 20,
    borderRadius: 25,
    marginBottom: -20,
    backgroundColor: 'white',
  },
  conditionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  conditionButton: {
    borderWidth: 2,
    borderRadius: 10,
    fontWeight: 'bold',
    borderColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: '#F7F7F7',
  },
  selectedCondition: {
    borderColor: 'white',
    backgroundColor: '#071952',
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonOff: {
    bottom: 40,
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
  buttonOn: {
    bottom: 40,
    padding: 15,
    width: '100%',
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#071952',
  },
  floatingButtonText: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
export default AbsiUpdateAset;