
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const messages = document.getElementById("messages");
const sendButton = document.getElementById("sendButton");
const newChatButton = document.getElementById("newChatButton");

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";
  sendButton.disabled = true;

  const loading = document.createElement("div");
  loading.className = "message assistant";
  loading.textContent = "Astra sedang berpikir...";
  messages.appendChild(loading);

  try {
    const response = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    loading.remove();

    if (!response.ok) {
      throw new Error(data.error || "Terjadi kesalahan.");
    }

    addMessage(data.reply, "assistant");
  } catch (error) {
    loading.remove();
    addMessage("Astra: " + error.message, "assistant");
  } finally {
    sendButton.disabled = false;
    userInput.focus();
  }
});

newChatButton.addEventListener("click", () => {
  messages.innerHTML = "";
  userInput.value = "";
});
