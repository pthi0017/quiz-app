<?php
include 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'];
$ketqua = $data['ketqua']; // mảng [{ macauhoi, dapan_id, isCorrect }, ...]

$ngay = date("Y-m-d H:i:s");
$socaudung = 0;
$tong = count($ketqua);

foreach ($ketqua as $kq) {
  if ($kq['isCorrect']) $socaudung++;
}

// Lưu tổng kết
$sql = "INSERT INTO ketqua_luyentap (user_id, socaudung, tongcau, ngayluyentap)
        VALUES ($user_id, $socaudung, $tong, '$ngay')";
mysqli_query($conn, $sql);

echo json_encode(["message" => "Đã lưu kết quả", "socaudung" => $socaudung, "tong" => $tong]);
?>
