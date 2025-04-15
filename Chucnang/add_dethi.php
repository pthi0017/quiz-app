<?php
include('connect.php'); // Kết nối cơ sở dữ liệu

if (isset($_POST['tende'], $_POST['thoigiantao'], $_POST['thoigianthi'], $_POST['thoigianketthuc'])) {
    $tende = $_POST['tende'];
    $thoigiantao = $_POST['thoigiantao']; // Giả sử thời gian tạo được gửi từ phía client
    $thoigianthi = $_POST['thoigianthi'];
    $thoigianketthuc = $_POST['thoigianketthuc'];
    $trangthai = $_POST['trangthai']; // Giả sử trạng thái được gửi từ phía client

    $sql = "INSERT INTO dethi (tende, thoigiantao, thoigianthi, thoigianketthuc, trangthai) 
            VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssiii", $tende, $thoigiantao, $thoigianthi, $thoigianketthuc, $trangthai);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Đề thi đã được thêm."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Thêm đề thi thất bại."]);
    }

    $stmt->close();
}

$conn->close();
?>

