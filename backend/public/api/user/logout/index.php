<?php
require_once __DIR__ . '/../../../../controllers/UserController.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $controller = new UserController();
    $controller->logout();
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
}
?>
