<?php
$host = 'localhost';
$db = 'thi_trac_nghiem';
$user = 'root';
$pass = ''; // hoặc mật khẩu nếu có

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}
?>
