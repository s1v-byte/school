<?php
include 'db.php'; // Include the database connection file

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $studentid = $_POST['studentid'];
    $password = $_POST['password'];

    // Check if the Student ID and password fields are not empty
    if (!empty($studentid) && !empty($password)) {
        // Prepare and execute the SQL statement
        $stmt = $conn->prepare("SELECT * FROM form WHERE studentid = ?");
        $stmt->bind_param("s", $studentid);
        $stmt->execute();
        $result = $stmt->get_result();

        // Check if the student ID exists in the database
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            // Verify the password
            if ($password === $row['password']) {
                // Password is correct, redirect to Home.html
                header("Location: Home.html");
                exit();
            } else {
                // Incorrect password
                echo "Invalid password";
            }
        } else {
            // Student ID does not exist
            echo "Invalid Student ID";
        }

        $stmt->close();
    } else {
        echo "Please fill in all fields";
    }
}

$conn->close(); // Close the connection
?>
