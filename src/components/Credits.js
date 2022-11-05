/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

const Credits = (props) => {
  // Create the list of credit items
  let creditsView = () => {
    const { credits } = props;
    return credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
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

    let credit = { //create new json object
      amount: event.target.amount.value,
      date: date,
      description: event.target.description.value,
      id: tempid
    }
    
    props.addCredit(credit); // add the credit object to the list
    event.target.reset(); // reset the input form
  }
  return (
    <div>
      <h1>Credits</h1>
      <AccountBalance accountBalance={props.accountBalance}/>
      <br/>
      {creditsView()}

      <form onSubmit={e => {handleSubmit(e)} }>
        <input type="text" name="description" />
        <input type="number" name="amount" step=".01"/>
        <button type="submit">Add credit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  )
}

export default Credits;