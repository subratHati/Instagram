document.getElementById('userForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password })
  });

  const result = await response.json();
  document.getElementById('responseMsg').innerText = result.message;
});
