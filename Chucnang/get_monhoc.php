<?php
include 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$sql = "SELECT * FROM MONHOC";
$result = $conn->query($sql);

$monhocs = array();
while ($row = $result->fetch_assoc()) {
    $monhocs[] = $row;
}

echo json_encode($monhocs);
$conn->close();
?>
