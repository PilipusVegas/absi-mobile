import {Alert, TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AbsiShop from './Shop';
import AbsiMenu from './Menu';
import AbsiProfile from './Profile';
import AbsiBuatPo from './PermintaanArtikel/BuatPo';
import AbsiDetailPo from './PermintaanArtikel/DetailPo';
import AbsiPoArtikel from './PermintaanArtikel/PoArtikel';
import AbsiKeranjangPo from './PermintaanArtikel/KeranjangPo';
import AbsiTerimaArtikel from './PenerimaanArtikel/TerimaArtikel';
import AbsiDetailTerimaArtikel from './PenerimaanArtikel/DetailTerimaArtikel';
import AbsiDetailPenerimaanArtikel from './PenerimaanArtikel/DetailPenerimaanArtikel';
import AbsiPenjualan from './PenjualanArtikel/Penjualan';
import AbsiBuatPenjualan from './PenjualanArtikel/BuatPenjualan';
import AbsiDetailPenjualan from './PenjualanArtikel/DetailPenjualan';
import AbsiKeranjangPenjualan from './PenjualanArtikel/KeranjangPenjualan';
import AbsiStokArtikel from './InfoStok/StokArtikel';
import AbsiUpdateAset from './UpdateAset/UpdateAset';
import AbsiStokOpname from './StokOpname/StokOpname';
import AbsiTerimaMutasi from './PenerimaanMutasi/TerimaMutasi';
import AbsiDetailTerimaMutasi from './PenerimaanMutasi/DetailTerimaMutasi';
import AbsiDetailPenerimaanMutasi from './PenerimaanMutasi/DetailPenerimaanMutasi';
import AbsiRetur from './ReturArtikel/Retur';
import AbsiBuatRetur from './ReturArtikel/BuatRetur';
import AbsiDetailRetur from './ReturArtikel/DetailRetur';
import AbsiKeranjangRetur from './ReturArtikel/KeranjangRetur';
import AbsiBap from './Bap/Bap.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AbsiNavigator = ({onLogout}) => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Menu" tabBarOptions={{inactiveTintColor: 'grey', activeTintColor: '#071952', style: {backgroundColor: '#EAF2F2'}}}>
        <Tab.Screen name="Menu" component={Menu} initialParams={{onLogout}} options={{headerShown: false, tabBarLabel: 'Menu', tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="storefront-outline" color={color} size={size}/>)}}/>
        <Tab.Screen name="Account" component={Account} initialParams={{onLogout}} options={{headerShown: false, tabBarLabel: 'Profil', tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="account-outline" color={color} size={size}/>)}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const Menu = ({route}) => {
  const {onLogout} = route.params || {};
  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi', 'Anda akan keluar dari ABSI mobile',
      [
        {
          text: 'Ya',
          onPress: () => {onLogout && onLogout()},
        },
        {
          text: 'Tidak',
          style: 'cancel',
        },
      ],
      {cancelable: false}
    );
  };
  return (
    <Stack.Navigator
      initialRouteName="stackMenu"
      screenOptions={{
        headerTintColor: 'white',
        headerTitleStyle: {fontWeight: 'bold'},
        headerStyle: {backgroundColor: '#071952'},
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{marginRight: 20}}>
            <MaterialCommunityIcons size={25} name="logout" color="white"/>
          </TouchableOpacity>
        ),
      }}>
      <Stack.Screen name="Shop" component={AbsiShop} options={{title: 'Toko'}}/>
      <Stack.Screen name="Menu" component={AbsiMenu} options={{title: 'Menu'}}/>
      <Stack.Screen name="BuatPo" component={AbsiBuatPo} options={{title: 'Buat PO'}}/>
      <Stack.Screen name="DetailPo" component={AbsiDetailPo} options={{title: 'Detail PO'}}/>
      <Stack.Screen name="PoArtikel" component={AbsiPoArtikel} options={{title: 'PO Artikel'}}/>
      <Stack.Screen name="KeranjangPo" component={AbsiKeranjangPo} options={{title: 'Keranjang PO'}}/>
      <Stack.Screen name="TerimaArtikel" component={AbsiTerimaArtikel} options={{title: 'Terima Artikel'}}/>
      <Stack.Screen name="DetailTerimaArtikel" component={AbsiDetailTerimaArtikel} options={{title: 'Detail Terima Artikel'}}/>
      <Stack.Screen name="DetailPenerimaanArtikel" component={AbsiDetailPenerimaanArtikel} options={{title: 'Detail Penerimaan Artikel'}}/>
      <Stack.Screen name="Penjualan" component={AbsiPenjualan} options={{title: 'Penjualan'}}/>
      <Stack.Screen name="BuatPenjualan" component={AbsiBuatPenjualan} options={{title: 'Buat Penjualan'}}/>
      <Stack.Screen name="DetailPenjualan" component={AbsiDetailPenjualan} options={{title: 'Detail Penjualan'}}/>
      <Stack.Screen name="KeranjangPenjualan" component={AbsiKeranjangPenjualan} options={{title: 'Keranjang Penjualan'}}/>
      <Stack.Screen name="StokArtikel" component={AbsiStokArtikel} options={{title: 'Stok Artikel'}}/>
      <Stack.Screen name="UpdateAset" component={AbsiUpdateAset} options={{title: 'Update Aset'}}/>
      <Stack.Screen name="StokOpname" component={AbsiStokOpname} options={{title: 'Stok Opname'}}/>
      <Stack.Screen name="TerimaMutasi" component={AbsiTerimaMutasi} options={{title: 'Terima Mutasi'}}/>
      <Stack.Screen name="DetailTerimaMutasi" component={AbsiDetailTerimaMutasi} options={{title: 'Detail Terima Mutasi'}}/>
      <Stack.Screen name="DetailPenerimaanMutasi" component={AbsiDetailPenerimaanMutasi} options={{title: 'Detail Penerimaan Mutasi'}}/>
      <Stack.Screen name="Retur" component={AbsiRetur} options={{title: 'Retur'}}/>
      <Stack.Screen name="KeranjangRetur" component={AbsiKeranjangRetur} options={{title: 'Keranjang Retur'}}/>
      <Stack.Screen name="DetailRetur" component={AbsiDetailRetur} options={{title: 'Detail Retur'}}/>
      <Stack.Screen name="BuatRetur" component={AbsiBuatRetur} options={{title: 'Buat Retur'}}/>
      <Stack.Screen name="Bap" component={AbsiBap} options={{title: 'BAP'}}/>
    </Stack.Navigator>
  );
}

function Account({route}) {
  const {onLogout} = route.params || {};
  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi', 'Anda akan keluar dari ABSI mobile',
      [
        {
          text: 'Ya',
          onPress: () => {onLogout && onLogout()},
        },
        {
          text: 'Tidak',
          style: 'cancel',
        },
      ],
      {cancelable: false}
    );
  };
  return (
    <Stack.Navigator
      initialRouteName="stackMenu"
      screenOptions={{
        headerTintColor: 'white',
        headerTitleStyle: {fontWeight: 'bold'},
        headerStyle: {backgroundColor: '#071952'},
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{marginRight: 20}}>
            <MaterialCommunityIcons size={25} name="logout" color="white"/>
          </TouchableOpacity>
        ),
      }}>
      <Stack.Screen name="Profile" component={AbsiProfile} options={{title: 'Akun Saya'}}/>
    </Stack.Navigator>
  );
}
export default AbsiNavigator;