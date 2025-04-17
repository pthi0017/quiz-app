<?php
include("connect.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$data = json_decode(file_get_contents("php://input"));

$keyword = mysqli_real_escape_string($conn, $data->keyword ?? '');
$subjectId = mysqli_real_escape_string($conn, $data->subjectId ?? '');

$query = "SELECT * FROM cauhoi WHERE 1=1";

if (!empty($keyword)) {
    $query .= " AND noidung LIKE '%$keyword%'";
}
if (!empty($subjectId)) {
    $query .= " AND idmon = '$subjectId'";
}

$result = mysqli_query($conn, $query);

$questions = [];
while ($row = mysqli_fetch_assoc($result)) {
    $questions[] = $row;
}

echo json_encode($questions);
?>
