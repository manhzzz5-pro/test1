const chat = document.getElementById('chat');
const form = document.getElementById('form');
const msgInput = document.getElementById('msg');
const modelSel = document.getElementById('model');

function addMessage(text, cls) {
  const div = document.createElement('div');
  div.className = 'msg ' + cls;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = msgInput.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  msgInput.value = '';
  setTimeout(() => {
    addMessage(`[${modelSel.value}] Demo trả lời: ${text}`, 'bot');
  }, 400);
});
