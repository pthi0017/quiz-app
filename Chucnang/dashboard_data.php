<?php
include("connect.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$users = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) AS total FROM nguoidung"))['total'];
$cauhoi = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) AS total FROM cauhoi"))['total'];
$dethi = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) AS total FROM dethi"))['total'];

$top = mysqli_query($conn, "SELECT manguoidung, diemthi FROM ketqua ORDER BY diemthi DESC LIMIT 5");
$topUsers = [];
while ($row = mysqli_fetch_assoc($top)) {
    $topUsers[] = $row;
}

echo json_encode([
    "users" => $users,
    "cauhoi" => $cauhoi,
    "dethi" => $dethi,
    "topUsers" => $topUsers
]);
?>
