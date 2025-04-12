<?php
include 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$data = json_decode(file_get_contents("php://input"), true);
$ten_de = $data['ten_de'];
$mamonhoc = $data['mamonhoc'];
$so_cauhoi = $data['so_cauhoi'];

$date = date('Y-m-d H:i:s');

// Tạo đề thi
$sql = "INSERT INTO dethi (ten_de, mamonhoc, ngaytao, so_cauhoi) 
        VALUES ('$ten_de', $mamonhoc, '$date', $so_cauhoi)";
mysqli_query($conn, $sql);
$made = mysqli_insert_id($conn);

// Lấy ngẫu nhiên câu hỏi từ môn học
$sql_get = "SELECT macauhoi FROM cauhoi 
            WHERE mamonhoc = $mamonhoc 
            ORDER BY RAND() LIMIT $so_cauhoi";
$result = mysqli_query($conn, $sql_get);

// Gán câu hỏi vào đề thi
while ($row = mysqli_fetch_assoc($result)) {
    $macauhoi = $row['macauhoi'];
    mysqli_query($conn, "INSERT INTO chitiet_dethi (made, macauhoi) VALUES ($made, $macauhoi)");
}

echo json_encode(["status" => "success", "made" => $made]);
?>
