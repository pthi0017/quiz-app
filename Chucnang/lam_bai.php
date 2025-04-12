<?php
include 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$manguoidung = $_POST['manguoidung'];
$made = $_POST['made'];
$diemthi = $_POST['diemthi'];
$solancu = $_POST['solancu'];

$thoigianvao = date("Y-m-d H:i:s");
$thoiganlambai = $_POST['thoiganlambai']; // số phút làm bài
$sochuyentab = $_POST['sochuyentab'];

$sql = "INSERT INTO KETQUA (made, manguoidung, diemthi, thoigianvao, thoiganlambai, socaudung, solanchuyentab)
        VALUES (?, ?, ?, ?, ?, 0, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("isdssi", $made, $manguoidung, $diemthi, $thoigianvao, $thoiganlambai, $sochuyentab);

if ($stmt->execute()) {
    echo "Lưu kết quả bài thi thành công!";
} else {
    echo "Lỗi khi lưu kết quả: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
