
let subscriptions = JSON.parse(localStorage.getItem('my_subs')) || [];


document.addEventListener('DOMContentLoaded', () => {
    render(); 
});

function addSubscription() {
    const nameInput = document.getElementById('name');
    const priceInput = document.getElementById('price');
    const categoryInput = document.getElementById('category');
    const dateInput = document.getElementById('date-input'); 
    const currencyInput = document.getElementById('currency-input'); 

    const name = nameInput.value;
    const price = parseFloat(priceInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;
    const currency = currencyInput.value; 

    if (name === '' || isNaN(price)) {
        alert("Пожалуйста, введи название и цену!");
        return;
    }

    const newSub = {
        id: Date.now(),
        name: name,
        price: price,
        category: category,
        date: date,
        currency: currency 
    };

    subscriptions.push(newSub);
    saveToLocalStorage();
    
    
    nameInput.value = '';
    priceInput.value = '';
    dateInput.value = ''; 
    
    render();
}

function saveToLocalStorage() {
    
    localStorage.setItem('my_subs', JSON.stringify(subscriptions));
}

function render() {
    const list = document.getElementById('sub-list');
    const totalDisplay = document.getElementById('total-price');
    const totalYearDisplay = document.getElementById('total-year-price'); 
    
    if (!list) return;

    list.innerHTML = '';
    let total = 0;

    subscriptions.forEach(sub => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div style="display: flex; flex-direction: column;">
                <small style="color: gray; font-size: 10px;">${sub.category}</small>
                <strong>${sub.name}</strong>
                <small style="color: #666; font-size: 10px;">📅 Платеж: ${sub.date || 'не указан'}</small>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <span>${sub.price} руб.</span>
                <button class="delete-btn" onclick="deleteSub(${sub.id})">✕</button>
            </div>
        `;
        list.appendChild(li);
        total += sub.price;
    });

    // 2. Выводим месячную сумму
    totalDisplay.innerText = total;

    // 3. Считаем и выводим годовую сумму (умножаем на 12)
    const totalYear = total * 12;
    totalYearDisplay.innerText = totalYear;
}

// Добавим функцию удаления 
function deleteSub(id) {
    // 1. Находим все элементы <li> на странице
    const items = document.querySelectorAll('li');
    
    // 2. Ищем именно тот <li>, в котором кнопка с нужным id
    items.forEach(li => {
        
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
    category: category 
};  

li.innerHTML = `
    <div style="display: flex; flex-direction: column;">
        <small style="color: #888; font-size: 11px;">${sub.category || 'Общее'}</small>
        <strong style="color: #333;">${sub.name}</strong>
        <small style="color: #777;">Платеж: ${sub.date || 'не указан'}</small>
    </div>
    <div style="display: flex; align-items: center; gap: 15px;">
        <span style="font-weight: bold; color: #4a00e0;">${sub.price} ${sub.currency || '₽'}</span>
        <button class="delete-btn" onclick="deleteSub(${sub.id})">✕</button>
    </div>
`;

function addSubscription() {
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date-input').value; 

    if (!name || isNaN(price)) return alert("Заполни поля!");

    const newSub = { id: Date.now(), name, price, category, date };
    subscriptions.push(newSub);
    saveToLocalStorage();
    render();
}