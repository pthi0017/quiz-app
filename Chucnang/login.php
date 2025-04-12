<?php
include 'connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

$data = json_decode(file_get_contents("php://input"));

// Kiểm tra xem có dữ liệu không
if (!$data || !isset($data->email) || !isset($data->matkhau)) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu thông tin đăng nhập"
    ]);
    exit;
}

$email = $data->email;
$password = $data->matkhau;

$result = mysqli_query($conn, "SELECT * FROM nguoidung WHERE email='$email'");
$user = mysqli_fetch_assoc($result);

if ($user && password_verify($password, $user['matkhau'])) {
    echo json_encode([
        "success" => true,
        "user" => [
            "id" => $user['id'],
            "hoten" => $user['hoten'],
            "email" => $user['email'],
            "manhomquyen" => $user['manhomquyen']
        ]
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Sai email hoặc mật khẩu"
    ]);
}
?>
