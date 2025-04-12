<?php
// Chucnang/thongke_ketqua.php
include 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$sql = "SELECT manguoidung, COUNT(*) as solanthi, AVG(diemthi) as diemtrungbinh 
        FROM ketqua GROUP BY manguoidung";
$result = $conn->query($sql);
$data = $result->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);

?>