document.addEventListener("DOMContentLoaded", function() {
    var popup = document.getElementById("forgotPasswordPopup");
    var btn = document.getElementById("forgotPasswordLink");
    var span = document.querySelector(".close");
    var showPasswordBtn = document.getElementById('showPasswordBtn');
    var submitBtn = document.getElementById('forgotPasswordSubmit');

    if (btn) {
        btn.onclick = function(event) {
            event.preventDefault();
            popup.style.display = "block";
        }
    } else {
        console.error("Forgot Password link element not found");
    }

    if (span) {
        span.onclick = function() {
            popup.style.display = "none";
        }
    } else {
        console.error("Close button element not found");
    }

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }

    if (showPasswordBtn) {
        showPasswordBtn.addEventListener('click', function() {
            togglePasswordVisibility('passwordInput', 'showPasswordBtn');
        });
    } else {
        console.error("Show password button element not found");
    }

    // Add event listener for submit button
    if (submitBtn) {
        submitBtn.addEventListener('click', forgotPasswordSubmit);
    } else {
        console.error("Forgot password submit button element not found");
    }
    
    // Check if the user is on the Student, Teacher, or Schooladmin page and add a class to the respective icon
    const currentPath = window.location.pathname;
    console.log("Current Path: ", currentPath);
    if (currentPath.includes('index.html')) {
        document.getElementById('student-icon').classList.add('active');
        console.log("Student Page");
    } else if (currentPath.includes('Teacher.html')) {
        document.getElementById('teacher-icon').classList.add('active');
        console.log("Teacher Page");
    } else if (currentPath.includes('Admin.html')) {
        document.getElementById('schooladmin-icon').classList.add('active');
        console.log("School Admin Page");
    }
});

// Function to toggle password visibility
function togglePasswordVisibility(inputId, buttonId) {
    var inputField = document.getElementById(inputId);
    var showPasswordBtn = document.getElementById(buttonId);
    
    if (inputField.type === 'password') {
        inputField.type = 'text';
        showPasswordBtn.textContent = 'hide';
    } else {
        inputField.type = 'password';
        showPasswordBtn.textContent = 'show';
    }
}

// Function to open feedback popup
function openFeedbackPopup() {
    document.getElementById("feedbackPopup").style.display = "block";
}

// Function to close feedback popup
function closeFeedbackPopup() {
    document.getElementById("feedbackPopup").style.display = "none";
}

// Function to submit feedback
function submitFeedback() {
    var feedbackText = document.getElementById('feedbackText').value.trim(); // Get feedback text and remove leading/trailing whitespaces

    if (feedbackText === '') {
        alert("Please write your feedback below."); // Prompt the user to write feedback if the textarea is empty
        return; // Exit the function early if no feedback is provided
    }

    // Proceed with the submission logic if feedback is provided
    alert("Thank you for your feedback!");
    // Optionally, you can close the popup after submission
    closeFeedbackPopup();
}

// Function to submit forgot password form
function forgotPasswordSubmit() {
    var emailInput = document.querySelector('.input-box-popup');
    var email = emailInput.value.trim(); // Remove leading and trailing whitespaces

    if (email === '') {
        alert("Please enter your email.");
        return; // Exit the function early if no email is provided
    }

    // Proceed with the submission logic if email is provided
    alert("Password reset instructions sent to your email: " + email);
    // Optionally, you can close the popup after submission
    var popup = document.getElementById("forgotPasswordPopup");
    popup.style.display = "none";
}
