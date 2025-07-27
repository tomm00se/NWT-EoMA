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

    //Luis: Using the fecthFullRecipe
    // public function fetchRecipeById($id) {
    //     $stmt = $this->db->prepare("SELECT * FROM recipes WHERE recipe_id = ? LIMIT 1");
    //     $stmt->execute([$id]);
    //     return $stmt->fetch(PDO::FETCH_ASSOC);
    // }

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

    public function insertRecipe(array $data, int $userId) {
    $this->db->beginTransaction();

    try {
        // Insert recipe
        $stmt = $this->db->prepare("INSERT INTO recipes (title, description, image_url, total_time, created_at, user_id)
                                    VALUES (?, ?, ?, ?, NOW(), ?)");
        $stmt->execute([
            $data['title'],
            $data['description'],
            $data['image_url'] ?? null,
            $data['total_time'],
            $userId
        ]);
        $recipeId = $this->db->lastInsertId();

        // Insert steps
        foreach ($data['steps'] as $step) {
            $stmt = $this->db->prepare("INSERT INTO steps (recipe_id, step_number, instructions, step_time)
                                        VALUES (?, ?, ?, ?)");
            $stmt->execute([$recipeId, $step['step_number'], $step['instructions'], $step['step_time']]);
        }

        // Ingredients
        foreach ($data['ingredients'] as $ing) {
            // Resolve or create ingredient
            $stmt = $this->db->prepare("SELECT ingredient_id FROM ingredients WHERE name = ?");
            $stmt->execute([$ing['name']]);
            $row = $stmt->fetch();
            if ($row) {
                $ingredientId = $row['ingredient_id'];
            } else {
                $stmt = $this->db->prepare("INSERT INTO ingredients (name) VALUES (?)");
                $stmt->execute([$ing['name']]);
                $ingredientId = $this->db->lastInsertId();
            }

            $stmt = $this->db->prepare("INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
                                        VALUES (?, ?, ?, ?)");
            $stmt->execute([$recipeId, $ingredientId, $ing['quantity'], $ing['unit']]);
        }

        // Categories
        foreach ($data['categories'] as $catName) {
            $stmt = $this->db->prepare("SELECT category_id FROM categories WHERE name = ?");
            $stmt->execute([$catName]);
            $row = $stmt->fetch();
            if ($row) {
                $catId = $row['category_id'];
            } else {
                $stmt = $this->db->prepare("INSERT INTO categories (name) VALUES (?)");
                $stmt->execute([$catName]);
                $catId = $this->db->lastInsertId();
            }

            $stmt = $this->db->prepare("INSERT INTO recipe_categories (recipe_id, category_id) VALUES (?, ?)");
            $stmt->execute([$recipeId, $catId]);
        }

        $this->db->commit();
        return $recipeId;

    } catch (Exception $e) {
        $this->db->rollBack();
        throw $e;
    }
}

public function updateRecipe(int $id, array $data, int $userId) {
    $this->db->beginTransaction();

    try {
        // Update recipe info
        $stmt = $this->db->prepare("UPDATE recipes SET title = ?, description = ?, image_url = ?, total_time = ?
                                    WHERE recipe_id = ? AND user_id = ?");
        $stmt->execute([
            $data['title'],
            $data['description'],
            $data['image_url'] ?? null,
            $data['total_time'],
            $id,
            $userId
        ]);

        // Delete previous steps/ingredients/categories
        $this->db->prepare("DELETE FROM steps WHERE recipe_id = ?")->execute([$id]);
        $this->db->prepare("DELETE FROM recipe_ingredients WHERE recipe_id = ?")->execute([$id]);
        $this->db->prepare("DELETE FROM recipe_categories WHERE recipe_id = ?")->execute([$id]);

        // Re-insert steps, ingredients, categories (same as insert)
        $data['recipe_id'] = $id;
        $this->insertRecipeRelations($data, false); // false = don't insert into recipes table again

        $this->db->commit();
    } catch (Exception $e) {
        $this->db->rollBack();
        throw $e;
    }
}


public function deleteRecipe(int $id, int $userId) {
    $stmt = $this->db->prepare("DELETE FROM recipes WHERE recipe_id = ? AND user_id = ?");
    $stmt->execute([$id, $userId]);
}


private function insertRecipeRelations(array $data, bool $isNew = true) {
    $recipeId = $isNew ? $this->db->lastInsertId() : $data['recipe_id'];

    // Steps
    foreach ($data['steps'] as $step) {
        $stmt = $this->db->prepare("INSERT INTO steps (recipe_id, step_number, instructions, step_time)
                                    VALUES (?, ?, ?, ?)");
        $stmt->execute([$recipeId, $step['step_number'], $step['instructions'], $step['step_time']]);
    }

    // Ingredients
    foreach ($data['ingredients'] as $ing) {
        $stmt = $this->db->prepare("SELECT ingredient_id FROM ingredients WHERE name = ?");
        $stmt->execute([$ing['name']]);
        $row = $stmt->fetch();
        $ingredientId = $row ? $row['ingredient_id'] : $this->insertAndGetId("ingredients", ['name' => $ing['name']]);

        $stmt = $this->db->prepare("INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
                                    VALUES (?, ?, ?, ?)");
        $stmt->execute([$recipeId, $ingredientId, $ing['quantity'], $ing['unit']]);
    }

    // Categories
    foreach ($data['categories'] as $catName) {
        $stmt = $this->db->prepare("SELECT category_id FROM categories WHERE name = ?");
        $stmt->execute([$catName]);
        $row = $stmt->fetch();
        $catId = $row ? $row['category_id'] : $this->insertAndGetId("categories", ['name' => $catName]);

        $stmt = $this->db->prepare("INSERT INTO recipe_categories (recipe_id, category_id) VALUES (?, ?)");
        $stmt->execute([$recipeId, $catId]);
    }
}

private function insertAndGetId(string $table, array $data): int {
    $columns = array_keys($data);
    $placeholders = array_fill(0, count($columns), '?');
    $stmt = $this->db->prepare("INSERT INTO $table (" . implode(',', $columns) . ") VALUES (" . implode(',', $placeholders) . ")");
    $stmt->execute(array_values($data));
    return $this->db->lastInsertId();
}


}
?>