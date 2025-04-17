<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "connect.php";

if (!isset($_GET['mamonhoc']) || !is_numeric($_GET['mamonhoc'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Mã môn học không hợp lệ"]);
    exit;
}

$mamonhoc = (int)$_GET['mamonhoc'];

try {
    // Lấy ngẫu nhiên 20 câu hỏi
    $sql = "SELECT c.macauhoi, c.noidung 
            FROM cauhoi c
            WHERE c.mamonhoc = ? AND c.trangthai = 1
            ORDER BY RAND()
            LIMIT 20";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute([$mamonhoc]);
    $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($questions)) {
        echo json_encode(["success" => false, "error" => "Không có câu hỏi nào"]);
        exit;
    }

    // Lấy câu trả lời cho từng câu hỏi
    foreach ($questions as &$question) {
        $sql = "SELECT macautl, noidungtl, ladapan 
                FROM cautraloi 
                WHERE macauhoi = ?";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute([$question['macauhoi']]);
        $question['answers'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Xáo trộn đáp án
        shuffle($question['answers']);
    }

    echo json_encode([
        "success" => true,
        "questions" => $questions
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Lỗi database: " . $e->getMessage()
    ]);
}
?>