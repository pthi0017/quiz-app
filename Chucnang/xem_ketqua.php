<?php
// xem_ketqua.php
header('Content-Type: application/json');

// Include necessary database connection and functions
include_once 'connection.php'; // Update with actual file path if needed

// Get the exam ID and user ID from the request (these might come from POST/GET)
$mamonhoc = isset($_GET['mamonhoc']) ? $_GET['mamonhoc'] : 0;
$userid = isset($_GET['userid']) ? $_GET['userid'] : 0;

if ($mamonhoc && $userid) {
    // Get the total score and correct answers from the database
    $query = "SELECT * FROM ketqua WHERE mamonhoc = ? AND userid = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $mamonhoc, $userid);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_assoc();

    if ($data) {
        // Return the result data as JSON
        echo json_encode([
            'success' => true,
            'score' => $data['score'],
            'correct_answers' => $data['correct_answers'],
            'total_questions' => $data['total_questions'],
            'subject_name' => $data['subject_name']
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Kết quả không tìm thấy.'
        ]);
    }

    $stmt->close();
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Thông tin không đầy đủ.'
    ]);
}

$conn->close();
?>
