<?php
include 'db.php'; // Include the database connection file

$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];
$role = $_POST['role'];
$studentid = $_POST['studentid'];
$gradelevel = $_POST['gradelevel'];
$gradesection = $_POST['gradesection'];
$password = $_POST['password'];

// Function to check if a field value already exists
function checkIfExists($conn, $field, $value) {
    $stmt = $conn->prepare("SELECT * FROM form WHERE $field = ?");
    $stmt->bind_param("s", $value);
    $stmt->execute();
    $result = $stmt->get_result();
    $exists = $result->num_rows > 0;
    $stmt->close();
    return $exists;
}

$errors = [];

// Check if email already exists
if (checkIfExists($conn, 'email', $email)) {
    $errors[] = "Email already exists. Please use a different email address.";
}

// Check if student ID already exists, if provided
if (!empty($studentid) && checkIfExists($conn, 'studentid', $studentid)) {
    $errors[] = "Student ID already exists. Please use a different student ID.";
}

if (!empty($errors)) {
    // If there are errors, display them
    foreach ($errors as $error) {
        echo $error . "<br>";
    }
} else {
    // If no errors, insert the record
    $stmt = $conn->prepare("INSERT INTO form (firstname, lastname, email, role, studentid, gradelevel, gradesection, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssiiss", $firstname, $lastname, $email, $role, $studentid, $gradelevel, $gradesection, $password);
    $stmt->execute();
    echo "Registration successful...";
    $stmt->close();
    $conn->close(); // Close the connection
}
?>