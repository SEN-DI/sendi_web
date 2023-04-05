const sendButton = document.getElementById("send-button");
const messageInput = document.getElementById("message-input");
const chatMessages = document.querySelector(".chat-messages");

function addChatMessage(text, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", sender);

    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.textContent = text;

    messageElement.appendChild(bubble);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // 자동 스크롤
}

sendButton.addEventListener("click", () => {
    const userMessage = messageInput.value;
    messageInput.value = "";

    // 사용자 메시지 추가
    addChatMessage(userMessage, "user");

    // OpenAI API에서 응답 가져오기 (이 부분은 Flask로 대체해야 합니다)
    // const openAIResponse = await fetchOpenAIResponse(userMessage);

    // OpenAI 응답 메시지 추가
    // addChatMessage(openAIResponse, "openai");
});


messageInput.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendButton.click();
    }
});