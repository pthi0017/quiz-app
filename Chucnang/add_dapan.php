<?php

include 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$data = json_decode(file_get_contents("php://input"));

$cauhoi_id = $data->cauhoi_id;
$dapan_list = $data->dapan_list; // danh sách các đáp án [{noidung, is_correct}]

foreach ($dapan_list as $dap) {
    $nd = $dap->noidung;
    $is_correct = $dap->is_correct ? 1 : 0;

    $sql = "INSERT INTO dapan (cauhoi_id, noidung, is_correct)
            VALUES ($cauhoi_id, '$nd', $is_correct)";
    mysqli_query($conn, $sql);
}

echo json_encode(["success" => true]);
?>
