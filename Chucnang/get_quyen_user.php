<?php
include("connect.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$manhomquyen = $_GET['manhomquyen'] ?? null;

if (!$manhomquyen) {
    echo json_encode(["error" => "Thiếu mã nhóm quyền"]);
    exit;
}

$sql = "SELECT * FROM chitietquyen WHERE manhomquyen = $manhomquyen";
$result = mysqli_query($conn, $sql);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}
echo json_encode($data);
?>
