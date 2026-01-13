let subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];

function saveToLocalStorage() {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
}

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

function deleteSub(id) {
    subscriptions = subscriptions.filter(sub => sub.id !== id);
    saveToLocalStorage();
    render();
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
        li.innerHTML =  `
            <div style="display: flex; flex-direction: column;">
                <small style="color: gray; font-size: 10px;">${sub.category}</small>
                <strong>${sub.name}</strong>
                <small style="color: #666; font-size: 10px;">📅 Платеж: ${sub.date || 'не указан'}</small>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <span>${sub.price} ${sub.currency || 'руб.'}</span>
                <button class="delete-btn" onclick="deleteSub(${sub.id})">✕</button>
            </div>
        `;
        list.appendChild(li);
        total += sub.price;
    });

    
    totalDisplay.innerText = total;
    if (totalYearDisplay) {
        totalYearDisplay.innerText = total * 12;
    }
}

render();