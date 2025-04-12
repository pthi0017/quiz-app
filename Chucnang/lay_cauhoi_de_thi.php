<?php
include 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$made = $_GET['made'];

$sql = "SELECT ch.macauhoi, ch.noidung, dapan.madapan, dapan.noidung AS noidung_dapan 
        FROM chitiet_dethi cd
        JOIN cauhoi ch ON cd.macauhoi = ch.macauhoi
        JOIN dapan ON ch.macauhoi = dapan.macauhoi
        WHERE cd.made = $made";

$result = mysqli_query($conn, $sql);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $macauhoi = $row['macauhoi'];
    if (!isset($data[$macauhoi])) {
        $data[$macauhoi] = [
            "macauhoi" => $macauhoi,
            "noidung" => $row['noidung'],
            "dapan" => []
        ];
    }
    $data[$macauhoi]['dapan'][] = [
        "madapan" => $row['madapan'],
        "noidung" => $row['noidung_dapan']
    ];
}

echo json_encode(array_values($data));
?>
