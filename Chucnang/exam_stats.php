<?php
include("connect.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$keyword = mysqli_real_escape_string($conn, $_GET['keyword'] ?? '');
$subjectId = mysqli_real_escape_string($conn, $_GET['subject'] ?? '');

$query = "SELECT * FROM dethi WHERE 1=1";

// Thêm điều kiện lọc theo từ khóa (tên đề thi)
if (!empty($keyword)) {
    $query .= " AND tende LIKE '%$keyword%'";
}

// Thêm điều kiện lọc theo môn học
if (!empty($subjectId)) {
    $query .= " AND idmon = '$subjectId'";
}

$result = mysqli_query($conn, $query);

$exams = [];
while ($row = mysqli_fetch_assoc($result)) {
    $exams[] = $row;
}

echo json_encode($exams);
?>
