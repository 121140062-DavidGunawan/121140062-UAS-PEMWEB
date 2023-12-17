// Fungsi untuk menampilkan alert welcome
function showAlert() {
    var name = getCookie("user_name");
    // jika user sudah pernah mendaftar, maka alert nama yang tersimpan pada cookie
    if (name !== null) {
        alert('Selamat datang kembali ' + name + '!');
    // Jika user tidak pernah melakukan pendaftaran, maka
    // alert welcome untuk pertama kali
    } else {
        alert('Selamat datang pada website registrasi untuk pertama kali!');
    }
}

// Memanggil fungsi showAlert() ketika window di load
window.onload = function () {
    //mendefinisikan firstopen dari session storage
    var firstOpen = sessionStorage.getItem('FirstOpen');

    //jika tidak ada item FirstOpen dari session storage,
    //maka setitem FirstOpen dengan value false atau true
    if(firstOpen === null) {
        sessionStorage.setItem('FirstOpen', 'false'); 
        showAlert();
    //jika FirstOpen sudah ada pada session storage,
    //maka tidak menjalankan showAlert() apapun value
    //dari FirstOpen
    } else {
        return;
    }
};

//Fungsi Untuk melakukan validasi terhadap inputan yang ada pada field
function validateInput(input) {
    var value = input.value.trim();
    var isValid = true;
    var inputname;


    //Menggunakan switch case untuk mencari nama dari input parameter
    switch (input.name) {
        case 'nama':
        case 'editnama':
            isValid = /^[A-Za-z\s]+$/.test(value);
            inputname = "Nama";
            break;
        case 'nim':
        case 'editnim':
            isValid = /^\d{1,19}$/.test(value) && Number.isInteger(parseFloat(value));
            inputname = "NIM";
            break;
        case 'jeniskelamin':
            isValid = document.querySelector('input[name="jeniskelamin"]:checked') !== null;
            inputname = "Jenis Kelamin";
            break;
        case 'editjeniskelamin':
            isValid = document.querySelector('input[name="editjeniskelamin"]:checked') !== null;
            inputname = "Jenis Kelamin";
            break;
        case 'tanggallahir':
        case 'edittanggallahir':
            isValid = value !== '';
            inputname = "Tanggal Lahir";
            break;
        case 'email':
        case 'editemail':
            isValid = /\S+@\S+\.\S+/.test(value);
            inputname = "Email";
            break;

        case 'ipk':
        case 'editipk':
            isValid = /^(0(\.\d+)?|[1-3](\.\d+)?|4)$/.test(value) && value !== '';
            inputname = "IPK";
            break;

        default:
            break;
    }

    //Jika isValid false, artinya input yang dimasukkan tidak sesuai dengan
    //regex pada switch case. maka script akan alert kesalahannya dimana
    if (!isValid) {
        alert('Kesalahan input pada field ' + inputname);
    }

    //Mengembalikan isValid agar bisa divalidasi dengan input lainnya
    return isValid;
}

//Fungsi untuk melakukan pengecekan terhadap tipe browser yang digunakan user
function checkBrowserType() {
    //Mendefinisikan variabel untuk menyimpan tipe browser user
    var browserType;

    //Melakukan pengecekan terhadap userAgent yang memiliki informasi tentang
    //browser yang digunakan oleh user
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        browserType = 'Opera';
    } else if (navigator.userAgent.indexOf("Edg") != -1) {
        browserType = 'Microsoft Edge';
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        browserType = 'Google Chrome';
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        browserType = 'Safari';
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        browserType = 'Mozilla Firefox';
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) 
    {
        browserType = 'Internet Explorer';
    } else {
        browserType = 'Unknown';
    }

    //Mengembalikan variabel yang sudah ditetapkan nilainya
    return browserType;
    }

//Fungsi untuk mendapatkan IP Address user
//async fungsi berarti fungsi mengembalikan promise
//fungsi async memungkinkan penggunaan 'await'
//await digunakan ketika menjalankan suatu fungsi dan ingin menunggu hingga fungsi tersebut selesai
async function getIPAddress() {
    try {
        //Untuk mengakses IP Address secara langsung tidak memungkinkan
        //oleh karena itu, disini menggunakan suatu API untuk mengetahui
        //IP Address dari user.
        const response = await fetch('https://api.ipify.org?format=json');

        //hasil dari response akan berupa json dan disini
        //menggunakan method json() untuk mengekstrak hasil dari response
        const data = await response.json();

        //mengembalikan atribut ip dari data yang sudah diekstrak
        return data.ip;
    } catch (error) {
        //Menggunakan error handling ketika fetch IP gagal dilakukan, maka return null
        console.error('Error fetching IP Address:', error);
        return null;
    }
}


