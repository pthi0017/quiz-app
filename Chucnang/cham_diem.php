<?php
include 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'];
$made = $data['made'];
$answers = $data['answers']; // array of { macauhoi, madapan }

$correct = 0;
$total = count($answers);

foreach ($answers as $ans) {
    $macauhoi = $ans['macauhoi'];
    $madapan = $ans['madapan'];

    $check = "SELECT * FROM dapan WHERE macauhoi = $macauhoi AND madapan = $madapan AND is_dapan_dung = 1";
    $res = mysqli_query($conn, $check);
    if (mysqli_num_rows($res) > 0) {
        $correct++;
    }
}

$date = date("Y-m-d H:i:s");
$sql_save = "INSERT INTO ketqua (made, user_id, socaudung, tongcau, ngaythi) 
             VALUES ($made, $user_id, $correct, $total, '$date')";
mysqli_query($conn, $sql_save);

echo json_encode(["correct" => $correct, "total" => $total]);
?>
