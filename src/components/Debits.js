/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';


const Debits = (props) => {
  // Create the list of Debit items
  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    })
  }

  const handleSubmit = (event) =>{
    
    event.preventDefault();
    let date = new Date().toISOString();
    let tempid = ''; // temporary id holder
    let source = 'qwertyuiopasdfghjklzxcvbnm1234567890'; // create a source string
    for (let i = 0; i < 8; i++) {
      tempid += source[Math.floor(Math.random() * (source.length) )];
    }
    tempid += '-';
    for (let i = 0; i < 4; i++) {
      tempid += source[Math.floor(Math.random() * (source.length) )];
    }
    tempid += '-';
    for (let i = 0; i < 4; i++) {
      tempid += source[Math.floor(Math.random() * (source.length) )];
    }
    tempid += '-';
    for (let i = 0; i < 4; i++) {
      tempid += source[Math.floor(Math.random() * (source.length) )];
    }
    tempid += '-';
    for (let i = 0; i < 12; i++) {
      tempid += source[Math.floor(Math.random() * (source.length) )];
    } //Generate random id

    let Debit = { //create new json object
      amount: event.target.amount.value,
      date: date,
      description: event.target.description.value,
      id: tempid
    }
    
    props.addDebit(Debit); // add the debit object to the list
    event.target.reset(); // reset the input form
  }

  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>
      
      <AccountBalance accountBalance={props.accountBalance}/>
      <br/>
      {debitsView()}

      <form onSubmit={e => {handleSubmit(e)} }>
        <input type="text" name="description" />
        <input type="number" name="amount" step=".01"/>
        <button type="submit">Add Debit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  )
}

export default Debits;