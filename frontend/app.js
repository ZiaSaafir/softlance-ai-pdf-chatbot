/* =========================================================
   SOFTLANCE AI
   Frontend JavaScript
========================================================= */

// Change this if your Django endpoint is different.
const API_URL = "http://127.0.0.1:8000/api/chat/";


/* =========================================================
   STATE
========================================================= */

const state = {
    chats: JSON.parse(localStorage.getItem("softlance_chats") || "[]"),
    currentChatId: null,
    selectedFile: null,
    loading: false
};


/* =========================================================
   ELEMENTS
========================================================= */

const messages = document.getElementById("messages");
const input = document.getElementById("messageInput");
const form = document.getElementById("chatForm");
const sendBtn = document.getElementById("sendBtn");

const pdfInput = document.getElementById("pdfInput");
const filePreview = document.getElementById("filePreview");

const historyBox = document.getElementById("chatHistory");
const welcome = document.getElementById("welcome");

const chatTitle = document.getElementById("chatTitle");
const statusText = document.getElementById("statusText");

const newChatBtn = document.getElementById("newChatBtn");
const topNewChatBtn = document.getElementById("topNewChatBtn");

const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const settingsBtn = document.getElementById("settingsBtn");
const closeSettings = document.getElementById("closeSettings");
const settingsModal = document.getElementById("settingsModal");

const deleteAllBtn = document.getElementById("deleteAllBtn");
const darkMode = document.getElementById("darkMode");

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");


/* =========================================================
   LOCAL STORAGE
========================================================= */

function saveChats() {
    localStorage.setItem(
        "softlance_chats",
        JSON.stringify(state.chats)
    );
}


/* =========================================================
   CHAT HELPERS
========================================================= */

function getCurrentChat() {

    return state.chats.find(
        chat => chat.id === state.currentChatId
    );
}


function createChat(title = "New Chat") {

    const chat = {
        id: Date.now().toString(),
        title: title,
        messages: []
    };

    state.chats.unshift(chat);

    state.currentChatId = chat.id;

    saveChats();

    return chat;
}


function getOrCreateChat(title) {

    let chat = getCurrentChat();

    if (!chat) {
        chat = createChat(title);
    }

    return chat;
}


/* =========================================================
   NEW CHAT
========================================================= */

function newChat() {

    state.currentChatId = null;

    state.selectedFile = null;

    messages.innerHTML = "";

    messages.appendChild(welcome);

    welcome.style.display = "block";

    chatTitle.textContent = "New Chat";

    input.value = "";

    clearFile();

    resizeTextarea();

    renderHistory();
}


newChatBtn?.addEventListener("click", newChat);

topNewChatBtn?.addEventListener("click", newChat);


/* =========================================================
   HISTORY
========================================================= */

function renderHistory() {

    historyBox.innerHTML = "";

    if (state.chats.length === 0) {

        historyBox.innerHTML = `
            <div class="empty-history">
                No chats yet
            </div>
        `;

        return;
    }


    state.chats.forEach(chat => {

        const item = document.createElement("div");

        item.className =
            "history-item" +
            (chat.id === state.currentChatId
                ? " active"
                : "");


        item.innerHTML = `
            <span>💬</span>
            <span class="history-title"></span>
        `;


        item.querySelector(".history-title").textContent =
            chat.title;


        item.addEventListener("click", () => {

            loadChat(chat.id);

            sidebar?.classList.remove("open");

        });


        historyBox.appendChild(item);

    });
}


/* =========================================================
   LOAD CHAT
========================================================= */

function loadChat(id) {

    const chat = state.chats.find(
        item => item.id === id
    );

    if (!chat) return;

    state.currentChatId = id;

    messages.innerHTML = "";

    if (chat.messages.length === 0) {

        messages.appendChild(welcome);

        welcome.style.display = "block";

    } else {

        welcome.style.display = "none";

        chat.messages.forEach(message => {

            addMessageToScreen(
                message.role,
                message.content,
                false
            );

        });

    }


    chatTitle.textContent = chat.title;

    renderHistory();

    scrollToBottom();
}


/* =========================================================
   CLEAR HISTORY
========================================================= */

clearHistoryBtn?.addEventListener("click", () => {

    if (state.chats.length === 0) {
        return;
    }


    const confirmed = confirm(
        "Delete all chat history?"
    );


    if (!confirmed) return;


    state.chats = [];

    state.currentChatId = null;

    saveChats();

    newChat();

});


/* =========================================================
   MESSAGE DISPLAY
========================================================= */

