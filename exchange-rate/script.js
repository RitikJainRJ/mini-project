const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');

const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const swap = document.getElementById('swap');
const rateEl = document.getElementById('rate');

function updateAmount(){
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currency_two];
      
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  updateAmount();
});

currencyEl_one.addEventListener('change', updateAmount);
currencyEl_two.addEventListener('change', updateAmount);
amountEl_one.addEventListener('input', updateAmount);
amountEl_two.addEventListener('input', updateAmount);

updateAmount();