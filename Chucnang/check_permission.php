<?php
include '../config.php';

function check_permission($user_id, $function, $action) {
    global $conn;

    $sql = "SELECT cq.* FROM nguoidung nd
            JOIN chitietquyen cq ON nd.manhomquyen = cq.manhomquyen
            WHERE nd.id = ? AND cq.chucnang = ? AND cq.hanhdong = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iss", $user_id, $function, $action);
    $stmt->execute();
    $result = $stmt->get_result();

    return $result->num_rows > 0;
}
?>
