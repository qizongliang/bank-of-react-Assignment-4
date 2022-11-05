/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';// send asynchronous HTTP requests to RestfulEndpoint

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance:0,
      debits: [],
      credits: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    }
  }
  async componentDidMount(){
    let totalCredits = 0;
    let totalDebits = 0; 

    try {
      let response = await axios.get('https://moj-api.herokuapp.com/credits'); // axio fetch the data

      this.setState({credits: response.data}); // sets the data to the CreditList 
      // Calculate how many credit is added to the account
      for (let credit of this.state.credits) { 
        totalCredits += credit.amount;
      }
    }
    catch (error) { // if there is any error then create response and console.log the status of the error response
      if (error.response) {
        console.log(error.response.status); 
      }
    }

    try{
      let response = await axios.get('https://moj-api.herokuapp.com/debits');
      console.log(response); 
      this.setState({debits: response.data});
      for(let debit of this.state.debits){
        totalDebits -= debit.amount;
      }
    }catch(error){
      if (error.response) {
        console.log(error.response.status); 
      }
    }
    let balance = totalCredits + totalDebits;

    this.setState({accountBalance:Math.round(balance * 100) / 100});

  }

  addCredit = (credit) => {
    let temp = {}; // generate a temp object
    temp.id = credit.id;
    temp.description = credit.description;
    temp.amount = Math.round(credit.amount* 100)/100;
    temp.date = credit.date;

    let currentCredits = this.state.credits; // create a new list so that it can be used to replace the old list
    currentCredits.push(temp);
    this.setState({credit: currentCredits});
    // Update the account balance
    let newBalance = Number(this.state.accountBalance) + Number(credit.amount); // create new balance

    this.setState({accountBalance: Math.round(newBalance * 100) / 100}); // set the new balance to the current balance
  }

  addDebit = (Debit) => {
    let temp = {}; // generate a temp object
    temp.id = Debit.id;
    temp.description = Debit.description;
    temp.amount = Math.round(Debit.amount* 100)/100;
    temp.date = Debit.date;

    let currentDebits = this.state.debits; // create a new list so that it can be used to replace the old list
    currentDebits.push(temp);
    this.setState({debits: currentDebits});
    // Update the account balance
    let newBalance = Number(this.state.accountBalance) - Number(Debit.amount); // create new balance

    this.setState({accountBalance: Math.round(newBalance * 100) / 100}); // set the new balance to the current balance
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const DebitsComponent = () => (<Debits debits={this.state.debits} accountBalance={this.state.accountBalance} addDebit = {this.addDebit}/> )
    const CreditsComponent = () => (<Credits credits={this.state.credits} accountBalance={this.state.accountBalance} addCredit = {this.addCredit}/>)

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-example-code-gh-pages">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;