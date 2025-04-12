<?php
include 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$mamonhoc = $_GET['mamonhoc'];
$machuong = $_GET['machuong'] ?? null;
$socau = $_GET['socau'] ?? 10;

$query = "SELECT * FROM cauhoi WHERE mamonhoc = $mamonhoc";

if ($machuong) {
  $query .= " AND machuong = $machuong";
}

$query .= " ORDER BY RAND() LIMIT $socau";
$result = mysqli_query($conn, $query);

$cauhoi = [];

while ($row = mysqli_fetch_assoc($result)) {
  $macauhoi = $row['macauhoi'];

  $res_dapan = mysqli_query($conn, "SELECT * FROM cautraloi WHERE macauhoi = $macauhoi");
  $dapan = [];

  while ($dp = mysqli_fetch_assoc($res_dapan)) {
    $dapan[] = $dp;
  }

  $row['dapan'] = $dapan;
  $cauhoi[] = $row;
}

echo json_encode($cauhoi);
?>
