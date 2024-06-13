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

function submitFeedback() {
  var feedbackText = document.getElementById('feedbackText').value;
  // Handle submission of feedback
}

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

//Below is Chatbot Code 

// Predefined responses
const responses = {
  "what are you": "I am a Chatbot here to assist you with information about our school.",
  "what can you do": "I can provide information about our school, including contact details, programs, and access to the syllabus.",
  "access syllabus": "To access the syllabus, please provide the following details:\nGrade Level, \nSubject, \nQuarter"
};

// Follow-up questions for accessing the syllabus
const syllabusFollowUpQuestions = [
  "What grade are you in",
  "What subject",
  "What quarter"
];

// Acceptable answers for follow-up questions
const acceptableAnswers = {
  "what grade are you in": ["7", "seven", "8", "eight", "9", "nine", "10", "ten"],
  "what subject": ["math", "science", "pe"],
  "what quarter": ["1", "1st", "first", "one", "2", "2nd", "second", "two", "3", "3rd", "third", "three", "4", "4th", "fourth", "four"]
};

// State to manage the follow-up questions
let followUpState = {
  active: false,
  questions: [],
  currentQuestionIndex: 0,
  answers: {}
};

// Get references to the necessary DOM elements
const chatbotContainer = document.querySelector('.chatbot-container');
const chatbotMessages = document.querySelector('.chatbot-messages');
const chatbotInputField = document.querySelector('.chatbot-input-field');
const chatbotSendButton = document.querySelector('.chatbot-send-button');

// Display the predefined options
function displayOptions() {
  Object.keys(responses).forEach(key => {
      const buttonElement = document.createElement('button');
      buttonElement.classList.add('chatbot-option');
      buttonElement.textContent = key;
      buttonElement.addEventListener('click', () => {
          handleUserSelection(key);
      });
      chatbotMessages.appendChild(buttonElement);
  });
}

// Function to display a chatbot message
function displayChatbotMessage(message, className) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('chatbot-message', className);
  messageElement.textContent = message;

  const timestamp = document.createElement('div');
  timestamp.classList.add('chatbot-timestamp');
  timestamp.textContent = formatAMPM(new Date());

  messageElement.appendChild(timestamp);
  chatbotMessages.appendChild(messageElement);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Function to format the time to 12-hour format
function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

// Function to normalize text by removing punctuation and converting to lowercase
function normalizeText(text) {
  return text.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase();
}

// Function to handle user input
function handleUserInput() {
  const userInput = chatbotInputField.value.trim();
  chatbotInputField.value = '';

  if (userInput) {
      displayChatbotMessage(`You: ${userInput}`, 'user');
      processUserInput(userInput);
  }
}

// Function to process user input and handle follow-up questions
function processUserInput(userInput) {
  const normalizedInput = normalizeText(userInput);

  if (followUpState.active) { 
      const currentQuestion = followUpState.questions[followUpState.currentQuestionIndex];
      const acceptableAnswersForQuestion = acceptableAnswers[currentQuestion];
      const normalizedQuestion = normalizeText(currentQuestion);

      if (acceptableAnswersForQuestion.some(answer => normalizedInput.includes(answer))) {
          followUpState.answers[normalizedQuestion] = normalizedInput;
          followUpState.currentQuestionIndex++;

          if (followUpState.currentQuestionIndex < followUpState.questions.length) {
              displayTypingIndicator();
              setTimeout(() => {
                  displayChatbotMessage(syllabusFollowUpQuestions[followUpState.currentQuestionIndex] + '?', 'bot');
              }, 1000); // Adjust delay as needed
          } else {
              followUpState.active = false;
              displayTypingIndicator();
              setTimeout(() => {
                  displayChatbotMessage('Here is the syllabus:', 'bot');
                  createSyllabusDownloadButton();
              }, 1000); // Adjust delay as needed
          }
      } else {
          displayTypingIndicator();
          setTimeout(() => {
              displayChatbotMessage('Please provide a valid answer.', 'bot');
          }, 1000); // Adjust delay as needed
      }
  } else {
      if (responses.hasOwnProperty(normalizedInput)) {
          displayTypingIndicator();
          setTimeout(() => {
              displayChatbotMessage(responses[normalizedInput], 'bot');

              if (normalizedInput === 'access syllabus') {
                  followUpState.active = true;
                  followUpState.questions = syllabusFollowUpQuestions.map(question => normalizeText(question));
                  followUpState.currentQuestionIndex = 0;
                  followUpState.answers = {};

                  displayTypingIndicator();
                  setTimeout(() => {
                      displayChatbotMessage(syllabusFollowUpQuestions[followUpState.currentQuestionIndex] + '?', 'bot');
                  }, 1000); // Adjust delay as needed
              }
          }, 1000); // Adjust delay as needed
      } else {
          displayTypingIndicator();
          setTimeout(() => {
              displayChatbotMessage('I am sorry, I did not understand that', 'bot');
          }, 1000); // Adjust delay as needed
      }
  }
}

