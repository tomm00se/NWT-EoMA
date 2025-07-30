<?php
require_once __DIR__ . '/../models/UserModel.php';

class UserService {
    private $model;

    public function __construct() {
        $this->model = new UserModel();
    }

    public function validateRegistration($name, $email, $password) {
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

    public function registerUser($name, $email, $password, $dietary) {
        return $this->model->register($name, $email, $password, $dietary);
    }

    public function authenticateUser($email, $password) {
        return $this->model->login($email, $password);
    }

}
