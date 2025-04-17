<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

$host = "localhost";
$username = "root";
$password = "";
$database = "tracnghiemonline";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$database;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Kết nối CSDL thất bại: " . $e->getMessage()]);
    exit;
}

try {
    $stmt = $pdo->query("SELECT * FROM monhoc");
    $monhoc = $stmt->fetchAll();

    echo json_encode([
        "success" => true,
        "data" => $monhoc // Đảm bảo trường 'data' chứa danh sách môn học
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Lỗi truy vấn môn học: " . $e->getMessage()
    ]);
}
?>
