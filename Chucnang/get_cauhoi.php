<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

// Kết nối CSDL
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
    echo json_encode(["success" => false, "message" => "Kết nối CSDL thất bại"]);
    exit;
}

// Truy vấn danh sách câu hỏi
try {
    // Câu truy vấn lấy tất cả câu hỏi từ bảng cauhoi
    $stmt = $pdo->query("SELECT macauhoi, noidung, dokho, mamonhoc, machuong FROM cauhoi");
    $cauhoi = $stmt->fetchAll();

    echo json_encode([
        "success" => true,
        "data" => $cauhoi
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Lỗi truy vấn câu hỏi"
    ]);
}
?>
