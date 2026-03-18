const LIMIT = 10000;
const CURRENCY = 'руб.';
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_red';

const inputNode = document.querySelector('.js-expense-input');
const buttonNode = document.querySelector('.js-expense-button');
const historyNode = document.querySelector('.js-expense-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');
const categoryNode = document.querySelector('.js-category');
const clearButtonNode = document.querySelector('.js-clear-button');
const changeLimitNode = document.querySelector('.js-change-limit');

let limit = LIMIT; // теперь лимит можно менять


clearButtonNode.addEventListener('click', function() {
    expenses.length = 0; // очищаем массив
    render(expenses);
});

changeLimitNode.addEventListener('click', function() {
    const newLimit = prompt('Введите новый лимит');

    if (newLimit === null) {
        return;
    }

    limit = parseInt(newLimit);
    limitNode.innerText = limit;

    render(expenses);
});


const expenses = [];

init(expenses);



buttonNode.addEventListener('click', function() {
    const expense = getExpanseFromUser();
    
    if (expense === null) {
      return;
    }
    
     trackExpanse(expense.amount, expense.category);

     render(expenses);
});

function init(expenses) {
limitNode.innerText = LIMIT;
statusNode.innerText = STATUS_IN_LIMIT;
sumNode.innerText = calculateExpanses(expenses);
};

function trackExpanse(amount, category) {
   expenses.push({
      amount: amount,
      category: category
   });
}

function getExpanseFromUser() {
   if (inputNode.value === '') {
        return null;
    }

    const amount = parseInt(inputNode.value);
    const category = categoryNode.value;

    clearInput();

    return {
      amount: amount,
      category: category
    };
}

function clearInput() {
   inputNode.value = '';
}

function calculateExpanses(expenses) {
   let sum = 0;

     expenses.forEach(item => {
        sum += item.amount;
     });

     return sum;
}

function render(expenses) {
   const sum = calculateExpanses(expenses);

   renderHistory(expenses);
   renderSum(sum);
   renderStatus(sum);
}

function renderHistory(expenses) {
    let expensesListHTML = '';

    expenses.forEach(item => {
        expensesListHTML += `
        <li>
        ${item.amount} ${CURRENCY} — ${item.category}
        </li>
        `;
    });

     historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}

function renderSum(sum) {
   sumNode.innerText = sum;
}

function renderStatus(sum) {
    if (sum <= limit) {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
     } else {
      const over = sum - limit;

        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (-${over} ${CURRENCY})`;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
     }
}