// Ініціалізуємо об’єкт formData
let formData = {
  email: '',
  message: '',
};

// Отримуємо посилання на форму
const form = document.querySelector('.feedback-form');

// Функція для збереження даних у локальне сховище
function saveToLocalStorage() {
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

// Перевіряємо наявність даних у локальному сховищі при завантаженні сторінки
function loadFromLocalStorage() {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    formData = JSON.parse(savedData);
    form.elements.email.value = formData.email || '';
    form.elements.message.value = formData.message || '';
  }
}

// Викликаємо функцію завантаження даних з локального сховища
loadFromLocalStorage();

// Відстежуємо введення в поля форми за допомогою делегування
form.addEventListener('input', event => {
  if (event.target.name in formData) {
    formData[event.target.name] = event.target.value;
    saveToLocalStorage();
  }
});

// Обробляємо подію submit
form.addEventListener('submit', event => {
  event.preventDefault(); // Зупиняємо відправлення форми

  // Перевіряємо, чи заповнені всі поля
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  // Виводимо formData у консоль, очищаємо форму та локальне сховище
  console.log(formData);

  // Очищуємо дані
  formData = { email: '', message: '' };
  localStorage.removeItem('feedback-form-state');
  form.reset();
});
