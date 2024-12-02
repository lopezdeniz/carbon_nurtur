document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Останавливаем стандартную отправку формы
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
  
    // Валидация данных
    if (!name || !email || !message) {
      alert('Please fill out all fields.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    // Отправка данных
    try {
      const response = await fetch('http://localhost:8081/send_email.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
    });
      const result = await response.json();
      if (result.success) {
        alert('Message sent successfully!');
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
      console.error(error);
    }
  });
  