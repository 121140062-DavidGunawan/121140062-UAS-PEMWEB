<?php
//Mendefinisikan global variabel yang digunakan untuk melakukan koneksi ke database local
define('DB_HOST', 'localhost'); 
define('DB_USERNAME', 'root');     
define('DB_PASSWORD', '');        
define('DB_NAME', 'data_registerasi');  
//Untuk variabel global database pada saat hosting website seperti dibawah ini
// define('DB_HOST', 'localhost'); 
// define('DB_USERNAME', 'id21680630_root');     
// define('DB_PASSWORD', 'Qnrv2*53b');        
// define('DB_NAME', 'id21680630_data_registerasi');   


//Object Asdos yang digunakan untuk melakukan manipulasi data Asisten Dosen
class Asdos{
    //Mendefinisikan variabel yang akan disimpan dalam object class Asdos
    private $nama;
    private $nim;
    private $jeniskelamin;
    private $tanggallahir;
    private $email;
    private $ipk;
    private $jenisbrowser;
    private $ipaddress;

    //Constructor untuk mendefinisikan nilai dari variabel yang sudah didefinisikan
    public function __construct($nama, $nim, $jeniskelamin, $tanggallahir, $email, $ipk, $jenisbrowser, $ipaddress){
        $this->nama = $nama;
        $this->nim = $nim;
        $this->jeniskelamin = $jeniskelamin;
        $this->tanggallahir = $tanggallahir;
        $this->email = $email;
        $this->ipk = $ipk;
        $this->jenisbrowser = $jenisbrowser;
        $this->ipaddress = $ipaddress;
    }

    //Fungsi untuk melakukan koneksi dengan Database
    public static function connectDB(){
        //membuat interaksi baru dengan mysql dengan parameter yang sudah didefinisikan pada variabel global   
        $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
        
        //mengoutputkan koneksi eror jika terjadi error
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        return $conn;
    }

    //Fungsi untuk menyimpan data Asdos ke Database
    public static function SimpanDataAsdos($nama, $nim, $jeniskelamin, $tanggallahir, $email, $ipk, $jenisbrowser, $ipaddress){   
        //Memanggil fungsi untuk melakukan koneksi ke database
        $conn = self::connectDB();

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        //Query SQL untuk menginputkan data ke tabel info_user pada database
        $sql = "INSERT INTO info_user (nama, nim, jeniskelamin, tanggallahir, email, ipk, jenisbrowser, ipaddress)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        //Menyiapkan SQL Query untuk di eksekusi
        $stmt = $conn->prepare($sql);
        //Binding parameter ke SQL Query
        $stmt->bind_param("ssssssss", $nama, $nim, $jeniskelamin, $tanggallahir, $email, $ipk, $jenisbrowser, $ipaddress);
        //Mengeksekusi SQL Query
        $stmt->execute();

        //Menutup statement dan koneksi
        $stmt->close();
        $conn->close();

        //Menyimpan Data asdos sementara pada session
        $_SESSION['user_info'] = array(
            'nama' => $nama,
            'nim' => $nim,
            'jeniskelamin' => $jeniskelamin,
            'tanggallahir' => $tanggallahir,
            'email' => $email,
            'ipk' => $ipk,
            'jenisbrowser' => $jenisbrowser,
            'ipaddress' => $ipaddress
        );
        echo "Session Data: ";
        var_dump($_SESSION);
    }
    
    //Fungsi untuk mengambil data Asdos dari Database
    public static function AmbilDataAsdos() {
        //Memanggil fungsi untuk melakukan koneksi ke database
        $conn = self::connectDB();

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        //Query SQL untuk menampilkan seluruh data dari tabel info_user pada database
        $sql = "SELECT * FROM info_user";

        //Mengeksekusi Query secara langsung tanpa binding parameter
        $result = $conn->query($sql);

        //Mendefinisikan array kosong untuk menyimpan hasil query
        $data = array();

        //Perulangan untuk menyimpan hasil query ke array yang sudah didefinisikan diatas
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }

        //Menutup koneksi dengan database
        $conn->close();

        //mengembalikan nilai array yang sudah diisi dengan hasil query
        return $data;
    }

    //Fungsi untuk menghapus data Asdos dari Database
    public static function DeleteDataAsdos($nim) {
        //Memanggil fungsi untuk melakukan koneksi ke database
        $conn = self::connectDB();
        
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
    
        //Query untuk menghapus 1 baris pada tabel info_user dengan ketentuan nim
        $sql = "DELETE FROM info_user WHERE nim = ?";
        //Menyiapkan SQL Query untuk dieksekusi
        $stmt = $conn->prepare($sql);
        //Binding Parameter NIM ke Statement
        $stmt->bind_param("s", $nim);
        //Mengeksekusi Statement
        $stmt->execute();
        
        //Melepaskan resource object yang terasosiasi dengan statement dan koneksi
        unset($stmt);
        unset($conn);
        
        //Menutup Statement dan koneksi dengan database
        $stmt->close();
        $conn->close();
        
        //Mengembalikan page ke index.php
        header("Location: index.php");
        //Memastikan ketika fungsi ini selesai dipanggil, tidak ada fungsi tambahan yang dieksekusi
        exit();
    }

    //Fungsi untuk melakukan update data Asdos dari Database
    public static function UpdateDataAsdos($nimlama, $nim, $nama, $jeniskelamin, $tanggallahir, $email, $ipk, $jenisbrowser, $ipaddress) {
        //Memanggil fungsi untuk melakukan koneksi ke database
        $conn = self::connectDB();
    
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        //Query untuk melakukan update seluruh kolom untuk row dari tabel info_user dengan ketentuan nim
        $sql = "UPDATE info_user SET nama=?, nim=?, jeniskelamin=?, tanggallahir=?, email=?, ipk=?, jenisbrowser=?, ipaddress=? WHERE nim=?";
        //Menyiapkan SQL Query untuk dieksekusi
        $stmt = $conn->prepare($sql);
        //Binding parameter yang dibutuhkan oleh Statement
        $stmt->bind_param("sssssssss", $nama, $nim, $jeniskelamin, $tanggallahir, $email, $ipk, $jenisbrowser, $ipaddress, $nimlama);
        //Mengeksekusi Statement
        $stmt->execute();
    
        //Menutup statement dan koneksi dengan database
        $stmt->close();
        $conn->close();
        //Memastikan ketika fungsi ini selesai dipanggil, tidak ada fungsi tambahan yang dieksekusi
        exit();
    }
    
}


