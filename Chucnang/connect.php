<?php
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$username = "root";
$password = "";
$database = "tracnghiemonline";

$conn = new mysqli($host, $username, $password, $database);

// ✅ Kiểm tra kết nối và trả về lỗi JSON nếu thất bại
if ($conn->connect_error) {
    http_response_code(500); // mã lỗi server
    echo json_encode([
        "success" => false,
        "message" => "Kết nối cơ sở dữ liệu thất bại: " . $conn->connect_error
    ]);
    exit;
}
?>
