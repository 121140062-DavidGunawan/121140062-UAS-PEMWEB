## Link Hosting : https://pemwebdavid.000webhostapp.com

---

## Ujian Akhir Semester Pemrograman Web RB

## Nama : David Gunawan

## NIM : 121140062

---

### Bagian 1: Client-side Programming

**1.1**

Website yang sudah saya buat merupakan sebuah website untuk melakukan Registerasi Asisten Dosen Pemrograman Web. 
Terdapat 6 input yang dapat dilakukan oleh user yaitu Nama, NIM, Jenis Kelamin, Tanggal Lahir, Email, IPK.
Dari 6 input tersebut, terdapat 5 jenis input yaitu text, number, email, date, dan radio.

terdapat 2 function pada javascript untuk melakukan manipulasi input yang dilakukan oleh user yaitu clear input dan
submit data. clear input digunakan untuk mengembalikan semua value dari field input menjadi kosong sedangkan submit data
digunakan untuk melakukan submit data ke database dan disimpan pada session storage.

**1.2**

pada index, terdapat sebuah script php untuk mengambil data Asisten dosen dari database dan mengoutputkannya kedalam tabel html.
terdapat beberapa aksi yang bisa dilakukan pada tabel data server yaitu detail dan remove. detail digunakan untuk melihat semua data
user secara lengkap dan remove digunakan untuk menghapus data user dari database.

pada detail, terdapat 8 data yaitu 6 data dari user dan 2 data berupa jenis browser dan ip address user saat melakukan submit data serta
tombol untuk melakukan edit data. ketika edit data dipilih, maka muncul edit form pada sebelah kanan detail yang sudah terisi dengan data
yang ingin diedit sehingga user hanya perlu mengganti data yang ingin diedit saja.

Jadi, total dari event yang ada untuk menghandle form ada 3 yaitu : Detail, Remove, dan Edit.

data yang dilakukan saat submit pada form input dan form edit akan divalidasi terlebih dahulu inputannya pada javascript.
ketika terdapat inputan yang tidak sesuai maka javascript akan alert letak kesalahan fieldnya. jika tidak, maka dilakukan proses ke php

---

### Bagian 2: Server-side Programming

**2.1**

Pada script data.php, terdapat 2 metode yang digunakan untuk memproses form yaitu GET dan POST. GET digunakan untuk memproses ketika
terjadinya request untuk melakukan penghapusan database. metode GET digunakan pada saat penghapusan data pada database karena pada saat 
fungsi menghapus data dari database dipanggil, hal pertama yang dilakukan fungsi tersebut adalah mencari baris data yang ingin dihapus. sehingga
lebih baik untuk menggunakan metode GET. sedangkan untuk POST terdapat 2 fungsi yang menggunakan metode ini yaitu simpan data ke database dan
update value dari suatu data ke database.

data dari setiap aksi yang dilakukan sudah divalidasi pada sisi javascript. namun pada sisi server divalidasi kembali setiap inputan yang diterima
oleh server. data yang diterima oleh server juga menyertakan jenis browser dan ip address pengguna saat submit data.

**2.2**

Terdapat sebuah object PHP bernama Asdos pada script data.php. terdapat 5 metode dalam class object Asdos yang digunakan untuk memanipulasi
data Asdos pada database. dikarenakan website yang saya buat adalah sebuah form registerasi, maka metode yang digunakan adalah Simpan Data,
Lihat data, Hapus data, Update Data, dan fungsi untuk melakukan koneksi dengan database.

---

### Bagian 3: Database Management

**3.1**

Pada localhost, langkah-langkah dalam membuat database yaitu

- mysql -u root -p (Mengakses MySQL dengan username root dan tanpa password)

- CREATE DATABASE data_registerasi; (Membuat Database data_registerasi)

- USE data_registerasi; (Mengakses database yang baru saja dibuat)

- CREATE TABLE info_user (
  nama VARCHAR(50) NOT NULL,
  nim INT(20) NOT NULL,
  jeniskelamin VARCHAR(20) NOT NULL,
  tanggallahir DATE NOT NULL,
  email VARCHAR(50) NOT NULL,
  ipk FLOAT NOT NULL,
  jenisbrowser VARCHAR(30) NOT NULL,
  ipaddress VARCHAR(20) NOT NULL,
  PRIMARY KEY (nim)
) ENGINE = InnoDB;

Maka tabel info_user pada database data_registerasi berhasil dibuat dan bisa digunakan.


**3.2**

Untuk melakukan konfigurasi database dari localhost dan website yang sudah dihosting berbeda.

pada localhost, parameter yang dibutuhkan untuk melakukan koneksi ke localhost dapat dilihat
seperti dibawah ini.

define('DB_HOST', 'localhost'); 
define('DB_USERNAME', 'root');     
define('DB_PASSWORD', '');        
define('DB_NAME', 'data_registerasi');  

$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

sedangkan pada website yang sudah dihosting, database yang digunakan adalah database dari
penyedia hosting. parameter yang dibutuhkan untuk melakukan koneksi ke database penyedia hosting
dapat dilihat seperti dibawah ini.

define('DB_HOST', 'localhost'); 
define('DB_USERNAME', 'id21680630_root');     
define('DB_PASSWORD', 'Qnrv2*53b');        
define('DB_NAME', 'id21680630_data_registerasi');  

$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