//Pernyataan untuk memastikan ketika data.php dipanggil, request methodnya adalah POST
//Jika POST, maka melakukan input data ke database
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //Mendefinisikan seluruh field ke variabel yang akan di inputkan ke database
    $nama = isset($_POST['nama']) ? htmlspecialchars($_POST['nama']) : '';
    $nim = isset($_POST['nim']) ? htmlspecialchars($_POST['nim']) : '';
    $jeniskelamin = isset($_POST['jeniskelamin']) ? htmlspecialchars($_POST['jeniskelamin']) : '';
    $tanggallahir = isset($_POST['tanggallahir']) ? $_POST['tanggallahir'] : '';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    $ipk = isset($_POST['ipk']) ? htmlspecialchars ($_POST['ipk']) : '';
    $jenisbrowser = isset($_POST['jenisbrowser']) ? htmlspecialchars($_POST['jenisbrowser']) : '';
    $ipaddress = isset($_POST['ipaddress']) ? htmlspecialchars($_POST['ipaddress']) : '';

    //Mendefinisikan isValid sebagai boolean jika terdapat inputan yang tidak sesuai
    $isValid = true;

    //Melakukan pengecekan dari nama,nim,jeniskelamin,tanggallahir,dan email
    //jika terdapat input yang tidak valid, isValid akan bernilai false dan tidak menginputkan data ke database
    if (empty($nama)) {
        echo "Nama harus diisi.<br>";
        $isValid = false;
    }
    if (empty($nim)) {
        echo "NIM harus diisi.<br>";
        $isValid = false;
    }
    if (empty($jeniskelamin)) {
        echo "Jenis kelamin harus dipilih.<br>";
        $isValid = false;
    }
    if (empty($tanggallahir)) {
        echo "Tanggal lahir harus diisi.<br>";
        $isValid = false;
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Format email tidak valid.<br>";
        $isValid = false;
    }

    //Jika isValid tetap True, maka tidak adanya inputan yang invalid
    if ($isValid) {
        //maka, Membuat object Asdos baru dengan parameter yang sudah didefinisikan diatas
        $Asdos = new Asdos($nama, $nim, $jeniskelamin, $tanggallahir, $email, $ipk, $jenisbrowser, $ipaddress);
        //Menyimpan data Asdos ke Database
        Asdos::SimpanDataAsdos($nama, $nim, $jeniskelamin, $tanggallahir, $email, $ipk, $jenisbrowser, $ipaddress);
    }
//Jika methodnya bukan post melainkan GET dengan action remove, maka melakukan delete data asdos
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'remove' && isset($_GET['nim'])) {
    //Mendefinisikan NIM sebagai key data yang ingin diremove dari database
    $nimToRemove = $_GET['nim'];
    //Memanggil fungsi untuk delete data Asdos dari Database
    Asdos::DeleteDataAsdos($nimToRemove);
} 

//Jika methodnya post dengan action update, maka melakukan update data Asdos dari Database
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'update') {
    //Mendefinisikan NIM sebagai key data yang ingin diupdate dari database
    $nimLama = isset($_POST['nimlama']) ? htmlspecialchars($_POST['nimlama']) : '';

    //Mendefinisikan variabel baru yang ingin diupdate ke database
    $editNama = isset($_POST['editnama']) ? htmlspecialchars($_POST['editnama']) : '';
    $editNIM = isset($_POST['editnim']) ? htmlspecialchars($_POST['editnim']) : '';
    $editJenisKelamin = isset($_POST['editjeniskelamin']) ? htmlspecialchars($_POST['editjeniskelamin']) : '';
    $editTanggalLahir = isset($_POST['edittanggallahir']) ? $_POST['edittanggallahir'] : '';
    $editEmail = isset($_POST['editemail']) ? htmlspecialchars($_POST['editemail']) : '';
    $editIPK = isset($_POST['editipk']) ? htmlspecialchars($_POST['editipk']) : '';
    $jenisbrowser = isset($_POST['editbrowser']) ? htmlspecialchars($_POST['editbrowser']) : '';
    $ipaddress = isset($_POST['editIP']) ? htmlspecialchars($_POST['editIP']) : '';

    //Memanggil fungsi UpdateDataAsdos dengan menginputkan parameter NIM lama dan Data baru
    Asdos::UpdateDataAsdos($nimLama, $editNIM, $editNama, $editJenisKelamin, $editTanggalLahir, $editEmail, $editIPK, $jenisbrowser, $ipaddress);
} 

?>
