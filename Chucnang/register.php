<?php
include("connect.php");

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");


$data = json_decode(file_get_contents("php://input"), true);

// Kiểm tra nếu dữ liệu không hợp lệ
if (!$data) {
    echo json_encode(['status' => 'error', 'message' => 'Không nhận được dữ liệu']);
    exit;
}

// Lấy dữ liệu
$email = $data['email'] ?? '';
$hoten = $data['hoten'] ?? '';
$matkhau = $data['matkhau'] ?? '';
$ngaysinh = $data['ngaysinh'] ?? null;
$gioitinh = $data['gioitinh'] ?? null;
$sodienthoai = $data['sodienthoai'] ?? '';
$ngaythamgia = date("Y-m-d");

if (!$email || !$hoten || !$matkhau) {
    echo json_encode(['status' => 'error', 'message' => 'Thiếu thông tin bắt buộc']);
    exit;
}

// Hash mật khẩu
$hashedPassword = password_hash($matkhau, PASSWORD_DEFAULT);

// Kiểm tra email đã tồn tại chưa
$check = mysqli_query($conn, "SELECT * FROM nguoidung WHERE email='$email'");
if (mysqli_num_rows($check) > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Email đã tồn tại']);
    exit;
}

// Thêm người dùng mới
$sql = "INSERT INTO nguoidung (email, hoten, matkhau, ngaysinh, gioitinh, sodienthoai, ngaythamgia, trangthai, manhomquyen) 
        VALUES ('$email', '$hoten', '$hashedPassword', '$ngaysinh', '$gioitinh', '$sodienthoai', '$ngaythamgia', 1, 2)";

if (mysqli_query($conn, $sql)) {
    echo json_encode(['status' => 'success', 'message' => 'Đăng ký thành công']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Lỗi đăng ký: ' . mysqli_error($conn)]);
}
?>
