const list = document.getElementById('list');
const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') ? localStorageTransactions : [];

function addTransactionDOM(transaction){
  const sign = transaction.amount >= 0 ? '+' : '-';

  let item = document.createElement('li');
  item.classList.add(sign === '+' ? 'plus' : 'minus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button 
      class="delete-btn" 
      onClick="removeTransaction(${transaction.id})"
    >x</button>
  `;
  list.appendChild(item);
}

function addTransaction(e){
  e.preventDefault();

  if(text.value.trim() && amount.value.trim()){
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };
    transactions.push(transaction);
    init();
  }
  else{
    alert('Please Enter all fields.');
  }
  text.value = '';
  amount.value = '';
}

function removeTransaction(id){
  transactions = transactions.filter(item => item.id !== id);
  init();
}

function generateID(){
  return Math.floor(Math.random() * 10000000);
}

function updateValues(){
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts
                .reduce((acc, amount) => (acc += amount), 0)
                .toFixed(2);
  const income = amounts
                  .filter(item => item > 0)
                  .reduce((acc, item) => (acc += item), 0)
                  .toFixed(2);
  const expense = amounts
                    .filter(item => item < 0)
                    .reduce((acc, item) => (acc += item), 0)
                    .toFixed(2);
  
  balance.innerHTML = `$${total}`;                  
  moneyPlus.innerHTML = `+$${income}`;
  moneyMinus.innerHTML = `-$${Math.abs(expense)}`;
}

function updateLocalStorage(){
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init(){
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
  updateLocalStorage();
}

form.addEventListener('submit', addTransaction);

init();