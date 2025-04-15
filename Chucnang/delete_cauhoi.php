<?php
include('connect'); // Kết nối cơ sở dữ liệu
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
if (isset($_GET['id'])) {
    $id = $_GET['id']; // Lấy ID câu hỏi từ tham số GET

    $sql = "DELETE FROM macauhoi WHERE macauhoi = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Câu hỏi đã được xóa."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Xóa câu hỏi thất bại."]);
    }

    $stmt->close();
}

$conn->close();
?>
