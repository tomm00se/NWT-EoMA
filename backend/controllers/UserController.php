<?php
require_once __DIR__ . '/../models/UserModel.php';
require_once __DIR__ . '/../views/UserView.php';

class UserController {
    
    private $model;
    private $view;

    public function __construct() {
        $this->model = new UserModel();
        $this->view = new UserView();
    }

    private function validate($name, $email, $password) {
        if (empty($name) || empty($email) || empty($password)) {
            return "All fields are required.";
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return "Invalid email format.";
        }
        if (!preg_match('/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/', $password)) {
            return "Password must be at least 8 alphanumeric characters.";
        }
        return true;
    }

    // Registration endpoint
    public function register() {
        $data = $_POST;
        $name = trim($data['name'] ?? '');
        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';
        $dietary_preference = $data['dietary_preference'] ?? 'none';

        $validation = $this->validate($name, $email, $password);
        if ($validation !== true) {
            http_response_code(400);
            echo json_encode(["message" => $validation]);
            return;
        }

        $success = $this->model->register($name, $email, $password, $dietary_preference);
        if ($success) {
            echo json_encode(["message" => "Registration successful!"]);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Registration failed. Email may already exist."]);
        }
    }

    // Login endpoint
    public function login() {
        $data = $_POST;
        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';

        if (empty($email) || empty($password)) {
            http_response_code(400);
            echo json_encode(["message" => "Email and password are required."]);
            return;
        }

        $user = $this->model->login($email, $password);
        if ($user) {
            if (session_status() === PHP_SESSION_NONE) {
                $cookieParams = session_get_cookie_params();
                session_set_cookie_params([
                    'lifetime' => 86400, // 1 day
                    'path' => $cookieParams['path'],
                    'secure' => $cookieParams['secure'],
                    'httponly' => $cookieParams['httponly']
                ]);
                session_start();
            }
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['name'] = $user['name'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['dietary_preference'] = $user['dietary_preference'];
            echo json_encode([
                "message" => "Login successful!",
                "user" => [
                    "user_id" => $user['user_id'],
                    "name" => $user['name'],
                    "email" => $user['email'],
                    "dietary_preference" => $user['dietary_preference']
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["message" => "Login failed. Invalid credentials."]);
        }
    }

    // Logout endpoint
    public function logout() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        session_unset();
        session_destroy();
        echo json_encode(["message" => "Logout successful."]);
    }
}
?>