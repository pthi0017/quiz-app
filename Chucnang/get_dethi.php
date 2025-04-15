<?php

include('connect.php'); // Kết nối cơ sở dữ liệu
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
// Kiểm tra kết nối cơ sở dữ liệu
if ($conn->connect_error) {
    die("Kết nối cơ sở dữ liệu thất bại: " . $conn->connect_error);
}

$sql = "SELECT * FROM dethi"; // Truy vấn lấy tất cả đề thi
$result = $conn->query($sql);

if (!$result) {
    // Kiểm tra lỗi SQL
    die("Lỗi truy vấn: " . $conn->error);
}

$exams = array();
if ($result->num_rows > 0) {
    // Lặp qua kết quả truy vấn và đưa vào mảng $exams
    while ($row = $result->fetch_assoc()) {
        $exams[] = $row;
    }
}

// Trả về dữ liệu dưới dạng JSON
header('Content-Type: application/json');
echo json_encode($exams);
?>
