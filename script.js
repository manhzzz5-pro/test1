const chat = document.getElementById('chat');
const form = document.getElementById('form');
const msgInput = document.getElementById('msg');
const modelSel = document.getElementById('model');
const apiUrlInput = document.getElementById('apiUrl');
const apiKeyInput = document.getElementById('apiKey');

apiUrlInput.value = localStorage.getItem('apiUrl') || '';
apiKeyInput.value = localStorage.getItem('apiKey') || '';
apiUrlInput.addEventListener('change', () => localStorage.setItem('apiUrl', apiUrlInput.value));
apiKeyInput.addEventListener('change', () => localStorage.setItem('apiKey', apiKeyInput.value));

function addMessage(text, cls) {
  const div = document.createElement('div');
  div.className = 'msg ' + cls;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = msgInput.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  msgInput.value = '';
  const apiUrl = apiUrlInput.value.trim();
  const apiKey = apiKeyInput.value.trim();
  if (!apiUrl || !apiKey) {
    addMessage('Vui lòng nhập API URL và API key.', 'bot');
    return;
  }
  try {
    const res = await fetch(apiUrl.replace(/\/$/, '') + '/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
      body: JSON.stringify({ model: modelSel.value, messages: [{ role: 'user', content: text }] })
    });
    const data = await res.json();
    addMessage(data.choices?.[0]?.message?.content || 'Không có phản hồi.', 'bot');
  } catch (err) {
    addMessage('Lỗi: ' + err.message, 'bot');
  }
});