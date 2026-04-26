// GMI Tech AI Chatbot - Messenger Style UI (Final Refinement)
(function () {
  const GROK_API_KEY = "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";

  const SYSTEM_PROMPT = `You are GMI AI Assistant for GMI Tech (Ballari & Bangalore). Founded by S Mohammed Ruhan. 
  Services: Web/App Dev, UI/UX, AI Automation. Be concise and friendly. Suggest WhatsApp +91-9036717885 for quotes.`;

  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

    /* Floating Toggle & Online Tooltip */
    #gmi-chatbot-container {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;
    }
    #gmi-online-tooltip {
      background: #ffffff;
      color: #1a1a1a;
      padding: 8px 14px;
      border-radius: 12px;
      font-family: 'Montserrat', sans-serif;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      border: 1px solid #eee;
      position: relative;
      animation: gmi-float 3s ease-in-out infinite;
      white-space: nowrap;
    }
    #gmi-online-tooltip::after {
      content: '';
      position: absolute;
      bottom: -6px;
      right: 20px;
      width: 12px;
      height: 12px;
      background: #fff;
      transform: rotate(45deg);
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }
    @keyframes gmi-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    #gmi-chatbot-toggle {
      width: 60px;
      height: 60px;
      background: #1a6fff;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s cubic-bezier(.4,0,.2,1);
    }
    #gmi-chatbot-toggle:hover { transform: scale(1.1); }
    #gmi-chatbot-toggle svg { width: 28px; height: 28px; fill: white; }

    /* Chat Window */
    #gmi-chatbot-window {
      position: fixed;
      bottom: 110px;
      right: 28px;
      width: 380px;
      height: 550px;
      max-height: 75vh;
      background: #ffffff;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      z-index: 9998;
      box-shadow: 0 15px 50px rgba(0,0,0,0.1);
      overflow: hidden;
      font-family: 'Montserrat', sans-serif;
      opacity: 0;
      pointer-events: none;
      transform: translateY(20px);
      transition: all 0.3s ease;
    }
    #gmi-chatbot-window.open {
      opacity: 1;
      pointer-events: all;
      transform: translateY(0);
    }

    /* Header */
    .gmi-header {
      padding: 18px 20px;
      background: #fff;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .gmi-header-info h3 { margin: 0; font-size: 15px; font-weight: 700; color: #1a1a1a; }
    .gmi-header-status { font-size: 12px; color: #22c55e; display: flex; align-items: center; gap: 6px; font-weight: 500; }
    .gmi-status-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; }

    /* Messages Area */
    .gmi-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px 15px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      background: #fafafa;
    }

    .message { margin-bottom: 2px; width: 100%; }
    .message__outer { display: flex; width: 100%; }
    
    .message--bot .message__inner { flex: 1; display: flex; flex-direction: row; }
    .message--bot .message__bubble {
      background: #f0f0f0;
      color: #0d0d0e;
      border-radius: 18px;
      border-bottom-left-radius: 4px;
      padding: 10px 15px;
      font-size: 14px;
      max-width: 80%;
    }

    .message--user .message__inner { flex: 1; display: flex; flex-direction: row-reverse; }
    .message--user .message__bubble {
      background: #0084ff;
      color: #fff;
      border-radius: 18px;
      border-bottom-right-radius: 4px;
      padding: 10px 15px;
      font-size: 14px;
      max-width: 80%;
    }

    /* Input Footer */
    .gmi-footer {
      padding: 15px;
      background: #fff;
      border-top: 1px solid #eee;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .gmi-input-container {
      flex: 1;
      display: flex;
      align-items: center;
      background: #fff;
      border: 1.5px solid #87888b;
      border-radius: 22px;
      padding: 4px 12px;
      transition: border-color 0.2s;
      outline: none !important;
      box-shadow: none !important;
    }
    .gmi-input-container:focus-within {
      border-color: #0084ff;
      outline: none !important;
      box-shadow: none !important;
    }
    .gmi-input {
      flex: 1;
      border: none !important;
      background: transparent;
      padding: 8px 5px;
      font-size: 14px;
      outline: none !important; /* Forces removal of blue line */
      box-shadow: none !important; /* Forces removal of blue glow */
      font-family: inherit;
    }
    .gmi-send-btn {
      background: none;
      border: none;
      padding: 5px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
      outline: none !important;
    }
    .gmi-send-btn:hover { transform: scale(1.1); }
    .gmi-send-btn svg {
      width: 22px;
      height: 22px;
      fill: #0084ff;
    }
    .gmi-send-btn:disabled svg { fill: #bcc0c4; }

    /* Typing Indicator */
    .typing-dot {
      width: 6px;
      height: 6px;
      background: #90949c;
      border-radius: 50%;
      display: inline-block;
      animation: blink 1s infinite;
      margin: 0 2px;
    }
    @keyframes blink { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }

    @media (max-width: 480px) {
      #gmi-chatbot-window { width: calc(100% - 40px); right: 20px; height: 500px; }
    }
  `;
  document.head.appendChild(style);

  // HTML Structure
  const container = document.createElement("div");
  container.id = "gmi-chatbot-container";
  container.innerHTML = `
    <div id="gmi-online-tooltip">Hello! I'm online</div>
    <button id="gmi-chatbot-toggle">
      <svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.145 2 11.258a8.85 8.85 0 0 0 3.29 6.815.732.732 0 0 1 .23.548l-.013 2.158c-.004.604.63.985 1.14.661l2.45-1.558a.774.774 0 0 1 .537-.083c.783.21 1.61.323 2.466.323 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2z"/></svg>
    </button>
  `;

  const chatWindow = document.createElement("div");
  chatWindow.id = "gmi-chatbot-window";
  chatWindow.innerHTML = `
    <div class="gmi-header">
      <div class="gmi-header-info">
        <h3>GMI AI Assistant</h3>
        <div class="gmi-header-status"><div class="gmi-status-dot"></div> Online</div>
      </div>
    </div>
    <div class="gmi-chat-messages" id="gmi-chat-messages"></div>
    <div class="gmi-footer">
      <div class="gmi-input-container">
        <input type="text" class="gmi-input" id="gmi-input" placeholder="Aa" autocomplete="off" />
        <button class="gmi-send-btn" id="gmi-send">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(container);
  document.body.appendChild(chatWindow);

  const msgContainer = document.getElementById("gmi-chat-messages");
  const input = document.getElementById("gmi-input");
  const sendBtn = document.getElementById("gmi-send");
  const toggleBtn = document.getElementById("gmi-chatbot-toggle");
  const history = [];

  function createMessage(role, text) {
    const isBot = role === "assistant";
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${isBot ? "message--bot" : "message--user"}`;
    msgDiv.innerHTML = `
      <div class="message__outer">
        <div class="message__inner">
          <div class="message__bubble">${text}</div>
        </div>
      </div>
    `;
    msgContainer.appendChild(msgDiv);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  async function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    createMessage("user", text);
    history.push({ role: "user", content: text });

    const typing = document.createElement("div");
    typing.className = "message message--bot";
    typing.id = "gmi-temp-typing";
    typing.innerHTML = `<div class="message__outer"><div class="message__inner"><div class="message__bubble"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div></div></div>`;
    msgContainer.appendChild(typing);
    msgContainer.scrollTop = msgContainer.scrollHeight;

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROK_API_KEY}` },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history]
        })
      });
      const data = await response.json();
      const typingEl = document.getElementById("gmi-temp-typing");
      if(typingEl) typingEl.remove();
      
      const reply = data.choices[0].message.content;
      createMessage("assistant", reply);
      history.push({ role: "assistant", content: reply });
    } catch (e) {
      const typingEl = document.getElementById("gmi-temp-typing");
      if(typingEl) typingEl.remove();
      createMessage("assistant", "Sorry, I'm having trouble connecting.");
    }
  }

  toggleBtn.onclick = () => {
    chatWindow.classList.toggle("open");
    document.getElementById("gmi-online-tooltip").style.display = "none";
    if (chatWindow.classList.contains("open") && history.length === 0) {
      createMessage("assistant", "Hi there! 👋 Welcome to GMI Tech. How can I help you today?");
    }
  };

  sendBtn.onclick = handleSend;
  input.onkeypress = (e) => { if (e.key === "Enter") handleSend(); };
})();