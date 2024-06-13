document.getElementById('showPasswordBtn').addEventListener('click', function() {
    togglePasswordVisibility('passwordInput', 'showPasswordBtn');
});

document.getElementById('showConfirmPasswordBtn').addEventListener('click', function() {
    togglePasswordVisibility('confirmPasswordInput', 'showConfirmPasswordBtn');
});

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

// Toggle input fields based on user role
window.onload = function() {
    toggleStudentIdInput();
};

function toggleStudentIdInput() {
    var role = document.getElementById("userRole").value;
    var studentIdInput = document.getElementById("studentIdInput");
    var gradeLevelInput = document.getElementById("gradeLevelInput");
    var gradeSectionInput = document.getElementById("gradeSectionInput");
    var teacherIdInput = document.getElementById("teacherIdInput");

    if (role === "student") {
        studentIdInput.style.display = "block";
        gradeLevelInput.style.display = "block";
        gradeSectionInput.style.display = "block";
        teacherIdInput.style.display = "none";
    } else if (role === "teacher" || role === "admin") {
        studentIdInput.style.display = "none";
        gradeLevelInput.style.display = "none";
        gradeSectionInput.style.display = "none";
        teacherIdInput.style.display = "block";
    } else {
        studentIdInput.style.display = "none";
        gradeLevelInput.style.display = "none";
        gradeSectionInput.style.display = "none";
        teacherIdInput.style.display = "none";
    }
}
