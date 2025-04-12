<?php
include 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$username = $_POST['username'];
$password = $_POST['password'];
$hoten = $_POST['hoten'];
$vaitro = $_POST['vaitro']; // 1: admin, 2: sinh viên

$sql = "INSERT INTO NGUOIDUNG (username, password, hoten, vaitro) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $username, $password, $hoten, $vaitro);

if ($stmt->execute()) {
    echo "Thêm người dùng thành công";
} else {
    echo "Lỗi: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
