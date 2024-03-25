import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const WebView = ({ showInfo1, showInfo2, showInfo3, showInfo4, showInfo5, showInfo6, showInfo7, showInfo8, showInfo9, toggleInfo1, toggleInfo2, toggleInfo3, toggleInfo4, toggleInfo5, toggleInfo6, toggleInfo7, toggleInfo8, toggleInfo9 }) => {
  return (
    <ScrollView style={styles.webView}>
      <TouchableOpacity style={styles.webViewButton} onPress={toggleInfo1}>
        <Text style={styles.webViewText}>PO Artikel</Text>
        <MaterialCommunityIcons name={showInfo1 ? "arrow-up-thick" : "arrow-down-thick"} style={styles.webViewIcon}/>
      </TouchableOpacity>
      {showInfo1 && (
        <Text style={styles.webViewDropdown}>
          Pada tahap ini SPG/SPB diminta untuk melakukan permintaan artikel pada menu <Text style={{fontWeight: 'bold'}}>po artikel</Text>. Ada beberapa hal yang perlu diperhatikan sebelum melakukan permintaan artikel, yaitu{"\n"}
          1. Mengecek stok artikel yang ada di toko.{"\n"}
          2. Mengecek artikel yang sering terjual dan artikel yang jarang atau tidak terjual.{"\n"}
          3. Mengecek kode artikel dan nama artikel yang terdapat dalam sistem.{"\n"}
          4. Mengecek minimal permintaan PO per artikel:{"\n"}
          -	Isi 1 : Kelipatan 6 pcs/box/polybag{"\n"}
          -	Isi 2 : Kelipatan 6 pcs/box/polybag{"\n"}
          -	Isi 3 : Kelipatan 4 pcs/box/polybag{"\n"}
          -	Isi 4 : Kelipatan 3 pcs/box/polybag{"\n"}
          -	Isi 6 : Kelipatan 2 pcs/box/polybag{"\n"}
          Setelah menginput permintaan artikel, SPG/SPB dapat melihat status update permintaan artikel
        </Text>
      )}

      <TouchableOpacity style={styles.webViewButton} onPress={toggleInfo2}>
        <Text style={styles.webViewText}>Terima Artikel</Text>
        <MaterialCommunityIcons name={showInfo2 ? "arrow-up-thick" : "arrow-down-thick"} style={styles.webViewIcon}/>
      </TouchableOpacity>
      {showInfo2 && (
        <Text style={styles.webViewDropdown}>
          Pada tahap ini SPG/SPB diminta untuk mengecek terlebih dahulu artikel yang sudah sampai di toko apakah sudah sesuai dengan permintaan dan surat jalan atau belum, jika sudah dan di pastikan benar, SPG/SPB wajib melakukan penginputan pada menu <Text style={{fontWeight: 'bold'}}>terima artikel</Text> maksimal H+1 terhitung dari waktu artikel sampai.
        </Text>
      )}

      <TouchableOpacity style={styles.webViewButton} onPress={toggleInfo3}>
        <Text style={styles.webViewText}>Penjualan</Text>
        <MaterialCommunityIcons name={showInfo3 ? "arrow-up-thick" : "arrow-down-thick"} style={styles.webViewIcon}/>
      </TouchableOpacity>
      {showInfo3 && (
        <Text style={styles.webViewDropdown}>
          Pada tahap ini SPG/SPB diminta untuk melakukan penginputan pada menu <Text style={{fontWeight: 'bold'}}>penjualan</Text> sesuai dengan artikel, jumlah, dan tanggal terjual. Untuk SPG/SPB stay wajib mengisi laporan penjualan maksimal H+2. (Apabila ada kesalahan penginputan, SPG/SPB wajib melaporkan ke TL dan juga menginfokan di grup Whatsapp ABSI)
        </Text>
      )}

      <TouchableOpacity style={styles.webViewButton} onPress={toggleInfo4}>
        <Text style={styles.webViewText}>Info Stok</Text>
        <MaterialCommunityIcons name={showInfo4 ? "arrow-up-thick" : "arrow-down-thick"} style={styles.webViewIcon}/>
      </TouchableOpacity>
      {showInfo4 && (
        <Text style={styles.webViewDropdown}>
          Pada menu ini SPG/SPB dapat melihat artikel apa saja yang tersedia beserta dengan jumlah stok artikel berdasarkan toko yang sudah di pilih.
        </Text>
      )}

      <TouchableOpacity style={styles.webViewButton} onPress={toggleInfo5}>
        <Text style={styles.webViewText}>Update Aset</Text>
        <MaterialCommunityIcons name={showInfo5 ? "arrow-up-thick" : "arrow-down-thick"} style={styles.webViewIcon}/>
      </TouchableOpacity>
      {showInfo5 && (
        <Text style={styles.webViewDropdown}>
          Pada tahap ini SPG/SPB diminta untuk mempersiapkan terlebih dahulu data aset yang ada di toko, seperti jumlah aset, kondisi aset, dan foto aset. Setelah itu SPG/SPB diminta untuk melakukan penginputan pada menu <Text style={{fontWeight: 'bold'}}>update aset</Text>. Jika ada ketidakcocokan antara data aset yang ada di lapangan dengan data aset yang ada di sistem maka SPG/SPB wajib melaporkan hal ini ke Team Leader dan Team Operasional.
        </Text>
      )}

      <TouchableOpacity style={styles.webViewButton} onPress={toggleInfo6}>
        <Text style={styles.webViewText}>Stock Opname</Text>
        <MaterialCommunityIcons name={showInfo6 ? "arrow-up-thick" : "arrow-down-thick"} style={styles.webViewIcon}/>
      </TouchableOpacity>
      {showInfo6 && (
        <Text style={styles.webViewDropdown}>
          Stok Opname di lakukan setiap bulan, agar bisa di lakukan pengecekan mengenai pergerakan stok di toko yang dipegang oleh SPG/SPB. Sebelum melakukan penginputan SO pastikan sudah menginput penjualan, penerimaan barang, retur, dll sebelum tanggal SO fisik. Penginputan SO di ABSI H+1 dari tanggal SPG SO fisik di toko. Input SO harus sesuai dengan hasil stok di lapangan. Untuk SO yang di tuliskan di catatan yaitu Tanggal SO realnya. (Dilarang menambahkan stok so di catatan). Apabila ada ketidaksesuaian data, SPG/SPB wajib menginfokan hal tersebut ke TL.
        </Text>
      )}

      <TouchableOpacity style={styles.webViewButton} onPress={toggleInfo7}>
        <Text style={styles.webViewText}>Terima Mutasi</Text>
        <MaterialCommunityIcons name={showInfo7 ? "arrow-up-thick" : "arrow-down-thick"} style={styles.webViewIcon}/>
      </TouchableOpacity>
      {showInfo7 && (
        <Text style={styles.webViewDropdown}>
          Penerimaan Mutasi dilakukan karena adanya penjualan mutasi barang oleh TL, dari Toko A ke Toko B, apabila ada mutasi ke toko SPG/SPB, maka SPG/SPB wajib menginput penerimaan sesuai dengan lampiran dan juga Surat Jalan Pengiriman. Apabila sudah di pastikan benar, SPG/SPB wajib melakukan penginputan maksimal H+1 dari waktu barang sampai. (pastikan penginputan dicek sebelum melakukan konfirmasi terima barang). (Proses penginputan sesuai dengan penerimaan artikel).
        </Text>
      )}

      <TouchableOpacity style={styles.webViewButton} onPress={toggleInfo8}>
        <Text style={styles.webViewText}>Retur</Text>
        <MaterialCommunityIcons name={showInfo8 ? "arrow-up-thick" : "arrow-down-thick"} style={styles.webViewIcon}/>
      </TouchableOpacity>
      {showInfo8 && (
        <Text style={styles.webViewDropdown}>
          Pada tahap ini SPG/SPB diminta untuk mempersiapkan terlebih dahulu data artikel yang akan di input, seperti kode artikel atau nama artikel, jumlah artikel, kondisi artikel, catatan terkait artikel jika ada, foto artikel, foto lampiran, dan foto packing. Setelah itu SPG/SPB diminta untuk berkomunikasi dengan Team Leader, jika semua sudah sesuai SPG/SPB dapat melakukan proses penginputan pada menu <Text style={{fontWeight: 'bold'}}>retur</Text>. Setelah selesai menginput SPG/SPB dapat melihat status update retur yang sudah di buat.
        </Text>
      )}

      <TouchableOpacity style={styles.webViewButton} onPress={toggleInfo9}>
        <Text style={styles.webViewText}>BAP</Text>
        <MaterialCommunityIcons name={showInfo9 ? "arrow-up-thick" : "arrow-down-thick"} style={styles.webViewIcon}/>
      </TouchableOpacity>
      {showInfo9 && (
        <Text style={styles.webViewDropdown}>
          ...
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  webView: {
    width: 350,
    height: 300,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  webViewButton: {
    padding: 10,
    elevation: 2, 
    marginBottom: 5,
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    borderBottomColor: '#0B666A',
    justifyContent: 'space-between',
  },
  webViewText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  webViewIcon: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  webViewDropdown: {
    fontSize: 16,
    elevation: 2, 
    marginBottom: 5,
    marginRight: 10,
    textAlign: 'justify',
  },
});
export default WebView;
