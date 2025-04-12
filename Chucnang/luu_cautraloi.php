<?php
include 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$makq = $_POST['makq'];
$macauhoi = $_POST['macauhoi'];
$dapanchon = $_POST['dapanchon']; // id của đáp án được chọn (macautl)

// Lưu vào bảng chi tiết kết quả
$sql = "INSERT INTO CHITIETKETQUA (makq, macauhoi, dapanchon) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iii", $makq, $macauhoi, $dapanchon);

if ($stmt->execute()) {
    echo "Lưu thành công";
} else {
    echo "Lỗi: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
