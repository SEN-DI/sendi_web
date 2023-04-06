// chat.js

const chatMessages = document.querySelector(".chat-messages");
const chatFavicons = document.querySelectorAll(".favicon img");
const sendButton = document.getElementById("send-button");
const messageInput = document.getElementById("message-input");

const responses = [
    "(기쁨) 기분이 좋다니 도비도 행복해요",
    "(버럭) 누가 기분을 나쁘게 한 건가요? 도비가 마법으로 혼내줄게요!",
    "(슬픔) 우울하시다면 도비가 집요정을 시켜 티를 타오라고 말해줄게요. ",
    "(까칠) 도비도 말포이가 때문에 짜증이 난 적이 많았어요. 그럴 땐 해리포터가 제게 말을 걸어 준 날을 떠올렸어요.",
    "(소심) 도비가 옆에 있어줄게요.",
    "(빙봉) 도비도 어릴 적엔 도비를 사랑해주는 주인이 있었죠..."
];

chatFavicons.forEach((favicon, index) => {
  favicon.addEventListener("click", () => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", "openai");

    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.textContent = responses[index];

    messageElement.appendChild(bubble);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // auto scroll
  });
});

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

sendButton.addEventListener("click", () => {
  const userMessage = messageInput.value;
  messageInput.value = "";

  // 유저 메세지
  addChatMessage(userMessage, "user");

  // OpenAI API (Flask나 python 파일로 대체)
  // const openAIResponse = await fetchOpenAIResponse(userMessage);

  // OpenAI API response 메세지
  // addChatMessage(openAIResponse, "openai");
});

messageInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendButton.click();
  }
});
