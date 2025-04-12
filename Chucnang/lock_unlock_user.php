<?php
include("connect.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
$status = $data['trangthai']; // 0 = bị khóa, 1 = hoạt động

$sql = "UPDATE nguoidung SET trangthai = $status WHERE id = $id";
mysqli_query($conn, $sql);

echo json_encode(["message" => "Cập nhật trạng thái thành công"]);
?>
