<?php
class UserView {
    public function renderLoginForm() {
        echo '<form method="POST" action="/api/user/login">';
        echo '<input type="email" name="email" placeholder="Email" required />';
        echo '<input type="password" name="password" placeholder="Password" required />';
        echo '<button type="submit">Login</button>';
        echo '</form>';
    }

    public function renderRegistrationForm() {
        echo '<form method="POST" action="/api/user/registration">';
        echo '<input type="email" name="email" placeholder="Email" required />';
        echo '<input type="password" name="password" placeholder="Password" required />';
        echo '<input type="text" name="name" placeholder="Name" required />';
        echo '<button type="submit">Register</button>';
        echo '</form>';
    }
}
?>
