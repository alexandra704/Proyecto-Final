const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');

const progressData = {
  1: { percent: 85, topics: 5, stars: '4/5' },
  2: { percent: 70, topics: 4, stars: '3/4' },
  3: { percent: 60, topics: 5, stars: '3/5' }
};

const modalData = {
  u1t1: {
    title: 'Modelo de Von Neumann y Harvard',
    body: 'El modelo de Von Neumann usa una sola memoria para programas y datos. El modelo Harvard separa memoria de datos y memoria de instrucciones, permitiendo operaciones más rápidas y seguras.'
  },
  u1t2: {
    title: 'Sistemas Operativos',
    body: 'Un sistema operativo administra el hardware, coordina procesos, gestiona archivos y controla los recursos para que las aplicaciones funcionen correctamente.'
  },
  u1t3: {
    title: 'Sistemas de Numeración',
    body: 'Los sistemas de numeración traducen información en diferentes bases. El binario usa base 2, el octal base 8 y el hexadecimal base 16.'
  },
  u1t4: {
    title: 'Aritmética Binaria',
    body: 'En aritmética binaria se suman y restan números usando solo 0 y 1. Es la base de las operaciones internas en circuitos digitales.'
  },
  u1t5: {
    title: 'Álgebra de Boole',
    body: 'El álgebra de Boole estudia operadores lógicos como AND, OR y NOT. Su aplicación es clave en los circuitos digitales y en el diseño de lógica computacional.'
  },
  u2t1: {
    title: 'Algoritmos y sus Características',
    body: 'Un algoritmo es un conjunto de pasos ordenados y claros para resolver un problema. Debe ser finito, preciso, efectivo y generar un resultado.'
  },
  u2t2: {
    title: 'Diagramas de Flujo',
    body: 'Los diagramas de flujo representan visualmente el proceso de un algoritmo. Usan símbolos para decisiones, entradas, salidas y procesos.'
  },
  u2t3: {
    title: 'Pseudocódigo',
    body: 'El pseudocódigo usa texto estructurado para describir la lógica de un algoritmo sin depender de un lenguaje de programación específico.'
  },
  u2t4: {
    title: 'Modelado de Problemas',
    body: 'El modelado de problemas transforma una situación real en un conjunto de pasos y reglas que se pueden programar o analizar.'
  },
  u3t1: {
    title: 'Lenguajes y Paradigmas',
    body: 'Los lenguajes de programación definen la sintaxis y las reglas para crear software. Los paradigmas, como imperativo y orientado a objetos, son formas distintas de estructurar programas.'
  },
  u3t2: {
    title: 'Introducción a Python',
    body: 'Python es un lenguaje moderno, sencillo y muy utilizado. Es ideal para aprender programación por su sintaxis clara y su amplia comunidad.'
  },
  u3t3: {
    title: 'Operadores',
    body: 'Los operadores permiten realizar cálculos y comparaciones. En Python hay operadores aritméticos, relacionales, lógicos y de asignación.'
  },
  u3t4: {
    title: 'Estructuras Condicionales',
    body: 'Las estructuras condicionales como if, else y elif permiten decidir qué pasos ejecutar según una condición.'
  },
  u3t5: {
    title: 'Estructuras Repetitivas',
    body: 'Las estructuras repetitivas permiten repetir acciones. Python usa bucles for y while para iterar sobre listas y ejecutar código varias veces.'
  }
};

const botAnswers = {
  unidad1: 'La Unidad 1 cubre los fundamentos de la computación: arquitecturas de Von Neumann y Harvard, sistemas operativos, numeración, aritmética binaria y álgebra de Boole.',
  unidad2: 'En la Unidad 2 aprendiste sobre algoritmos, diagramas de flujo, pseudocódigo y cómo modelar problemas para resolverlos con un proceso claro.',
  unidad3: 'La Unidad 3 aborda programación, incluyendo paradigmas, Python, operadores y estructuras de control como condicionales y bucles.'
};

function updateProgress() {
  Object.entries(progressData).forEach(([unit, data]) => {
    const bar = document.getElementById(`progress-bar-${unit}`);
    const percent = document.getElementById(`progress-percent-${unit}`);
    if (bar) bar.style.width = `${data.percent}%`;
    if (percent) percent.textContent = `${data.percent}%`;
  });
  document.getElementById('unit1-progress').style.width = '85%';
  document.getElementById('unit2-progress').style.width = '70%';
  document.getElementById('unit3-progress').style.width = '60%';
}

function openModal(id) {
  const item = modalData[id] || {
    title: 'Contenido no disponible',
    body: 'Este tema aún no cuenta con información adicional. Prueba otro tema para ver más detalles.'
  };
  modalBody.innerHTML = `
    <h3>${item.title}</h3>
    <p>${item.body}</p>
  `;
  modal.classList.add('open');
}

function closeModal() {
  modal.classList.remove('open');
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  navMenu.classList.remove('active');
}

function setActiveNav() {
  const offset = window.innerHeight * 0.22;
  document.querySelectorAll('section[id]').forEach(section => {
    const top = section.getBoundingClientRect().top + window.scrollY - offset;
    const bottom = top + section.offsetHeight;
    const scrollPosition = window.scrollY;
    const link = document.querySelector(`.nav-link[data-section='${section.id}']`);
    if (link) {
      link.classList.toggle('active', scrollPosition >= top && scrollPosition < bottom);
    }
  });
}

function sendQuestion() {
  const text = chatbotInput.value.trim();
  if (!text) return;
  addChatMessage('user', text);
  chatbotInput.value = '';
  setTimeout(() => {
    addChatMessage('bot', buildBotResponse(text));
  }, 550);
}

function askQuestion(text) {
  addChatMessage('user', text);
  setTimeout(() => {
    addChatMessage('bot', buildBotResponse(text));
  }, 550);
}

function addChatMessage(role, text) {
  const message = document.createElement('div');
  message.className = `message ${role === 'bot' ? 'bot-message' : 'user-message'}`;
  message.innerHTML = `<p>${text}</p>`;
  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function buildBotResponse(text) {
  const query = text.toLowerCase();
  if (query.includes('unidad 1')) return botAnswers.unidad1;
  if (query.includes('unidad 2')) return botAnswers.unidad2;
  if (query.includes('unidad 3')) return botAnswers.unidad3;
  if (query.includes('python')) return 'Python es un lenguaje de programación claro y versátil. Si quieres, puedo darte ejemplos sencillos de código.';
  if (query.includes('condicional')) return 'Las estructuras condicionales permiten ejecutar acciones según si una condición es verdadera o falsa. En Python se usan if, elif y else.';
  return '¡Excelente pregunta! Revisa las unidades y vuelve a consultarme si quieres más detalles sobre algún tema específico.';
}

hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
window.addEventListener('scroll', setActiveNav);
window.addEventListener('DOMContentLoaded', () => {
  updateProgress();
  setActiveNav();
});
window.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});
