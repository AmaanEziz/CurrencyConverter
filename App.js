import React, {useEffect, useState} from 'react'
import './App.css'
import CurrencyRow from './CurrencyRow.js'

function App() {

  const [currencyList,setcurrencyList]=useState([""]);
  const [fromCurrency,setfromCurrency]=useState("EUR");
  const [toCurrency,settoCurrency]=useState("USD");
  const [fromAmount,setfromAmount]=useState("1");
  const [toAmount,settoAmount]=useState();


  
  async function getcurrencyList(){
    try{
      let apiCall= await fetch("https://api.exchangeratesapi.io/latest?");
      let apiJSON=await apiCall.json();
      let currencies=[apiJSON.base,...Object.keys(apiJSON.rates)]
    return currencies;}
    catch(error){console.log(error)}
  }



  async function convert(){
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
  //

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
