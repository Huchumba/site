const apiUrlUsers = 'https://666143d063e6a0189fe90cbf.mockapi.io/users';
const apiUrlProducts = 'https://666143d063e6a0189fe90cbf.mockapi.io/products';

// Элементы для пользователей
const userForm = document.getElementById('userForm');
const userIdInput = document.getElementById('userId');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('email');
const pointInput = document.getElementById('point');
const userList = document.getElementById('userList');
const addUserButton = document.getElementById('addUserButton');
const cancelButton = document.getElementById('cancelButton');

// Элементы для товаров
const productForm = document.getElementById('productForm');
const productIdInput = document.getElementById('productId');
const nameInput = document.getElementById('name');
const titleInput = document.getElementById('title');
const priceInput = document.getElementById('price');
const modelInput = document.getElementById('model');
const ratingInput = document.getElementById('rating');
const reliabilityInput = document.getElementById('reliability');
const productList = document.getElementById('productList');
const addProductButton = document.getElementById('addProductButton');
const productCancelButton = document.getElementById('productCancelButton');

// Переключение вкладок
const usersTabButton = document.getElementById('usersTabButton');
const productsTabButton = document.getElementById('productsTabButton');

usersTabButton.addEventListener('click', showUsersTab);
productsTabButton.addEventListener('click', showProductsTab);
addUserButton.addEventListener('click', showAddUserForm);
cancelButton.addEventListener('click', hideUserForm);
addProductButton.addEventListener('click', showAddProductForm);
productCancelButton.addEventListener('click', hideProductForm);

document.addEventListener('DOMContentLoaded', fetchUsers);

const themeToggleButton = document.getElementById('themeToggleButton');

themeToggleButton.addEventListener('click', toggleTheme);

userForm.addEventListener('submit', handleFormSubmit);

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    document.querySelector('.sidebar').classList.toggle('dark-theme');
    document.querySelector('.main-content').classList.toggle('dark-theme');

    // Изменяем текст кнопки
    if (document.body.classList.contains('dark-theme')) {
        themeToggleButton.innerText = 'Светлая тема';
    } else {
        themeToggleButton.innerText = 'Темная тема';
    }
}

function showUsersTab() {
    document.getElementById('pageTitle').innerText = 'Управление пользователями';
    userForm.style.display = 'none';
    document.getElementById('productSection').style.display = 'none'; // Скрываем секцию товаров
    document.getElementById('userTable').style.display = 'table'; // Показываем таблицу пользователей
    addUserButton.style.display = 'block'; // Показываем кнопку "Добавить пользователя"
    document.getElementById('pageTitle').style.display = 'block'
    fetchUsers();
}

function showProductsTab() {
    document.getElementById('productTitle').innerText = 'Управление товарами';
    userForm.style.display = 'none';
    document.getElementById('productSection').style.display = 'block'; // Показываем секцию товаров
    document.getElementById('userTable').style.display = 'none'; // Скрываем таблицу пользователей
    addUserButton.style.display = 'none'; // Скрываем кнопку "Добавить пользователя"
    document.getElementById('pageTitle').style.display = 'none'
    fetchProducts();
}

async function fetchUsers() {
    const response = await fetch(apiUrlUsers);
    const users = await response.json();
    renderUserList(users);
}

function renderUserList(users) {
    userList.innerHTML = '';
    users.forEach(user => {
        const userRow = document.createElement('tr');
        userRow.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.point}</td>
            <td>${user.password}</td>
            <td class="user-action">
                <button onclick="editUser(${user.id})">Редактировать</button>
                <button onclick="deleteUser(${user.id})">Удалить</button>
            </td>
        `;
        userList.appendChild(userRow);
    });
}

async function fetchProducts() {
    const response = await fetch(apiUrlProducts);
    const products = await response.json();
    renderProductList(products);
}

function renderProductList(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const productRow = document.createElement('tr');
        productRow.innerHTML = `
            <td>${product.name}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.model}</td>
            <td>${product.rating}</td>
            <td>${product.reliability}</td>
            <td class="user-action">
                <button onclick="editProduct(${product.id})">Редактировать</button>
                <button onclick="deleteProduct(${product.id})">Удалить</button>
            </td>
        `;
        productList.appendChild(productRow);
    });
}

// Пользователи
async function handleFormSubmit(event) {
    event.preventDefault();
    const userId = userIdInput.value;
    const userData = {
        username: usernameInput.value,
        password: passwordInput.value,
        email: emailInput.value,
        point: pointInput.value,
    };

    if (userId) {
        await updateUser(userId, userData);
    } else {
        await createUser(userData);
    }

    resetUserForm();
    fetchUsers();
}

async function createUser(userData) {
    await fetch(apiUrlUsers, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
}

async function updateUser(userId, userData) {
    await fetch(`${apiUrlUsers}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
}

