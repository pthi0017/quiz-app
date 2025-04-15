<?php
include('connect.php'); // Kết nối cơ sở dữ liệu
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

if (isset($_GET['id'])) {
    $id = $_GET['id']; // Lấy ID đề thi từ tham số GET

    $sql = "DELETE FROM dethi WHERE madethi = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Đề thi đã được xóa."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Xóa đề thi thất bại."]);
    }

    $stmt->close();
}

$conn->close();
?>
