<?php
// Chucnang/delete_dethi.php
include 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$data = json_decode(file_get_contents("php://input"));
$sql = "DELETE FROM dethi WHERE made = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$data->made]);
echo json_encode(["success" => true]);

?>