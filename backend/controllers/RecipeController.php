<?php
require_once __DIR__ . '/../services/RecipeService.php';


class RecipeController {

    private $service;

    public function __construct() {
        if (session_status() === PHP_SESSION_NONE) session_start();
        $this->service = new RecipeService();
        header('Content-Type: application/json');
    }

    public function getAllRecipes() {
        echo json_encode($this->service->getAllRecipes());
    }

    public function getRecipeById($id) {

        if (!is_numeric($id)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid recipe ID.']);
            return;
        }
        
        $recipe = $this->service->getFullRecipe($id);
        if ($recipe) {
            echo json_encode($recipe);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Recipe not found.']);
        }
    }

    public function getRecipeByName($name) {
        try {
            $recipes = $this->service->getRecipeByName($name);
            if ($recipes) {
                echo json_encode($recipes);
            } else {
                http_response_code(404);
                echo json_encode(["message" => "No recipe found with that name."]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => "Server error: " . $e->getMessage()]);
        }
    }

    
    public function getMyRecipes() {
        $this->checkSession();
        $recipes = $this->service->getRecipesByUser($_SESSION['user_id']);
        echo json_encode($recipes);
    }

    public function createRecipe() {
    $this->checkSession();

    $input = json_decode(file_get_contents("php://input"), true);

    // Validate required fields
    $requiredFields = ['title', 'description', 'ingredients', 'steps', 'categories', 'total_time'];
    foreach ($requiredFields as $field) {
        if (!isset($input[$field]) || empty($input[$field])) {
            http_response_code(400);
            echo json_encode(['error' => "Missing or empty field: $field"]);
            return;
        }
    }

    // Validate total_time is a positive number
    if (!is_numeric($input['total_time']) || $input['total_time'] <= 0) {
        http_response_code(400);
        echo json_encode(['error' => "Total time must be a positive number."]);
        return;
    }

    try {
        $recipeId = $this->service->createRecipe($input, $_SESSION['user_id']);
        http_response_code(201);
        echo json_encode(['message' => 'Recipe created', 'recipe_id' => $recipeId]);
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode(['error' => $e->getMessage()]);
    }
    }

    
    public function updateRecipe($id) {
        $this->checkSession();

        if (!is_numeric($id)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid recipe ID']);
            return;
        }

        $input = json_decode(file_get_contents("php://input"), true);

        try {
            $this->service->updateRecipe($id, $input, $_SESSION['user_id']);
            echo json_encode(['message' => 'Recipe updated']);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function deleteRecipe($id) {
        $this->checkSession();

        if (!is_numeric($id)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid recipe ID']);
            return;
        }

        try {
            $this->service->deleteRecipe($id, $_SESSION['user_id']);
            echo json_encode(['message' => 'Recipe deleted']);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    private function checkSession() {
        if (!isset($_SESSION['user_id'])) {
            http_response_code(403);
            echo json_encode(["error" => "Unauthorized"]);
            exit;
        }
    }

    private function validateRecipeName($name) {
        if (empty($name)) {
            return ['valid' => false, 'error' => 'Recipe name is required.'];
        }
        if (strlen($name) < 1 || strlen($name) > 60) {
            return ['valid' => false, 'error' => 'Recipe name must be between 1 and 60 characters.'];
        }
        return ['valid' => true];
    }
}
?>