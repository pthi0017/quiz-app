<?php
include '../config.php';

$sql = "SELECT * FROM nhomquyen";
$result = $conn->query($sql);
$roles = [];

while ($row = $result->fetch_assoc()) {
    $roles[] = $row;
}

echo json_encode($roles);
?>
