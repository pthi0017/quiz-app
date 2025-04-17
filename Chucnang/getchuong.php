<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

include('connect.php');

if (!isset($_GET['mamonhoc'])) {
    echo json_encode([]);
    exit;
}

$mamonhoc = $conn->real_escape_string($_GET['mamonhoc']);

$sql = "SELECT machuong, tenchuong FROM chuong WHERE mamonhoc = '$mamonhoc' ORDER BY tenchuong";
$result = $conn->query($sql);

$chapters = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $chapters[] = $row;
    }
}

echo json_encode($chapters);
$conn->close();
?>