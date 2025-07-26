<?php
require_once __DIR__ . '/../config/config.php';

class RecipeModel {
    private $db;

    public function __construct() {
        $config = new Config();
        $this->db = $config->getPDO();
    }

    public function fetchAllRecipes() {
        $stmt = $this->db->prepare("SELECT * FROM recipes");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function fetchRecipeById($id) {
        $stmt = $this->db->prepare("SELECT * FROM recipes WHERE recipe_id = ? LIMIT 1");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function fetchRecipeByName($name) {
        $stmt = $this->db->prepare("SELECT * FROM recipes WHERE title LIKE ?");
        $stmt->execute(['%' . $name . '%']);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function fetchFullRecipe($id) {
        // Get main recipe info
        $stmt = $this->db->prepare("SELECT * FROM recipes WHERE recipe_id = ? LIMIT 1");
        $stmt->execute([$id]);
        $recipe = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$recipe) return null;

        // Get categories
        $catStmt = $this->db->prepare("SELECT c.category_id, c.name FROM categories c INNER JOIN recipe_categories rc ON c.category_id = rc.category_id WHERE rc.recipe_id = ?");
        $catStmt->execute([$id]);
        $categories = $catStmt->fetchAll(PDO::FETCH_ASSOC);

        // Get ingredients
        $ingStmt = $this->db->prepare("SELECT i.ingredient_id, i.name, ri.quantity, ri.unit FROM ingredients i INNER JOIN recipe_ingredients ri ON i.ingredient_id = ri.ingredient_id WHERE ri.recipe_id = ?");
        $ingStmt->execute([$id]);
        $ingredients = $ingStmt->fetchAll(PDO::FETCH_ASSOC);

        // Get steps
        $stepStmt = $this->db->prepare("SELECT step_number, instructions, step_time FROM steps WHERE recipe_id = ? ORDER BY step_number ASC");
        $stepStmt->execute([$id]);
        $steps = $stepStmt->fetchAll(PDO::FETCH_ASSOC);

        // Combine all
        $recipe['categories'] = $categories;
        $recipe['ingredients'] = $ingredients;
        $recipe['steps'] = $steps;
        return $recipe;
    }
}
?>