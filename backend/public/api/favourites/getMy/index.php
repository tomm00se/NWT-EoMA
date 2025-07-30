<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../../../../controllers/FavouriteController.php';

$favController = new FavouriteController();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $favController->getFavouritesByUser();
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed"]);
}
