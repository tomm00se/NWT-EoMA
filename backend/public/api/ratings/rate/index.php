<?php
require_once __DIR__ . '/../../../../controllers/RatingController.php';

$controller = new RatingController();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $controller->rateRecipe();
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
}