async function deleteUser(userId) {
    await fetch(`${apiUrlUsers}/${userId}`, {
        method: 'DELETE'
    });
    fetchUsers();
}

function editUser(userId) {
    if (userForm.style.display === 'flex') {
        hideUserForm(); // Если форма уже открыта, скрываем её
    } else {
        fetch(`${apiUrlUsers}/${userId}`)
            .then(response => response.json())
            .then(user => {
                usernameInput.value = user.username;
                passwordInput.value = ''; // пароли не показываем
                emailInput.value = user.email;
                pointInput.value = user.point;
                userIdInput.value = user.id;
                showUserForm(true); // показать форму редактирования
            });
    }
}

function showAddUserForm() {
    if (userForm.style.display === 'flex') {
        hideUserForm(); // Если форма уже открыта, скрываем её
    } else {
        resetUserForm();
        showUserForm(false); // Показываем форму добавления
    }
}

function showUserForm(isEditing) {
    userForm.style.display = 'flex';
    if (isEditing) {
        document.querySelector('#userForm button[type="submit"]').innerText = 'Сохранить';
    } else {
        document.querySelector('#userForm button[type="submit"]').innerText = 'Добавить';
    }
}

function hideUserForm() {
    userForm.style.display = 'none';
}

function resetUserForm() {
    userIdInput.value = '';
    usernameInput.value = '';
    passwordInput.value = '';
    emailInput.value = '';
    pointInput.value = '';
}

// Товары
async function handleProductFormSubmit(event) {
    event.preventDefault();
    const productId = productIdInput.value;
    const productData = {
        name: nameInput.value,
        title: titleInput.value,
        price: priceInput.value,
        model: modelInput.value,
        rating: ratingInput.value,
        reliability: reliabilityInput.value,
    };

    if (productId) {
        await updateProduct(productId, productData);
    } else {
        await createProduct(productData);
    }

    resetProductForm();
    fetchProducts();
}

async function createProduct(productData) {
    await fetch(apiUrlProducts, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    });
}

async function updateProduct(productId, productData) {
    await fetch(`${apiUrlProducts}/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    });
}

async function deleteProduct(productId) {
    await fetch(`${apiUrlProducts}/${productId}`, {
        method: 'DELETE'
    });
    fetchProducts();
}

function editProduct(productId) {
    if (productForm.style.display === 'flex') {
        hideProductForm(); // Если форма уже открыта, скрываем её
    } else {
        fetch(`${apiUrlProducts}/${productId}`)
            .then(response => response.json())
            .then(product => {
                nameInput.value = product.name;
                titleInput.value = product.title;
                priceInput.value = product.price;
                modelInput.value = product.model;
                ratingInput.value = product.rating;
                reliabilityInput.value = product.reliability;
                productIdInput.value = product.id;
                showProductForm(true); // показать форму редактирования
            });
    }
}

function showAddProductForm() {
    if (productForm.style.display === 'flex') {
        hideProductForm(); // Если форма уже открыта, скрываем её
    } else {
        resetProductForm();
        showProductForm(false); // Показываем форму добавления
    }
}

function showProductForm(isEditing) {
    productForm.style.display = 'flex';
    if (isEditing) {
        document.querySelector('#productForm button[type="submit"]').innerText = 'Сохранить';
    } else {
        document.querySelector('#productForm button[type="submit"]').innerText = 'Добавить';
    }
}

function hideProductForm() {
    productForm.style.display = 'none';
}

function resetProductForm() {
    productIdInput.value = '';
    nameInput.value = '';
    titleInput.value = '';
    priceInput.value = '';
    modelInput.value = '';
    ratingInput.value = '';
    reliabilityInput.value = '';
}
