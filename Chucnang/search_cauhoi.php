<?php
include("connect.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$keyword = $_GET['keyword'] ?? '';
$mamonhoc = $_GET['mamonhoc'] ?? '';

$sql = "SELECT * FROM cauhoi WHERE 1";
if ($keyword !== '') {
    $sql .= " AND noidung LIKE '%$keyword%'";
}
if ($mamonhoc !== '') {
    $sql .= " AND mamonhoc = $mamonhoc";
}

$result = mysqli_query($conn, $sql);
$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}
echo json_encode($data);
?>
