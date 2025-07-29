<?php
require_once __DIR__ . '/../config/config.php';

class UserModel {
    private $db;

    public function __construct() {
        $config = new Config();
        $this->db = $config->getPDO();
    }

    public function register($name, $email, $password, $dietary_preference = 'none') {
    try {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $this->db->prepare("INSERT INTO users (name, email, password, dietary_preference) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$name, $email, $hashedPassword, $dietary_preference]);
    } catch (PDOException $e) {
        if ($e->getCode() === '23000') { // integrity constraint violation
            return false; // duplicate email or unique constraint failure
        }
        throw $e; // rethrow for unexpected errors
    }
}

    public function login($email, $password) {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user && password_verify($password, $user['password'])) {
            return $user;
        }
        return false;
    }
}
?>