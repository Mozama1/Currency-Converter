import { countryList } from './countrycodes.js';

const apiKey = '92cc5b36c3a23ebb03c90ae4';
const baseUrl = 'https://v6.exchangerate-api.com/v6';
const fromCurrency = document.querySelector('select[name="from"]');
const toCurrency = document.querySelector('select[name="to"]');
const amount = document.getElementById('enterAmount');
const convertBtn = document.querySelector('.output');
const result = document.querySelector('.msg');
const fromFlag = document.querySelector('.from .select-container img');
const toFlag = document.querySelector('.to .select-container img');

function setupCurrencies() {
    for (let currency in countryList) {
        fromCurrency.add(new Option(currency, currency));
        toCurrency.add(new Option(currency, currency));
    }
    fromCurrency.value = 'USD';
    toCurrency.value = 'PKR';
    updateFlags();
};

function updateFlags() {
    fromFlag.src = `https://flagsapi.com/${countryList[fromCurrency.value]}/flat/64.png`;
    toFlag.src = `https://flagsapi.com/${countryList[toCurrency.value]}/flat/64.png`;
};

async function convertCurrency() {
    const inputVal = parseFloat(amount.value);
    if (!inputVal ||inputVal<= 0) {
        result.textContent = 'Enter a valid amount';
        return;
    }

    try {
        const response = await fetch(`${baseUrl}/${apiKey}/latest/${fromCurrency.value}`);
        const data = await response.json();
        if (data.result !== 'success') throw new Error('Error fetching rates');
        const rate = data.conversion_rates[toCurrency.value];
        const outputVal = (inputVal * rate).toFixed(2);
        result.textContent = `${inputVal} ${fromCurrency.value} = ${outputVal} ${toCurrency.value}`;
    } catch (error) {
        result.textContent = 'Cannot convert right now';
    }
};

fromCurrency.addEventListener('change', updateFlags);
toCurrency.addEventListener('change', updateFlags);
convertBtn.addEventListener('click', (e) => {
    e.preventDefault(); // if button is inside the form
    convertCurrency();
});

// Start
setupCurrencies();

                       //SHORT WAY
// import { countryList } from './jscoincodes13.js';

// const apiKey = '92cc5b36c3a23ebb03c90ae4';
// const baseUrl = 'https://v6.exchangerate-api.com/v6';
// const fromCurr =document.querySelector('select[name="from"]');
// const toCurr =document.querySelector('select[name="to"]');
// const amount =document.getElementById('enterAmount');
// const convertBtn = document.querySelector('.output');
// const result = document.querySelector('.msg');
// const fromFlag = document.querySelector('.from .select-container img');
// const toFlag= document.querySelector('.to .select-container img');

// function currOptions () {
// for(let currency in countryList){
//     fromCurr.add(new Option(currency, currency));
//     toCurr.add(new Option(currency, currency));
// }
// fromCurr.value='USD';
// toCurr.value='PKR';
// updateFlags();
// };

// function updateFlags(){
//     fromFlag.src=`https://flagsapi.com/${countryList[fromCurr.value]}/flat/64.png`;
//     toFlag.src=`https://flagsapi.com/${countryList[toCurr.value]}/flat/64.png`;
// };
 
// async function convertCurrency(){
//     const inputVal = parseFloat(amount.value);

//   const response = await fetch (`${baseUrl}/${apiKey}/latest/${fromCurr.value}`);
//   const data = await response.json();
//   const rate = data.conversion_rates[toCurr.value];

//   const outputVal=(inputVal * rate).toFixed(2);

// result.textContent= `${inputVal} ${fromCurr.value} = ${outputVal} ${toCurr.value}`;
// };

// fromCurr.addEventListener('change', updateFlags);
// toCurr.addEventListener('change', updateFlags);
// convertBtn.addEventListener('click', (e)=>{
//     e.preventDefault();
//     convertCurrency();
// });
// currOptions();


