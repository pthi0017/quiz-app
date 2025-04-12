<?php
include 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$user_id = $_GET['user_id'];

$sql = "SELECT k.*, m.tenmon
        FROM ketqua_luyentap k
        JOIN monhoc m ON k.mamonhoc = m.mamonhoc
        WHERE k.user_id = $user_id
        ORDER BY ngayluyentap DESC";

$result = mysqli_query($conn, $sql);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = [
        "tenmon" => $row['tenmon'],
        "socaudung" => $row['socaudung'],
        "tongcau" => $row['tongcau'],
        "diem" => $row['diem'],
        "ngayluyentap" => $row['ngayluyentap']
    ];
}

echo json_encode($data);
?>
