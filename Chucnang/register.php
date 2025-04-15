<?php
// Cho phép truy cập từ React frontend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Trả về sớm nếu là preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

// Kết nối database
$conn = new mysqli("localhost", "root", "", "tracnghiemonline");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Kết nối database thất bại"]);
    exit();
}

// Lấy dữ liệu từ JSON gửi lên
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['email'], $data['hoten'], $data['matkhau'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Dữ liệu không hợp lệ hoặc thiếu"]);
    exit();
}

// Chuẩn hóa dữ liệu
$id = uniqid(); // Tạo ID duy nhất
$email = $conn->real_escape_string($data['email']);
$hoten = $conn->real_escape_string($data['hoten']);
$matkhau = password_hash($data['matkhau'], PASSWORD_BCRYPT);
$ngaysinh = $conn->real_escape_string($data['ngaysinh'] ?? "1990-01-01"); // fallback nếu rỗng
$gioitinh = isset($data['gioitinh']) ? intval($data['gioitinh']) : "NULL";
$sodienthoai = $conn->real_escape_string($data['sodienthoai'] ?? "");
$manhomquyen = intval($data['manhomquyen'] ?? 2);
$trangthai = intval($data['trangthai'] ?? 1);
$ngaythamgia = date('Y-m-d H:i:s');

// Kiểm tra email trùng
$sql_check = "SELECT id FROM nguoidung WHERE email = '$email'";
$result = $conn->query($sql_check);
if ($result && $result->num_rows > 0) {
    http_response_code(409); // Conflict
    echo json_encode(["status" => "error", "message" => "Email đã tồn tại"]);
    exit();
}

// Câu lệnh insert
$sql_insert = "INSERT INTO nguoidung (
    id, email, hoten, matkhau, ngaysinh, gioitinh, sodienthoai,
    manhomquyen, trangthai, ngaythamgia
) VALUES (
    '$id', '$email', '$hoten', '$matkhau', '$ngaysinh', $gioitinh,
    '$sodienthoai', $manhomquyen, $trangthai, '$ngaythamgia'
)";

// Thực hiện insert
if ($conn->query($sql_insert) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Đăng ký thành công"]);
} else {
    http_response_code(500);
    echo json_encode([ 
        "status" => "error", 
        "message" => "Lỗi khi thêm người dùng: " . $conn->error,
        "sql" => $sql_insert // Có thể xóa dòng này nếu không cần debug
    ]);
}

$conn->close();
?>
