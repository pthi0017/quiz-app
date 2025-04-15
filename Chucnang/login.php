<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include("connect.php");

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['email']) || !isset($data['matkhau'])) {
        throw new Exception('Thiếu thông tin đăng nhập');
    }

    $email = trim($data['email']);
    $password = trim($data['matkhau']);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Email không hợp lệ');
    }

    $stmt = $conn->prepare("SELECT id, email, hoten, matkhau, manhomquyen, trangthai FROM nguoidung WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if (!$user) {
        throw new Exception('Email không tồn tại');
    }

    if ($user['trangthai'] != 1) {
        throw new Exception('Tài khoản bị vô hiệu hóa');
    }

    if (!password_verify($password, $user['matkhau'])) {
        throw new Exception('Sai mật khẩu');
    }

    unset($user['matkhau']); // bảo mật

    echo json_encode([
        'success' => true,
        'user' => $user
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
} finally {
    $conn->close();
}
?>
