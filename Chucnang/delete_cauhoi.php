<?php
// Chucnang/delete_cauhoi.php
include 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$data = json_decode(file_get_contents("php://input"));
$sql = "DELETE FROM cauhoi WHERE macauhoi = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$data->macauhoi]);
echo json_encode(["success" => true]);

?>