//Fungsi untuk Submit data input ke database
async function SubmitData() {
    //mendefinisikan form input
    var form = document.getElementById('forminput');
    //mendefinisikan object formdata untuk menyimpan seluruh input dari form
    var formData = new FormData(form);

    //Melakukan pengecekan terhadap seluruh input.
    //jika terdapat salah 1 input yang tidak valid,
    //maka langsung return kosong dan tidak melanjutkan fungsi submitdata
    if (
        !validateInput(document.getElementById('nama')) ||
        !validateInput(document.getElementById('nim')) ||
        !validateInput(document.querySelector('input[name="jeniskelamin"]:checked')) ||
        !validateInput(document.getElementById('tanggallahir')) ||
        !validateInput(document.getElementById('email')) ||
        !validateInput(document.getElementById('ipk'))
    ) {
        return;
    //Melakukan pengecekan apakah username yang diinputkan sudah pernah
    //diinputkan oleh user atau belum. data yang sudah pernah diinputkan
    //oleh user akan tersimpan pada local storage
    } else if (isValueInLocalStorageArray("user_name", formData.get('nama'))) {
        alert('Anda sudah pernah mendaftar dengan nama tersebut! (Tersimpan pada LocalStorage)');
        return;
    }

    //Menggunakan error handling yaitu try catch jika terjadi masalah
    try {
        //Mendefinisikan ip Address yang memanggil fungsi getIPAddress
        const ipAddress = await getIPAddress();

        //Menambahkan data jenisbrowser dan ipAddress pada formData
        formData.append('jenisbrowser', checkBrowserType());
        formData.append('ipaddress', ipAddress);

        //Mengirimkan permintaan HTTP Post ke server dengan object formData
        //yang akan dikirimkan ke server
        const response = await fetch('data.php', {
            method: 'POST',
            body: formData
        });

        //Jika response tidak baik, maka membuat statement error
        //bahwa response dari server tidak baik
        if (!response.ok) {
            throw new Error('Permintaan request HTTP gagal');
        }

        //menyimpan cookie nama selama 7 hari
        setCookie("user_name", formData.get('nama'), 7);
        //menyimpan nama ke local storage
        addToLocalStorageArray("user_name", formData.get('nama'));

        //Memanggil fungsi ClearInput untuk mengosongkan
        //Field yang sudah diisi oleh user pada form input
        ClearInput();

        //Mereload page agar data dari database dapat ditampilkan
        location.reload(true);
        //Memberi tahu user jika submit data berhasil
        alert("Sukses melakukan registerasi! (Data Tersimpan sementara pada Session Storage)")
    } catch (error) {
        alert(error);
    }
}

//Fungsi untuk menampilkan detail dari data
function showDetail(button) {
    //mendefinisikan form edit
    const editfield = document.querySelector('.edit-field');
    //jika form edit display adalah flex, ubah menjadi none
    if (editfield) {
        if(editfield.style.display === 'flex') {
            editfield.style.display = 'none';
        }
    }
    //mendefinisikan detailcontainer untuk meletakkan data
    const detailContainer = document.getElementById('detailContainer');
    //mengambil atribut data-row dari elemen yang dipilih yaitu button
    const encodedData = button.getAttribute('data-row');
    //hasil dari getattribute berupa string JSON, oleh karena itu perlu
    //di parse agar menjadi object javascript
    const selectedRow = JSON.parse(encodedData);

    //Melakukan binding langsung ke html dari detailContainer
    //untuk menginputkan detail dari data
    detailContainer.innerHTML = `
        <h2>Details</h2>
        <p><strong>Nama:</strong> ${selectedRow.nama}</p>
        <p><strong>NIM:</strong> ${selectedRow.nim}</p>
        <p><strong>Jenis Kelamin:</strong> ${selectedRow.jeniskelamin}</p>
        <p><strong>Tanggal Lahir:</strong> ${selectedRow.tanggallahir}</p>
        <p><strong>Email:</strong> ${selectedRow.email}</p>
        <p><strong>IPK:</strong> ${selectedRow.ipk}</p>
        <p><strong>Jenis Browser:</strong> ${selectedRow.jenisbrowser}</p>
        <p><strong>IP Address:</strong> ${selectedRow.ipaddress}</p>
        <button class="action-button" onclick="bindingEditField(${JSON.stringify(selectedRow).replace(/"/g, '&quot;')})">Edit Data</button>
        `;

    //Melakukan style dan pemindahan layar ke detailcontainer
    detailContainer.style.display = 'block';
    detailContainer.scrollIntoView({behavior: 'smooth', block:'start'})
}

