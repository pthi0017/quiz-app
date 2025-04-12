<?php
include 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$user_id = $_GET['user_id'];

$sql = "SELECT kq.makq, dt.ten_de, kq.socaudung, kq.tongcau, kq.ngaythi
        FROM ketqua kq
        JOIN dethi dt ON kq.made = dt.made
        WHERE kq.user_id = $user_id
        ORDER BY kq.ngaythi DESC";

$result = mysqli_query($conn, $sql);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);
?>
