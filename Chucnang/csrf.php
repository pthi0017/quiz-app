<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // hoặc * nếu muốn mở rộng
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Thêm POST vào CORS Methods
header("Access-Control-Allow-Headers: Content-Type, X-CSRF-TOKEN"); // Thêm CSRF Token vào Headers
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
require_once "connect.php";
// Xử lý preflight requests (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

session_start();

// Kiểm tra và tạo CSRF token nếu chưa có
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

echo json_encode([
    'success' => true,
    'token' => $_SESSION['csrf_token']
]);
?>