// Function to handle follow-up responses
function handleFollowUp(userInput) {
  const currentQuestion = followUpState.questions[followUpState.currentQuestionIndex];
  const acceptable = acceptableAnswers[normalizeText(currentQuestion)];

  if (currentQuestion.toLowerCase() === "what grade are you in") {
    const normalizedGrade = gradeMapping[userInput.trim()];
    if (normalizedGrade) {
      followUpState.answers[currentQuestion] = normalizedGrade;
      followUpState.currentQuestionIndex++;

      if (followUpState.currentQuestionIndex < followUpState.questions.length) {
        askNextFollowUpQuestion();
      } else {
        completeFollowUp();
      }
    } else {
      displayTypingIndicator();
      setTimeout(() => {
        displayChatbotMessage(`Please provide a valid answer for "${currentQuestion}". Acceptable answers are: ${Object.keys(gradeMapping).join(', ')}`, 'bot');
      }, 1000); // Adjust delay as needed
    }
  } else if (currentQuestion.toLowerCase() === "what quarter") {
    const normalizedSemester = semesterMapping[userInput.trim()];
    if (normalizedSemester) {
      followUpState.answers[currentQuestion] = normalizedSemester;
      followUpState.currentQuestionIndex++;

      if (followUpState.currentQuestionIndex < followUpState.questions.length) {
        askNextFollowUpQuestion();
      } else {
        completeFollowUp();
      }
    } else {
      displayTypingIndicator();
      setTimeout(() => {
        displayChatbotMessage(`Please provide a valid answer for "${currentQuestion}". Acceptable answers are: ${Object.keys(semesterMapping).join(', ')}`, 'bot');
      }, 1000); // Adjust delay as needed
    }
  } else {
    if (acceptable.includes(userInput.trim())) {
      followUpState.answers[currentQuestion] = userInput;
      followUpState.currentQuestionIndex++;

      if (followUpState.currentQuestionIndex < followUpState.questions.length) {
        askNextFollowUpQuestion();
      } else {
        completeFollowUp();
      }
    } else {
      displayTypingIndicator();
      setTimeout(() => {
        displayChatbotMessage(`Please provide a valid answer for "${currentQuestion}". Acceptable answers are: ${acceptable.join(', ')}`, 'bot');
      }, 1000); // Adjust delay as needed
    }
  }
}


// Function to create a download button for the syllabus
function createSyllabusDownloadButton() {
  const downloadButton = document.createElement('a');
  downloadButton.href = '/Pictures/Syllabus.png'; // Replace with the correct path to your syllabus image
  downloadButton.download = 'Syllabus.png'; // The name of the file to be downloaded
  downloadButton.textContent = 'Download Syllabus';
  downloadButton.classList.add('chatbot-download-button');
  chatbotMessages.appendChild(downloadButton);
}

// Function to handle user selection from predefined options
function handleUserSelection(option) {
  chatbotInputField.value = option;
  handleUserInput();
}

