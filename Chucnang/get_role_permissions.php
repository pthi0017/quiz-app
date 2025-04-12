<?php
include '../config.php';

$manhomquyen = $_GET['manhomquyen'];
$sql = "SELECT * FROM chitietquyen WHERE manhomquyen = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $manhomquyen);
$stmt->execute();
$result = $stmt->get_result();

$permissions = [];
while ($row = $result->fetch_assoc()) {
    $permissions[] = $row;
}

echo json_encode($permissions);
?>
