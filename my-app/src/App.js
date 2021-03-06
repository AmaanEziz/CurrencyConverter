import React, {useEffect, useState} from 'react'
import './App.css'
import CurrencyRow from './CurrencyRow.js'

function App() {
  
  
   async function getcurrencyList(){//Uses public API to get a list of all currencies that will be used
    try{
      let apiCall= await fetch("https://api.exchangeratesapi.io/latest?");
      let apiJSON=await apiCall.json();
      let currencies=[apiJSON.base,...Object.keys(apiJSON.rates)]
    return currencies;}
    catch(error){console.log(error)}
  }
  

  const [currencyList,setcurrencyList]=useState(()=>{
    getcurrencyList.then(data=>{return data});
  });
  const [fromCurrency,setfromCurrency]=useState("EUR");
  const [toCurrency,settoCurrency]=useState("USD");
  const [fromAmount,setfromAmount]=useState("1");
  const [toAmount,settoAmount]=useState();


  async function convert(){//Does conversion calculations and updates toCurrency accordingly
    let exchangeRate;
    try{
    let url=`https://api.exchangeratesapi.io/latest?symbols=${toCurrency}&base=${fromCurrency}`;
    let apiCall=await fetch(url);
    let json=await apiCall.json();
    exchangeRate=json.rates[toCurrency];}
    catch (error){/*Bad request only happens when to and from currencies are 
      the same so the exchangeRate must be 1 in that case*/
      exchangeRate=1;
    }
    let convertedAmount=fromAmount*exchangeRate;
    settoAmount(convertedAmount);
   
  }



  useEffect(()=>{
    getcurrencyList().then(data=>{
      setcurrencyList(data);
    });
  }
  ,[])
  
  useEffect(()=>{
    convert();
  },[fromCurrency,fromAmount,toCurrency])

  return (
  <>
  <img className="Img"
  src="https://www.ebony.com/wp-content/uploads/2016/07/foreign_money_background_original_7575.jpg"></img>


  <div className="Body">
  <span className="title">Currency Converter</span>

    <CurrencyRow currencyList={currencyList} 
    curency={fromCurrency}
    changeCurrency={e=>{
      setfromCurrency(e.target.value);
    }}
    Amount={fromAmount}
    changeAmount={e=>{
      setfromAmount(e.target.value);
    }}/>

    <h2>=</h2>

    <CurrencyRow currencyList={currencyList} 
    currency={toCurrency}
    changeCurrency={e=>{
      settoCurrency(e.target.value)
    }}
    Amount={toAmount}/>
</div>
  </>
  );
}

export default App;