// Function to display typing indicator
function displayTypingIndicator() {
  const typingIndicator = document.createElement('div');
  typingIndicator.classList.add('chatbot-message', 'bot');
  typingIndicator.textContent = 'Bot is typing...';
  chatbotMessages.appendChild(typingIndicator);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

  // Remove typing indicator after delay
  setTimeout(() => {
    if (typingIndicator.parentNode === chatbotMessages) {
      chatbotMessages.removeChild(typingIndicator);
    }
  }, 1000); // Adjust delay as needed
}


// Function to start the follow-up questions for accessing the syllabus
function startFollowUpQuestions() {
  if (!followUpState.active) {
    followUpState.active = true;
    followUpState.questions = [...syllabusFollowUpQuestions];
    followUpState.currentQuestionIndex = 0;
    followUpState.answers = {};

    askNextFollowUpQuestion();
  }
}

// Function to ask the next follow-up question with typing indicator
function askNextFollowUpQuestion() {
  displayTypingIndicator();
  setTimeout(() => {
    const typingIndicator = document.querySelector('.chatbot-message.bot:last-child');
    if (typingIndicator) {
      typingIndicator.remove();
    }
    const nextQuestion = followUpState.questions[followUpState.currentQuestionIndex];
    displayChatbotMessage(nextQuestion, 'bot');
  }, 1000); // Adjust delay as needed
}

// Function to complete the follow-up process
function completeFollowUp() {
  followUpState.active = false;
  const { answers } = followUpState;
  const syllabusMessage = `Syllabus for Grade ${answers["What grade are you in"]}, Subject ${answers["What subject"]}, ${answers["What quarter"]} Quarter.`;
  displayChatbotMessage(syllabusMessage, 'bot');
}

// Function to toggle the chatbot visibility
function toggleChatbot() {
  chatbotContainer.classList.toggle('active');
}

// Event listener for the send button
chatbotSendButton.addEventListener('click', handleUserInput);

// Event listener for the enter key in the input field
chatbotInputField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
      handleUserInput();
  }
});

// Initialize the chatbot after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  resetChatbot();
});

// Function to reset the chatbot
function resetChatbot() {
  chatbotMessages.innerHTML = '';
  followUpState.active = false;
  followUpState.questions = [];
  followUpState.currentQuestionIndex = 0;
  followUpState.answers = {};
  displayChatbotMessage("I am Chatbot! How can I help you today?", 'bot');
  displayOptions();
}

// Initial greeting message
resetChatbot();



  // Function to handle bot response with typing indicator
  function handleBotResponse(key) {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('chatbot-message', 'bot');
    typingIndicator.textContent = 'Bot is typing...';
    chatbotMessages.appendChild(typingIndicator);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  
    setTimeout(() => {
      chatbotMessages.removeChild(typingIndicator);
      if (key === "access syllabus") {
        startFollowUpQuestions();
      } else {
        displayChatbotMessage(responses[key], 'bot');
      }
    }, 1000);
  }
  
  // Function to start the follow-up questions for accessing the syllabus
