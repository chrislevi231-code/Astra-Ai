
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const messages = document.getElementById("messages");
const welcome = document.getElementById("welcome");
const newChat = document.getElementById("newChat");

function addMessage(text, sender) {
    const message = document.createElement("div");

    message.classList.add("message", sender);
    message.textContent = text;

    messages.appendChild(message);

    return message;
}

chatForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = userInput.value.trim();

    if (!text) return;

    welcome.style.display = "none";

    addMessage(text, "user");

    userInput.value = "";
    userInput.style.height = "auto";

    addMessage(
        "Astra belum terhubung ke layanan AI. Integrasi AI akan dipasang pada tahap berikutnya.",
        "assistant"
    );
});

userInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        chatForm.requestSubmit();
    }
});

userInput.addEventListener("input", function() {
    this.style.height = "auto";
    this.style.height = Math.min(this.scrollHeight, 150) + "px";
});

newChat.addEventListener("click", function() {
    messages.innerHTML = "";
    welcome.style.display = "block";
    userInput.value = "";
    userInput.style.height = "auto";
    userInput.focus();
});
