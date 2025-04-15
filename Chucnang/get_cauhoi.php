<?php
include('connect.php'); // Kết nối cơ sở dữ liệu
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$sql = "SELECT * FROM cauhoi"; // Truy vấn lấy tất cả câu hỏi
$result = $conn->query($sql);

$questions = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $questions[] = $row;
    }
}

echo json_encode($questions); // Trả về dữ liệu dưới dạng JSON
?>
