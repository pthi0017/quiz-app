<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "connect.php";

try {
    // Improved query with explicit handling of NULLs and count of active exams
    $sql = "SELECT m.mamonhoc, m.tenmonhoc, 
                   COALESCE(COUNT(d.made), 0) AS so_de_thi
            FROM monhoc m
            LEFT JOIN dethi d ON m.mamonhoc = d.monthi AND d.trangthai = 1
            WHERE m.trangthai = 1
            GROUP BY m.mamonhoc";

    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "data" => $subjects
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Database Error: " . $e->getMessage()
    ]);
}
?>
