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
    let todayDate = new Date().toISOString();
    event.preventDefault();
    let Debit = {
      amount: event.target.amount.value,
      date: todayDate,
      description: event.target.description.value,
      id: todayDate
    }
    props.addDebit(Debit);
    event.target.reset();
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
        <input type="number" name="amount" />
        <button type="submit">Add Debit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  )
}

export default Debits;