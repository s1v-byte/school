<?php
include 'db.php'; // Include the database connection file

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $studentid = $_POST['studentid'];
    $password = $_POST['password'];

    $sql = "SELECT password FROM form WHERE studentid = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $studentid);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            echo "Login successful";
            // Redirect to Home.html or start session
            // header("Location: Home.html");
        } else {
            echo "Invalid password";
        }
    } else {
        echo "No user found with that student ID";
    }

    $stmt->close();
    $conn->close();
}
?>
