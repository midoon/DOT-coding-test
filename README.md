# Penjelasan Pattern Project

## Kombinasi MVC architecture dengan Layered Architecture

---

### Alasan menggunakan arsitektur tersebut

**1. Pembagian berdasarkan kepentingan**
Dengan menggunakan kombinasi arsitektur MVC dengan layered, kita bisa membagi file kode berdasarkan tugas dan dapat kita pisahkan lebih lanjut menjadi beberapa layer.

**2. Memudahkan pemeliharaan / maintenance**
Memisahkan antar komponen berdasarkan fungsi memudahkan pengembang dalam melakukan pemeliharaan dan setiap komponen atau lapisan dapat dikelola atau diperbarui secara terpisah tanpa melibatkan komponen lainnya

**3. Reusability**
Setiap komponen dapat digunakan secara berulang tanpa harus menulis ulang kode

**4. Scalability**
Ketika dibutuhkan pembuatan komponen lain, pengembang dapat menambahkan komponen tersebut berdasarkan fungsionalitas yang telah dibagi pada setiap layer, sehingga proses penambahan komponen tidak mengganggu atau merubah kode yang telah ada.

**5. Kemudahan dalam pembuatan unit testing**
Pembuatan unit testing dapat dilakukan dengan mudah pada arsitektur atau pattern tersebut. selain kodenya dapat dipisahkan sendiri ke dalam layer testing, penggunaan komponen yang telah ada dapat digunakan dengan mudah pada proses pengujian, tanpa harus membuat ulang kode pada saat melakukan unit testing, seperti pemanggilan atau melakukan query ke database, pemanggilan web server, dll.

**6. Kemudahan dalam pembacaan kode**
Memisahkan komponen berdasarkan fungsionalitas dan lapisan dapat memudahkan pengembang untuk membaca dan memahami kode yang telah ditulis. sehingga ketika berkolaborasi dengan pengembang lain tidak menimbulkan kerancuan dalam memahami kode yang telah ada.
