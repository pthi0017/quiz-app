<?php
include '../config.php';

$data = json_decode(file_get_contents("php://input"), true);
$manhomquyen = $data['manhomquyen'];
$permissions = $data['permissions'];

// Xóa quyền cũ
$conn->query("DELETE FROM chitietquyen WHERE manhomquyen = $manhomquyen");

// Lưu quyền mới
$stmt = $conn->prepare("INSERT INTO chitietquyen (manhomquyen, chucnang, hanhdong) VALUES (?, ?, ?)");

foreach ($permissions as $perm) {
    $stmt->bind_param("iss", $manhomquyen, $perm['chucnang'], $perm['hanhdong']);
    $stmt->execute();
}

echo json_encode(["success" => true]);
?>