konstanta yang dibutuhkan untuk melakukan koneksi ke localhost ataupun database penyedia hosting 
disimpan pada suatu global variabel.


**3.3**

Pada website yang sudah saya buat, terdapat 4 query SQL yang digunakan untuk mengakses ataupun memanipulasi data yaitu

1. Tambah Data
"INSERT INTO info_user (nama, nim, jeniskelamin, tanggallahir, email, ipk, jenisbrowser, ipaddress) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

Query tersebut digunakan ketika ingin menambahkan data ke tabel info_user.

2. Update Data
"UPDATE info_user SET nama=?, nim=?, jeniskelamin=?, tanggallahir=?, email=?, ipk=?, jenisbrowser=?, ipaddress=? WHERE nim=?"

Query tersebut digunakan ketika ingin mengupdate data yang sudah ada pada tabel info_user

3. Hapus Data
"DELETE FROM info_user WHERE nim = ?"

Query tersebut digunakan ketika ingin menghapus data dari tabel info_user dengan ketentuan nim.

4. Lihat data
"SELECT * FROM info_user"

Query tersebut digunakan ketika ingin mengakses seluruh data yang ada pada tabel info_user untuk ditampilkan pada website

---

### Bagian 4: State Management

**4.1**

Pada website yang sudah saya buat, saya memanfaatkan Session untuk menggunakan SessionStorage. SessionStorage tersebut digunakan
untuk menyimpan ketika user pertama kali mengakses website. maka saya menyimpan sebuah item ke sessionstorage bahwa user tidak lagi mengakses
website untuk pertama kali. Maka ketika user melakukan reload page, state dari user tetap sudah mengakses website.

**4.2**

Pada website yang sudah saya buat, saya memanfaatkan cookie untuk menyimpan nama user yang terakhir diregisterasikan. setiap kali user mengakses
website, terdapat alert welcome. jika user sudah pernah melakukan registerasi, maka alert welcome akan menampilkan nama yang ada pada cookie. dan jika user belum
pernah melakukan registerasi ataupun data dari registerasinya dihapus, maka alert welcome akan menganggap user baru pertama kali mengakses website yang sudah saya
buat.

Selain cookie, saya juga memanfaatkan browser storage yaitu Local Storage. Local Storage ini saya gunakan untuk menyimpan list nama yang sudah pernah user
registerasikan. ketika user melakukan registerasi dan nama tersebut ada pada local storage, maka website akan mengagalkan registerasi karena
nama tersebut sudah pernah melakukan registerasi.

setiap user menambahkan, mengupdate, dan menghapus data dari database. cookie dan local storage juga akan beradaptasi dengan perubahan tersebut
karena pada javascript terdapat fungsi untuk menetapkan, mendapatkan, dan menghapus cookie ataupun local storage.

---

### Bagian Bonus: Hosting Aplikasi Web

**1** Langkah langkah hosting
dengan mengasumsi saya sudah memilih penyedia hosting website dan melakukan registerasi pada websitenya, langkah-langkah hosting
website yang saya lakukan yaitu :

pada saat ingin melakukan hosting website, hal yang perlu saya siapkan yaitu seluruh script dari website yang sudah saya buat.
Setelah menyiapkan seluruh scriptnya, langkah selanjutnya yaitu saya melakukan upload script ke penyedia hosting website.
script yang digunakan sebagai landing page dari website tersebut saya ubah nama menjadi 'index' karena penyedia hosting website yang
saya gunakan membaca 'index' sebagai landing page dari website.

setelah itu, maka website sudah dihosting. Namun karena website yang saya buat adalah website dinamis, langkah selanjutnya yaitu
membuat database dari penyedia hosting. setelah database berhasil dibuat, saya melakukan konfigurasi parameter yang digunakan untuk
melakukan koneksi dengan database tersebut. setelah itu, saya melakukan konfigurasi database seperti membuat database dan membuat tabel.
jika konfigurasi database yang sudah dibuat pada penyedia hosting sudah sama dengan database local saya, maka website sudah berhasil
dihosting dan digunakan.


**2** Alasan memilih 000webhost

Penyedia hosting website yang saya pilih adalah 000webhost. alasan saya memilih 000webhost karena menyediakan hosting website
tanpa limit waktu dan gratis. selain itu 000webhost juga menyediakan database dan support dengan php. maka menurut saya 000webhost
sudah lebih dari cukup sebagai tempat saya melakukan hosting website yang sudah saya buat.


**3** Keamanan website yang saya host

website yang sudah saya buat memiliki beberapa keamanan agar pengguna tidak dapat melakukan manipulasi database. yang pertama yaitu
penggunaan SQL Injection untuk mencegah user melakukan manipulasi Query SQL yang sudah saya tetapkan. selain itu, saya juga menggunakan
htmlspecialchars() untuk mencegah penyerangan cross-site scripting (XSS). walaupun tidak sempurna, namun sudah ada beberapa keamanan
dasar yang diimplementasikan agar data dari database terjaga.

**4** Konfigurasi Server yang diterapkan

Pada website yang sudah saya hosting, saya tidak melakukan konfigurasi terhadap website setting dari penyedia hosting karena website
yang saya upload berjalan dengan baik dengan settingan default yang diberikan oleh 000webhost. Oleh karena itu, saya tidak perlu
melakukan konfigurasi server untuk mendukung website saya karena konfigurasi default sudah mendukung website saya.
