<?php
require_once __DIR__ . '/../services/UserService.php';


class UserController {
    
    private $service;

    public function __construct() {

        $this->service = new UserService();
    
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        header('Content-Type: application/json');
    }

    // Registration endpoint
    public function register() {
        $data = json_decode(file_get_contents("php://input"), true);
        $name = trim($data['name'] ?? '');
        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';
        $dietary_preference = $data['dietary_preference'] ?? 'none';
        

        $validation = $this->service->validateRegistration($name, $email, $password);
        if ($validation !== true) {
            http_response_code(400);
            echo json_encode(["message" => $validation]);
            return;
        }

        $success = $this->service->registerUser($name, $email, $password, $dietary_preference);
        if ($success) {
            echo json_encode(["message" => "Registration successful!"]);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Registration failed. Email may already exist."]);
        }

    }

    // Login endpoint
    public function login() {
        $data = json_decode(file_get_contents("php://input"), true);
        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';

        if (empty($email) || empty($password)) {
            http_response_code(400);
            echo json_encode(["message" => "Email and password are required."]);
            return;
        }

        $user = $this->service->authenticateUser($email, $password);
        if ($user) {

            $this->service->generateCookies();

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
        session_unset();
        session_destroy();
        echo json_encode(["message" => "Logout successful."]);
    }
}
?>