function addMessageToScreen(
    role,
    content,
    scroll = true
) {

    welcome.style.display = "none";


    const message = document.createElement("div");

    message.className =
        `message ${role}`;


    const avatar = document.createElement("div");

    avatar.className = "avatar";

    avatar.textContent =
        role === "user"
            ? "Z"
            : "S";


    const body = document.createElement("div");

    body.className = "message-body";


    const contentBox = document.createElement("div");

    contentBox.className =
        "message-content";


    contentBox.innerHTML =
        formatMessage(content);


    const meta = document.createElement("div");

    meta.className = "message-meta";

    meta.textContent =
        role === "user"
            ? "You"
            : "SoftLance AI";


    body.appendChild(contentBox);

    body.appendChild(meta);

    message.appendChild(avatar);

    message.appendChild(body);

    messages.appendChild(message);


    if (scroll) {
        scrollToBottom();
    }
}


/* =========================================================
   MESSAGE FORMATTER
========================================================= */

function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}


function formatMessage(text) {

    if (!text) {
        return "";
    }


    let safe = escapeHTML(text);


    /*
       Code blocks
    */

    safe = safe.replace(
        /```([\s\S]*?)```/g,
        function(match, code) {

            return `
                <pre><code>${code.trim()}</code></pre>
            `;

        }
    );


    /*
       Bold text
    */

    safe = safe.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );


    /*
       Bullet points
    */

    safe = safe.replace(
        /^[•*-]\s+(.*)$/gm,
        "<li>$1</li>"
    );


    safe = safe.replace(
        /(<li>.*<\/li>)/gs,
        "<ul>$1</ul>"
    );


    /*
       Line breaks
    */

    safe = safe.replace(
        /\n/g,
        "<br>"
    );


    return safe;
}


/* =========================================================
   TYPING INDICATOR
========================================================= */

function showTyping() {

    removeTyping();


    const message = document.createElement("div");

    message.id = "typingMessage";

    message.className =
        "message assistant";


    message.innerHTML = `
        <div class="avatar">S</div>

        <div class="message-body">

            <div class="message-content">

                <div class="typing">

                    <i></i>
                    <i></i>
                    <i></i>

                </div>

            </div>

        </div>
    `;


    messages.appendChild(message);

    scrollToBottom();
}


function removeTyping() {

    const typing =
        document.getElementById(
            "typingMessage"
        );


    if (typing) {
        typing.remove();
    }
}


/* =========================================================
   SEND MESSAGE
========================================================= */

async function sendMessage(text) {

    text = text.trim();


    if (!text) {
        return;
    }


    if (state.loading) {
        return;
    }


    state.loading = true;

    sendBtn.disabled = true;

    statusText.textContent =
        "Thinking...";


    /*
       Create chat
    */

    const chat =
        getOrCreateChat(
            text.substring(0, 40)
        );


    /*
       First message becomes title
    */

    if (
        chat.messages.length === 0
    ) {

        chat.title =
            text.substring(0, 40);

    }


    /*
       Save user message
    */

    chat.messages.push({
        role: "user",
        content: text
    });


    addMessageToScreen(
        "user",
        text
    );


    input.value = "";

    resizeTextarea();


    showTyping();


    try {

        /*
           FormData allows PDF + message
        */

        const formData =
            new FormData();


        formData.append(
            "message",
            text
        );


        if (state.selectedFile) {

            formData.append(
                "pdf",
                state.selectedFile
            );

        }


        /*
           Django request
        */

        const response =
            await fetch(
                API_URL,
                {
                    method: "POST",
                    body: formData
                }
            );


        /*
           Check HTTP error
        */

        if (!response.ok) {

            throw new Error(
                `Server returned ${response.status}`
            );

        }


        /*
           Convert response to JSON
        */

        const data =
            await response.json();


        console.log(
            "Django response:",
            data
        );


        /*
           Remove typing
        */

        removeTyping();


        /*
           Accept common Django response names
        */

        const answer =
            data.assistant_response ||
            data.response ||
            data.answer ||
            data.message ||
            data.content ||
            data.reply;


        if (!answer) {

            throw new Error(
                "Django returned no answer."
            );

        }


        /*
           Save AI message
        */

        chat.messages.push({
            role: "assistant",
            content: answer
        });


        /*
           Display AI answer
        */

        addMessageToScreen(
            "assistant",
            answer
        );


        /*
           Save chat
        */

        saveChats();

        renderHistory();


    } catch (error) {

        console.error(
            "Chat error:",
            error
        );


        removeTyping();


        let errorMessage =
            "Sorry, I couldn't connect to the AI server.";


        if (
            error.message.includes("404")
        ) {

            errorMessage =
                "API endpoint not found. Check API_URL in app.js.";

        }


        if (
            error.message.includes("500")
        ) {

            errorMessage =
                "Django returned a server error. Check your Django terminal.";

        }


        addMessageToScreen(
            "assistant",
            errorMessage
        );

    } finally {

        state.loading = false;

        sendBtn.disabled = false;

        statusText.textContent = "";

    }

}


