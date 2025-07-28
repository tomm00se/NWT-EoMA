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
        $this->checkSession();
        echo json_encode($this->service->getAllRecipes());
    }

    //Luis commented because duplicated, we can use only the full
    // public function getRecipeByName($name) {
    //     $this->checkSession();
        
    //     $validation = $this->validateRecipeName($name);
    //     if (!$validation['valid']) {
    //         http_response_code(400);
    //         echo json_encode(['error' => $validation['error']]);
    //         return;
    //     }

    //     $recipes = $this->recipeModel->fetchRecipeByName($name);
    //     if ($recipes && count($recipes) > 0) {
    //         echo json_encode($recipes);
    //     } else {
    //         http_response_code(404);
    //         echo json_encode(['error' => 'No recipes found.']);
    //     }
    // }

    //Luis changed the name of the function to better reflect what it does
    public function getRecipeById($id) {
        $this->checkSession();

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

    public function createRecipe() {
        $this->checkSession();

        $input = json_decode(file_get_contents("php://input"), true);

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