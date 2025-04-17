<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, X-CSRF-TOKEN"); 
header("Access-Control-Allow-Credentials: true"); 
header("Content-Type: application/json; charset=UTF-8");
require_once "connect.php";
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

session_start();

// Kiểm tra CSRF token
$csrfToken = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
if (!$csrfToken || $csrfToken !== $_SESSION['csrf_token']) {
    echo json_encode(['success' => false, 'message' => 'CSRF token không hợp lệ']);
    exit;
}

// Kiểm tra dữ liệu từ client
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Kiểm tra lỗi JSON
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['success' => false, 'message' => 'Dữ liệu đầu vào không hợp lệ']);
    exit;
}

// Tiến hành các bước đăng nhập, ví dụ kiểm tra email và mật khẩu
$email = trim($data['email'] ?? '');
$password = trim($data['matkhau'] ?? '');

// Kiểm tra email và mật khẩu trong cơ sở dữ liệu
try {
    // Kết nối cơ sở dữ liệu
    $conn = new PDO('mysql:host=localhost;dbname=tracnghiemonline', 'root', '');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $conn->prepare("SELECT * FROM nguoidung WHERE email = :email LIMIT 1");
    $stmt->execute([':email' => $email]);

    if ($stmt->rowCount() === 0) {
        echo json_encode(['success' => false, 'message' => 'Tài khoản không tồn tại']);
        exit;
    }

    $user = $stmt->fetch();

    if (!password_verify($password, $user['matkhau'])) {
        echo json_encode(['success' => false, 'message' => 'Mật khẩu không đúng']);
        exit;
    }

    // Kiểm tra trạng thái tài khoản
    if ($user['trangthai'] !== 1) {
        echo json_encode(['success' => false, 'message' => 'Tài khoản của bạn bị khóa']);
        exit;
    }

    echo json_encode([
        'success' => true,
        'message' => 'Đăng nhập thành công',
        'user' => [
            'id' => $user['id'],
            'email' => $user['email'],
            'hoten' => $user['hoten'],
            'manhomquyen' => $user['manhomquyen']
        ]
    ]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Lỗi kết nối cơ sở dữ liệu: ' . $e->getMessage()]);
}
?>
