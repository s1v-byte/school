//Below is Tab code
var tabButtons = document.querySelectorAll(".tabContainer .buttonContainer button")
var tabPanels = document.querySelectorAll(".tabContainer .tabPanel")

function showPanel(panelIndex,colorCode){
    tabButtons.forEach(function(node){
        node.style.backgroundColor="";
        node.style.color="";

    });
    tabButtons[panelIndex].style.backgroundColor=colorCode;
    tabButtons[panelIndex].style.color="black";
    tabPanels.forEach(function(node){
        node.style.display="none";
    });
    tabPanels[panelIndex].style.display="block";
    tabPanels[panelIndex].style.backgroundColor="colorCode";
}
showPanel(0, 'f44336');

//Below is Show password code

document.getElementById('toggleCurrentPassword').addEventListener('click', function() {
    var currentPasswordInput = document.getElementById('currentPassword');
    if (currentPasswordInput.type === 'password') {
        currentPasswordInput.type = 'text';
        this.textContent = 'Hide';
    } else {
        currentPasswordInput.type = 'password';
        this.textContent = 'Show';
    }
});

document.getElementById('toggleNewPassword').addEventListener('click', function() {
    var newPasswordInput = document.getElementById('newPassword');
    if (newPasswordInput.type === 'password') {
        newPasswordInput.type = 'text';
        this.textContent = 'Hide';
    } else {
        newPasswordInput.type = 'password';
        this.textContent = 'Show';
    }
});

document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
    var confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput.type === 'password') {
        confirmPasswordInput.type = 'text';
        this.textContent = 'Hide';
    } else {
        confirmPasswordInput.type = 'password';
        this.textContent = 'Show';
    }
});
//LogOut
document.addEventListener('DOMContentLoaded', (event) => {
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function (event) {
        const userConfirmed = confirm("Are you sure you want to log out?");
        if (!userConfirmed) {
            event.preventDefault(); // Prevent the default action if user cancels
        } else {
            // Redirect to the login page after logout confirmation
            window.location.href = "/SignIn/Admin.html"; // Replace "login.html" with the path to your login page
        }
    });
});