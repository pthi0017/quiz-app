<?php
include 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$data = json_decode(file_get_contents("php://input"), true);

$noidung = mysqli_real_escape_string($conn, $data['noidung']);
$mamonhoc = (int)$data['mamonhoc'];
$machuong = (int)$data['machuong'];
$mucdo = mysqli_real_escape_string($conn, $data['mucdo']);
$dapan = $data['dapan']; // Mảng [{noidungtl, ladapan}]

$sql_cauhoi = "INSERT INTO cauhoi (noidung, mamonhoc, machuong, mucdo)
               VALUES ('$noidung', $mamonhoc, $machuong, '$mucdo')";
if (mysqli_query($conn, $sql_cauhoi)) {
    $macauhoi = mysqli_insert_id($conn);

    foreach ($dapan as $dp) {
        $nd = mysqli_real_escape_string($conn, $dp['noidungtl']);
        $ladapan = $dp['ladapan'] ? 1 : 0;
        $sql_dapan = "INSERT INTO cautraloi (macauhoi, noidungtl, ladapan)
                      VALUES ($macauhoi, '$nd', $ladapan)";
        mysqli_query($conn, $sql_dapan);
    }

    echo json_encode(["message" => "Thêm câu hỏi thành công"]);
} else {
    echo json_encode(["error" => "Lỗi khi thêm câu hỏi"]);
}
?>