// Function to start the follow-up questions for accessing the syllabus
function startFollowUpQuestions() {
  if (!followUpState.active) {
    followUpState.active = true;
    followUpState.questions = [...syllabusFollowUpQuestions];
    followUpState.currentQuestionIndex = 0;
    followUpState.answers = {};

    askNextFollowUpQuestion();
  }
}


  
  // Function to handle follow-up responses
  function handleFollowUp(userInput) {
    const currentQuestion = followUpState.questions[followUpState.currentQuestionIndex];
    const acceptable = acceptableAnswers[normalizeText(currentQuestion)];
  
    if (currentQuestion.toLowerCase() === "what grade are you in") {
      const normalizedGrade = gradeMapping[userInput.trim()];
      if (normalizedGrade) {
        followUpState.answers[currentQuestion] = normalizedGrade;
        followUpState.currentQuestionIndex++;
  
        if (followUpState.currentQuestionIndex < followUpState.questions.length) {
          askNextFollowUpQuestion();
        } else {
          completeFollowUp();
        }
      } else {
        displayChatbotMessage(`Please provide a valid answer for "${currentQuestion}". Acceptable answers are: ${Object.keys(gradeMapping).join(', ')}`, 'bot');
      }
    } else if (currentQuestion.toLowerCase() === "what quarter") {
      const normalizedSemester = semesterMapping[userInput.trim()];
      if (normalizedSemester) {
        followUpState.answers[currentQuestion] = normalizedSemester;
        followUpState.currentQuestionIndex++;
  
        if (followUpState.currentQuestionIndex < followUpState.questions.length) {
          askNextFollowUpQuestion();
        } else {
          completeFollowUp();
        }
      } else {
        displayChatbotMessage(`Please provide a valid answer for "${currentQuestion}". Acceptable answers are: ${Object.keys(semesterMapping).join(', ')}`, 'bot');
      }
    } else {
      if (acceptable.includes(userInput.trim())) {
        followUpState.answers[currentQuestion] = userInput;
        followUpState.currentQuestionIndex++;
  
        if (followUpState.currentQuestionIndex < followUpState.questions.length) {
          askNextFollowUpQuestion();
        } else {
          completeFollowUp();
        }
      } else {
        displayChatbotMessage(`Please provide a valid answer for "${currentQuestion}". Acceptable answers are: ${acceptable.join(', ')}`, 'bot');
      }
    }
  }
  
  // Function to ask the next follow-up question with typing indicator
function askNextFollowUpQuestion() {
  // Display typing indicator
  displayChatbotMessage('Bot is typing...', 'bot');

  // Simulate delay before showing the next question (adjust the delay as needed)
  setTimeout(() => {
    // Remove typing indicator
    const typingIndicator = document.querySelector('.chatbot-message.bot:last-child');
    if (typingIndicator) {
      typingIndicator.remove();
    }
    
    // Display the next follow-up question
    const nextQuestion = followUpState.questions[followUpState.currentQuestionIndex];
    displayChatbotMessage(nextQuestion, 'bot');
  }, 1000); // Adjust the delay as needed
}

  
  // Function to complete the follow-up process
  function completeFollowUp() {
    followUpState.active = false;
    const { answers } = followUpState;
    const syllabusMessage = `Syllabus for Grade ${answers["What grade are you in"]}, Subject ${answers["What subject"]}, ${answers["What quarter"]} Quarter. `;
    displayChatbotMessage(syllabusMessage, 'bot');
  }
  
  // Function to toggle the chatbot visibility
  function toggleChatbot() {
    const chatbotContainer = document.querySelector('.chatbot-container');
    if (chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '') {
      chatbotContainer.style.display = 'flex';
    } else {
      chatbotContainer.style.display = 'none';
    }
  }
  
  // Attach event listener to the send button
  chatbotSendButton.addEventListener('click', handleUserInput);
  chatbotInputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleUserInput();
    }
  });
  
  // Function to reset the chatbot conversation state
  function resetChatbot() {
    // Clear the chatbot messages
    chatbotMessages.innerHTML = '';
  
    // Reset follow-up state
    followUpState.active = false;
    followUpState.questions = [];
    followUpState.currentQuestionIndex = 0;
    followUpState.answers = {};
  
    // Display initial greeting message and predefined options
    displayChatbotMessage("Greetings! How can I help you today?", 'bot');
    displayOptions();
  }
  
  

  //Logout
  document.addEventListener('DOMContentLoaded', (event) => {
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function (event) {
        const userConfirmed = confirm("Are you sure you want to log out?");
        if (!userConfirmed) {
            event.preventDefault(); // Prevent the default action if user cancels
        } else {
            // Use an absolute path for redirection
            const targetPath = "/SEI%20Schools/SignIn/index.html";
            console.log("Redirecting to: " + targetPath);
            window.location.href = targetPath; // Corrected absolute path
        }
    });
});
