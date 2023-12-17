<?php 
session_start()
?>

<html>
    <head>
        <title>Registerasi Asdos Pemweb</title>
        <link rel="stylesheet" href="mainstyle.css">
        <script src="script.js" defer></script>
        <script src="data.php"></script>
    </head>

    <body>
        <!-- container navigasi -->
        <div class="nav-container">
            <h2>Ujian Akhir Semester Pemrograman Web</h2>
            <h2>David Gunawan - 121140062 - RB</h2>
            </div>
        </div>
        <!-- containter teks info -->
        <div class="info-container">
            <h1 id="info1">Form Registrasi Asisten Dosen Pemrograman Web</h1>
            <h1 id="info2">Data Server</h1>
        </div>
        <!-- container utama yang berisikan input dan output container -->
        <div class="main-container">
            <div class="input-container">
                <form id="forminput" method="POST" action="data.php">
                    <label for="nama"> Nama <br>
                        <input type="text" id="nama" name="nama" required>
                    </label>
    
                    <label for="nim">NIM <br>
                        <input type="number" id="nim" name="nim" required>
                    </label>
    
                    <label for="jeniskelamin">Jenis kelamin <br>
                        <input type="radio" name="jeniskelamin" id="jeniskelamin" value="pria">Pria <br>
                        <input type="radio" name="jeniskelamin" id="jeniskelamin" value="wanita">Wanita
                    </label>
    
                    <label for="tanggallahir">Tanggal Lahir <br> 
                        <input type="date" name="tanggallahir" id="tanggallahir">
                    </label>
                    
                    <label for="email">Email <br>
                        <input type="email" name="email" id="email" required>
                    </label>

                    <label for="ipk">IPK : <br>
                        <input type="number" id="ipk" name="ipk" required>
                    </label>
                    <div class="button-container">
                        <button type="button" value="submit" onclick="SubmitData()">Submit</button>
                        <button type="button" value="clearinput" onclick="ClearInput()">Clear Input</button> 
                    </div>
                </form>
            </div>
    
            <div class="output-container">
            <table id="dataTable">
                <thead>
                <tr>
                    <th>Nama</th>
                    <th>NIM</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <!-- script php yang digunakan untuk mengambil data dari database -->
                <?php
                    include 'data.php';
                    $data = Asdos::AmbilDataAsdos();
                    foreach ($data as $row) {
                        echo '<tr>';
                        echo '<td>' . $row['nama'] . '</td>';
                        echo '<td>' . $row['nim'] . '</td>';
                        echo '<td><button class="action-button" onclick="showDetail(this)" data-row="' . htmlentities(json_encode($row)) . '">Detail</button> <button class="action-button" onclick="removeRow(this)">Remove</button></td>';                            echo '</tr>';
                    }
                    ?>
                </tbody>
            </table>
            </div>
        </div>
        <!-- container untuk bagian detail user dan edit user -->
        <div class="profilecontainer">
            <div id="detailContainer" class="detail-container"></div>
            <div class="edit-field">
                <h2>Edit Data</h2>
                <form id="formedit" method="POST" action="data.php">
                        <label for="editnama"> Nama <br>
                            <input type="text" id="editnama" name="editnama" required>
                        </label>
        
                        <label for="editnim">NIM <br>
                            <input type="number" id="editnim" name="editnim" required>
                        </label>
        
                        <label for="editjeniskelamin">Jenis kelamin <br>
                            <input type="radio" name="editjeniskelamin" id="editjeniskelamin" value="pria">Pria <br>
                            <input type="radio" name="editjeniskelamin" id="editjeniskelamin" value="wanita">Wanita
                        </label>
        
                        <label for="edittanggallahir">Tanggal Lahir <br> 
                            <input type="date" name="edittanggallahir" id="edittanggallahir">
                        </label>
                        
                        <label for="editemail"> Email <br>
                            <input type="text" name="editemail" id="editemail" required>
                        </label>

                        <label for="editipk">IPK : <br>
                            <input type="number" id="editipk" name="editipk">
                        </label>
                        <button id="savechange" type="button" value="submit" class="action-button">Save Changes</button>
                    </form>
            </div>
        </div>
    </body>
    <footer>
        <h3>David Gunawan - 121140062 © 2023</h3>
    </footer>
</html>