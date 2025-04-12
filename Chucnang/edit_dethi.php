<?php
// Chucnang/edit_dethi.php
include 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$data = json_decode(file_get_contents("php://input"));
$sql = "UPDATE dethi SET tende=?, thoigianthi=?, thoigianbatdau=?, thoigianketthuc=? WHERE made=?";
$stmt = $conn->prepare($sql);
$stmt->execute([$data->tende, $data->thoigianthi, $data->thoigianbatdau, $data->thoigianketthuc, $data->made]);
echo json_encode(["success" => true]);

?>