import React from 'react'
import './App.css'

export default function CurrencyRow(props) {
    
    return (
       
        <div>
            <input className="input"type="text" value={props.Amount} onChange={props.changeAmount}></input>
            
            <select className="select" value={props.currency} onChange={props.changeCurrency}>
           {props.currencyList.map(currency=>(
               <option name={currency} key={currency} value={currency}>{currency}</option>
           ))}
            </select>

        </div>
    )
}