//Fungsi untuk menampilkan field edit data serta
//melakukan binding default value pada field edit
function bindingEditField(data) {
    var element = document.querySelector('.edit-field');
    if (element) {
        //Mengubah display .edit-field yang tadinya none menjadi flex
        element.style.display = 'flex';

        //Melakukan binding value untuk setiap field dengan data
        document.getElementById('editnama').value = data.nama;
        document.getElementById('editnim').value = data.nim;
        document.getElementById('editemail').value = data.email;
        document.getElementById('editipk').value = data.ipk;
        if (data.jeniskelamin === 'pria') {
            document.querySelector('input[name="editjeniskelamin"][value="pria"]').checked = true;
        } else if (data.jeniskelamin === 'wanita') {
            document.querySelector('input[name="editjeniskelamin"][value="wanita"]').checked = true;
        }
        document.getElementById('edittanggallahir').value = data.tanggallahir;

        //Mengatur button savechange yang ada pada form edit dengan onclick
        //yang akan memanggil fungsi updateRow dengan parameter data.
        document.getElementById('savechange').onclick = function () {
            updateRow(data);
        };
    }
}


//Fungsi untuk melakukan update data Asisten Dosen
async function updateRow(data) {
    //Melakukan pengecekan terhadap seluruh input.
    //jika terdapat salah 1 input yang tidak valid,
    //maka langsung return kosong dan tidak melanjutkan fungsi updateRow
    if (
        !validateInput(document.getElementById('editnama')) ||
        !validateInput(document.getElementById('editnim')) ||
        !validateInput(document.querySelector('input[name="editjeniskelamin"]:checked')) ||
        !validateInput(document.getElementById('edittanggallahir')) ||
        !validateInput(document.getElementById('editemail')) ||
        !validateInput(document.getElementById('editipk'))
    ) {
        return;
    } 

    //mendeklarasikan variabel yang nantinya menjadi nilai baru pada row yang diganti
    const nim = data.nim;
    const editNama = document.getElementById('editnama').value;
    const editNIM = document.getElementById('editnim').value;
    const editJenisKelamin = document.querySelector('input[name="editjeniskelamin"]:checked').value;
    const editTanggalLahir = document.getElementById('edittanggallahir').value;
    const editEmail = document.getElementById('editemail').value;
    const editIPK = document.getElementById('editipk').value;
    const currentBrowser = checkBrowserType();
    const currentIP = await getIPAddress();

    //mendeklarasikan object formdata dan menginputkan variabel yang sudah dideklarasikan
    const formData = new FormData();
    formData.append('nimlama', nim);
    formData.append('editnama', editNama);
    formData.append('editnim', editNIM);
    formData.append('editjeniskelamin', editJenisKelamin);
    formData.append('edittanggallahir', editTanggalLahir);
    formData.append('editemail', editEmail);
    formData.append('editipk', editIPK);
    formData.append('editbrowser', currentBrowser);
    formData.append('editIP', currentIP);


    //membuat object XMLHttpRequest untuk berinteraksi dengan Server
    const xhr = new XMLHttpRequest();

    //Event Handler jika state pada berubah
    xhr.onreadystatechange = function () {
        //Menunggu ketika hingga readystate 4 agar memberi delay pada page
        if (xhr.readyState === 4) {
            //jika response berhasil dengan status 200, melakukan reload page agar tabel dapat diperbarui
            if (xhr.status === 200) {
                window.location.reload();
                alert('Data berhasil diperbarui');
            } else { //Jika gagal, response status bukan 200 dan alert untuk memberitahu gagal memperbarui data
                alert('Gagal memperbarui data');
            }
        }
    };

    //Data yang ada pada local storage akan diubah juga dengan nama baru
    replaceInLocalStorageArray("user_name", data.nama, editNama);

    //melakukan konfigurasi request dengan method POST dan url tujuan data.php dengan action update
    xhr.open('POST', 'data.php?action=update', true);
    //mengirimkan object formData yang sudah dibuat
    xhr.send(formData);
}


