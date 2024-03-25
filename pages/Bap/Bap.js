import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

const AbsiStokArtikel = () => {

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.labelColumn}>
          <View style={styles.labelRow}>
            <Text style={styles.labelText}>Total Artikel:</Text>
          </View>
          <View style={styles.labelRow}>
            <Text style={styles.labelText}>Total Stok Artikel:</Text>
          </View>
        </View>
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
  labelColumn: {
    padding: 10,
    marginTop: -10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'column',
    backgroundColor: '#071952',
  }, 
  labelRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default AbsiStokArtikel;
