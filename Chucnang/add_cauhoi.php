<?php

include('connect.php'); // Kết nối cơ sở dữ liệu
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
if (isset($_POST['noidung'], $_POST['dokho'], $_POST['mamonhoc'], $_POST['machuong'])) {
    $noidung = $_POST['noidung'];
    $dokho = $_POST['dokho'];
    $mamonhoc = $_POST['mamonhoc'];
    $machuong = $_POST['machuong'];
    $nguoitao = $_POST['nguoitao']; // Giả sử nguoitao được gửi từ phía client

    $sql = "INSERT INTO macauhoi (noidung, dokho, mamonhoc, machuong, nguoitao) 
            VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("siiss", $noidung, $dokho, $mamonhoc, $machuong, $nguoitao);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Câu hỏi đã được thêm."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Thêm câu hỏi thất bại."]);
    }

    $stmt->close();
}

$conn->close();
?>
