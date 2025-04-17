<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");

// Check if user is logged in and has teacher role
if (!isset($_SESSION['user_id']) {
    echo json_encode(["status" => "error", "message" => "Unauthorized access"]);
    exit;
}

include('connect.php');

// Get input data
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
$required_fields = ['noidung', 'dokho', 'mamonhoc', 'machuong'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        echo json_encode(["status" => "error", "message" => "Field $field is required"]);
        exit;
    }
}

// Sanitize and validate data
$noidung = trim($data['noidung']);
$dokho = intval($data['dokho']);
$mamonhoc = $data['mamonhoc'];
$machuong = $data['machuong'];
$nguoitao = $_SESSION['user_id'];

// Additional validation
if (strlen($noidung) < 10) {
    echo json_encode(["status" => "error", "message" => "Question content too short"]);
    exit;
}

if ($dokho < 1 || $dokho > 5) {
    echo json_encode(["status" => "error", "message" => "Difficulty must be between 1-5"]);
    exit;
}

try {
    // Check if subject exists
    $stmt = $conn->prepare("SELECT mamonhoc FROM monhoc WHERE mamonhoc = ?");
    $stmt->bind_param("s", $mamonhoc);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows === 0) {
        echo json_encode(["status" => "error", "message" => "Invalid subject"]);
        exit;
    }
    $stmt->close();

    // Check if chapter exists for this subject
    $stmt = $conn->prepare("SELECT machuong FROM chuong WHERE machuong = ? AND mamonhoc = ?");
    $stmt->bind_param("ss", $machuong, $mamonhoc);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows === 0) {
        echo json_encode(["status" => "error", "message" => "Invalid chapter for selected subject"]);
        exit;
    }
    $stmt->close();

    // Insert question
    $sql = "INSERT INTO macauhoi (noidung, dokho, mamonhoc, machuong, nguoitao) 
            VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    
    if ($stmt === false) {
        echo json_encode(["status" => "error", "message" => "Failed to prepare statement"]);
        exit;
    }

    $stmt->bind_param("siiss", $noidung, $dokho, $mamonhoc, $machuong, $nguoitao);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success", 
            "message" => "Question added successfully",
            "question_id" => $stmt->insert_id
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to add question: " . $stmt->error]);
    }

    $stmt->close();
} catch (Exception $e) {
    error_log("Database error: " . $e->getMessage());
    echo json_encode(["status" => "error", "message" => "Database error occurred"]);
}

$conn->close();
?>