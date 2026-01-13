// 1. Пытаемся загрузить данные из памяти браузера. 
// Если там пусто, создаем пустой массив.
let subscriptions = JSON.parse(localStorage.getItem('my_subs')) || [];

// Ждем, пока весь HTML полностью загрузится, прежде чем что-то делать
document.addEventListener('DOMContentLoaded', () => {
    render(); // Отрисовываем то, что было сохранено ранее
});

function addSubscription() {
    const nameInput = document.getElementById('name');
    const priceInput = document.getElementById('price');
    
    const name = nameInput.value;
    const price = parseFloat(priceInput.value);

    if (name === '' || isNaN(price)) {
        alert("Пожалуйста, введи название и цену!");
        return;
    }

    const newSub = {
        id: Date.now(),
        name: name,
        price: price
    };

    subscriptions.push(newSub);
    
    // Сохраняем обновленный массив в память браузера
    saveToLocalStorage();

    nameInput.value = '';
    priceInput.value = '';
    render();
}

function saveToLocalStorage() {
    // LocalStorage умеет хранить только строки, поэтому превращаем массив в строку JSON
    localStorage.setItem('my_subs', JSON.stringify(subscriptions));
}

function render() {
    const list = document.getElementById('sub-list');
    const totalDisplay = document.getElementById('total-price');
    
    // ПРОВЕРКА: Если список не найден в HTML, выходим из функции, чтобы не было ошибки
    if (!list) return;

    list.innerHTML = '';
    let total = 0;

    subscriptions.forEach(sub => {
        const li = document.createElement('li');
        li.innerHTML =  `
            <span>${sub.name}</span>
            <span>${sub.price} руб.</span>
            <button onclick="deleteSub(${sub.id})" style="padding: 5px; background: red; font-size: 10px;">X</button>
        `;
        list.appendChild(li);
        total += sub.price;
    });

    totalDisplay.innerText = total;
}

// Добавим функцию удаления (бонус!)
function deleteSub(id) {
    // 1. Находим все элементы <li> на странице
    const items = document.querySelectorAll('li');
    
    // 2. Ищем именно тот <li>, в котором кнопка с нужным id
    items.forEach(li => {
        // Проверяем, содержит ли кнопка в этом li вызов deleteSub с нашим id
        if (li.innerHTML.includes(`deleteSub(${id})`)) {
            // 3. Добавляем класс анимации
            li.classList.add('fade-out');
            
            // 4. Ждем завершения анимации (400мс), а затем удаляем из данных и экрана
            setTimeout(() => {
                subscriptions = subscriptions.filter(sub => sub.id !== id);
                saveToLocalStorage();
                render();
            }, 400);
        }
    });
}

const category = document.getElementById('category').value;

const newSub = {
    id: Date.now(),
    name: name,
    price: price,
    currency: document.getElementById('currency').value,
    category: category // Сохраняем категорию
};  

li.innerHTML = `
    <div style="display: flex; flex-direction: column;">
        <small style="color: #888; font-size: 11px;">${sub.category || 'Общее'}</small>
        <strong style="color: #333;">${sub.name}</strong>
    </div>
    <div style="display: flex; align-items: center; gap: 15px;">
        <span style="font-weight: bold; color: #4a00e0;">${sub.price} ${sub.currency || '₽'}</span>
        <button class="delete-btn" onclick="deleteSub(${sub.id})">✕</button>
    </div>
`;