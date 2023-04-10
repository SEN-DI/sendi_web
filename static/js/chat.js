const chatMessages = document.querySelector(".chat-messages");
const sendButton = document.getElementById("send-button");
const messageInput = document.getElementById("message-input");

// user emotion
let currentEmotion = "Tired";

async function fetchOpenAIResponse(userMessage) {
  const response = await fetch('/calendar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_input: userMessage,
      emotion: currentEmotion,
    }),
  });

  const data = await response.json();
  return data.response;
}

function addChatMessage(text, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message", sender);

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.textContent = text;

  messageElement.appendChild(bubble);
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight; // auto scroll
}

function changeHogwartImage(imageSrc) {
  const hogwart = document.querySelector(".hogwart");
  hogwart.setAttribute("src", imageSrc);
}

function changeEmotion(emotion) {
  currentEmotion = emotion;
}

// emotion 선택
async function sendMessageOnEmotionChange() {
  const userMessage = `I'm feeling ${currentEmotion}.`;
  addChatMessage(userMessage, "user");
  changeHogwartImage("/static/images/symbol/hogwart.png");

  const openAIResponse = await fetchOpenAIResponse(userMessage);
  addChatMessage(openAIResponse, "openai");
}

document.querySelectorAll('.favicon img').forEach((favicon) => {
  favicon.addEventListener('click', () => {
    changeEmotion(favicon.alt);
    sendMessageOnEmotionChange();
  });
});

messageInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendButton.click();
  }
});

sendButton.addEventListener("click", async () => {
  const userMessage = messageInput.value;
  messageInput.value = "";

  addChatMessage(userMessage, "user");
  changeHogwartImage("/static/images/symbol/hogwart.png");

  const openAIResponse = await fetchOpenAIResponse(userMessage);
  addChatMessage(openAIResponse, "openai");
});

document.addEventListener("DOMContentLoaded", () => {
  changeHogwartImage("/static/images/symbol/hogwart.png");
});

// chat이 시작되면 hide-text 클래스를 제거하여 초기화면의 텍스트를 숨김
document.querySelector('.chat-container').classList.remove('hide-text');