/* =========================================================
   FORM SUBMIT
========================================================= */

form?.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        sendMessage(
            input.value
        );

    }
);


/* =========================================================
   ENTER KEY
========================================================= */

input?.addEventListener(
    "keydown",
    function(event) {

        /*
           Enter = send
           Shift + Enter = new line
        */

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            form.requestSubmit();

        }

    }
);


/* =========================================================
   TEXTAREA AUTO RESIZE
========================================================= */

function resizeTextarea() {

    input.style.height = "auto";

    input.style.height =
        Math.min(
            input.scrollHeight,
            140
        ) + "px";

}


input?.addEventListener(
    "input",
    resizeTextarea
);


/* =========================================================
   PDF UPLOAD
========================================================= */

pdfInput?.addEventListener(
    "change",
    function() {

        const file =
            pdfInput.files[0];


        if (!file) {
            return;
        }


        /*
           Only PDF
        */

        const isPDF =
            file.type === "application/pdf" ||
            file.name
                .toLowerCase()
                .endsWith(".pdf");


        if (!isPDF) {

            alert(
                "Please select a PDF file."
            );

            pdfInput.value = "";

            return;
        }


        /*
           Store selected PDF
        */

        state.selectedFile = file;


        /*
           Show preview
        */

        filePreview.innerHTML = `

            <div class="file-chip">

                <span>📄</span>

                <strong>
                    ${escapeHTML(file.name)}
                </strong>

                <span>
                    ${formatFileSize(file.size)}
                </span>

                <button
                    type="button"
                    id="removeFile"
                >
                    ×
                </button>

            </div>

        `;


        document
            .getElementById("removeFile")
            ?.addEventListener(
                "click",
                clearFile
            );

    }
);


/* =========================================================
   CLEAR PDF
========================================================= */

function clearFile() {

    state.selectedFile = null;

    pdfInput.value = "";

    filePreview.innerHTML = "";

}


/* =========================================================
   FILE SIZE
========================================================= */

function formatFileSize(bytes) {

    if (bytes === 0) {
        return "0 B";
    }


    const units = [
        "B",
        "KB",
        "MB",
        "GB"
    ];


    const index =
        Math.floor(
            Math.log(bytes) /
            Math.log(1024)
        );


    return (
        bytes /
        Math.pow(1024, index)
    ).toFixed(index === 0 ? 0 : 1)
    + " "
    + units[index];

}


/* =========================================================
   QUICK PROMPTS
========================================================= */

document
    .querySelectorAll(
        ".quick-actions button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                input.value =
                    button.dataset.prompt ||
                    button.textContent;


                resizeTextarea();

                input.focus();

            }
        );

    });


/* =========================================================
   SETTINGS
========================================================= */

settingsBtn?.addEventListener(
    "click",
    function() {

        settingsModal.classList.remove(
            "hidden"
        );

    }
);


closeSettings?.addEventListener(
    "click",
    function() {

        settingsModal.classList.add(
            "hidden"
        );

    }
);


settingsModal?.addEventListener(
    "click",
    function(event) {

        if (
            event.target === settingsModal
        ) {

            settingsModal.classList.add(
                "hidden"
            );

        }

    }
);


/* =========================================================
   DELETE ALL FROM SETTINGS
========================================================= */

deleteAllBtn?.addEventListener(
    "click",
    function() {

        const confirmed =
            confirm(
                "Delete all chat history?"
            );


        if (!confirmed) {
            return;
        }


        state.chats = [];

        state.currentChatId = null;

        saveChats();

        newChat();

        settingsModal.classList.add(
            "hidden"
        );

    }
);


/* =========================================================
   DARK MODE
========================================================= */

darkMode?.addEventListener(
    "change",
    function() {

        document.body.classList.toggle(
            "dark",
            darkMode.checked
        );


        localStorage.setItem(
            "softlance_dark",
            darkMode.checked
                ? "1"
                : "0"
        );

    }
);


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

menuBtn?.addEventListener(
    "click",
    function() {

        sidebar.classList.toggle(
            "open"
        );

    }
);


/* =========================================================
   SCROLL
========================================================= */

function scrollToBottom() {

    requestAnimationFrame(
        function() {

            messages.scrollTop =
                messages.scrollHeight;

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

function initialize() {

    /*
       Dark mode
    */

    if (
        localStorage.getItem(
            "softlance_dark"
        ) === "1"
    ) {

        document.body.classList.add(
            "dark"
        );

        if (darkMode) {
            darkMode.checked = true;
        }

    }


    /*
       Load latest chat
    */

    if (state.chats.length > 0) {

        loadChat(
            state.chats[0].id
        );

    } else {

        state.currentChatId = null;

        renderHistory();

    }


    resizeTextarea();

}


/* =========================================================
   START
========================================================= */

initialize();