//Fungsi untuk menghapus baris yang dipilih
function removeRow(button) {
    //mendapatkan referensi baris dari tombol yang ditekan
    var row = button.parentNode.parentNode;
    //mendapatkan nim sebagai key untuk penghapusan baris
    var nim = row.cells[1].innerText; 

    //melakukan konfirmasi kepada user jika data ingin dihapus
    var confirmRemove = confirm("Apakah anda yakin ingin menghapus data ini?");
    
    //Jika user memilih OK, maka melanjutkan penghapusan data
    if (confirmRemove) {
        //membuat object XMLHttpRequest untuk berinteraksi dengan server
        var xhr = new XMLHttpRequest();
        //Event Handler jika state pada berubah
        xhr.onreadystatechange = function () {
             //Menunggu ketika hingga readystate 4 dan status dari server 200
            if (xhr.readyState === 4 && xhr.status === 200) {
                //Menghapus data pada tabel dan mereload page       
                row.parentNode.removeChild(row);    
                location.reload(true);
                alert("Data berhasil dihapus dari server");
            }
        };


        //membuat URL untuk request GET dengan menambahkan parameter dan action remove
        var url = "data.php?action=remove&nim=" + encodeURIComponent(nim);
        //Menghapus cookie yang disimpan jika data tersebut dihapus
        if (getCookie("user_name") === row.cells[0].innerText) {
            eraseCookie("user_name");
        }
        //Menghapus nama pada local storage
        removeFromLocalStorageArray("user_name", row.cells[0].innerText);
        //mengkonfigurasi request HTTP dengan metode get dan URL yang sudah dibuat
        xhr.open("GET", url, true);
        //mengirim permintaan ke server
        xhr.send();
    }
}

//Fungsi untuk membersihkan seluruh inputan yang sudah diinputkan
//oleh user pada forminput
function ClearInput() {
    document.getElementById('forminput').reset();
}

//Fungsi untuk menyimpan cookie pada browser
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

//Fungsi untuk mendapatkan nilai dari cookie
function getCookie(name) {
    const keyValue = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
    return keyValue ? keyValue[2] : null;
}

//Fungsi untuk menghapus cookie
function eraseCookie(name) {
    //Membuat objek date yang lama
    var expires = new Date(0);

    //Set cookie expire date dengan date yang baru dibuat sehingga cookie
    //terhapus karena sudah melewati waktunya
    document.cookie = `${name}=; expires=${expires.toUTCString()}; path=/;`;
}


//Fungsi untuk menetapkan nilai Local Storage
function setLocalStorageArray(key, values) {
    // Menggunakan JSON.stringify untuk menyimpan array sebagai string
    const serializedValues = JSON.stringify(values);
    localStorage.setItem(key, serializedValues);
}

//Fungsi untuk menambahkan value dari array local storage
function addToLocalStorageArray(key, value) {
    //Mendapatkan array yang sudah ada atau membuat array kosong jika belum ada
    const existingValues = getLocalStorageArray(key) || [];

    //Menambahkan nilai ke dalam array
    existingValues.push(value);

    //Menyimpan array yang diperbarui kembali ke localStorage
    setLocalStorageArray(key, existingValues);
}

//Fungsi untuk mendapatkan localstorage berdasarkan key dan mereturn nilainya
function getLocalStorageArray(key) {
    const storedValues = localStorage.getItem(key);

    if (storedValues) {
        // Menggunakan JSON.parse untuk mendapatkan array dari string yang disimpan
        return JSON.parse(storedValues);
    } else {
        return null;
    }
}

//Fungsi untuk menghapus salah satu value dari array local storage
function removeFromLocalStorageArray(key, value) {
    // Mendapatkan array yang sudah ada atau membuat array kosong jika belum ada
    const existingValues = getLocalStorageArray(key) || [];
  
    // Mencari indeks nilai yang ingin dihapus
    const indexToRemove = existingValues.indexOf(value);
  
    // Hanya melanjutkan jika nilai ditemukan dalam array
    if (indexToRemove !== -1) {
      // Menghapus nilai dari array
      existingValues.splice(indexToRemove, 1);
  
      // Menyimpan array yang diperbarui kembali ke localStorage
      setLocalStorageArray(key, existingValues);
    }
  }

//Fungsi untuk mengganti salah satu value dari array local storage
function replaceInLocalStorageArray(key, oldValue, newValue) {
    //Mendapatkan array yang sudah ada atau membuat array kosong jika belum ada
    const existingValues = getLocalStorageArray(key) || [];

    //Mencari indeks nilai yang ingin diubah
    const indexToReplace = existingValues.indexOf(oldValue);

    //Hanya melanjutkan jika nilai ditemukan dalam array
    if (indexToReplace !== -1) {
        //Mengganti nilai lama dengan nilai baru
        existingValues[indexToReplace] = newValue;

        //Menyimpan array yang diperbarui kembali ke localStorage
        setLocalStorageArray(key, existingValues);
    }
}

//Fungsi untuk mencari apakah suatu value ada pada array local storage
function isValueInLocalStorageArray(key, value) {
    // Mendapatkan array yang sudah ada atau membuat array kosong jika belum ada
    const existingValues = getLocalStorageArray(key) || [];

    // Memeriksa apakah nilai ada dalam array
    return existingValues.includes(value);
}
