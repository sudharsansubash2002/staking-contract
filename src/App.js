// Importing modules
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {tokenaddress1,abi1,tokenaddress2,abi2,stakingaddress,abi3} from "./abi";
import web3 from "./web3";
import {useRef} from "react";



function App() {

// usetstate for storing and retrieving wallet details
const [data, setdata] = useState({
	address: "",
	Balance: null,
});

const[amount,setAmount]=useState("");
const[amount1,setAmount1]=useState("");
const inputamt=useRef(null);
const inputamt1=useRef(null);

const erc20contract1 = new web3.eth.Contract(abi1, tokenaddress1);
const erc20contract2 = new web3.eth.Contract(abi2, tokenaddress2);
const stakingcontract = new web3.eth.Contract(abi3, stakingaddress);




// Button handler button for handling a
// request event for metamask
const btnhandler = () => {

	// Asking if metamask is already present or not
	if (window.ethereum) {

	// res[0] for fetching a first wallet
	window.ethereum
		.request({ method: "eth_requestAccounts" })
		.then((res) => accountChangeHandler(res[0]));
	} else {
	alert("install metamask extension!!");
	}
};
const stake = async(val)=>{
    console.log("Transfering....",val);
	
    const accounts = await  web3.eth.getAccounts();
    await stakingcontract.methods.stake(web3.utils.toBN(val*1000000000000000000)).send({from:accounts[0]});
    
  }
  function handle() {
    console.log(inputamt.current.value);
	
    let f=inputamt.current.value;
	
    setAmount(f*1000000000000000000);
    stake(f);
  }

const unstake = async(val1)=>{
    console.log("Transfering....",val1);
	
    const accounts = await  web3.eth.getAccounts();
    await stakingcontract.methods.withdraw(web3.utils.toBN(val1*1000000000000000000)).send({from:accounts[0]});
    
  }
  function handle1() {
    console.log(inputamt1.current.value);
	
    let h=inputamt1.current.value;
	
    setAmount1(h*1000000000000000000);
    unstake(h);
  }

// getbalance function for getting a balance in
// a right format with help of ethers
const getbalance = (address) => {

	// Requesting balance method
	window.ethereum
	.request({
		method: "eth_getBalance",
		params: [address, "latest"]
	})
	.then((balance) => {
		// Setting balance
		setdata({
		Balance: ethers.utils.formatEther(balance),
		});
	});
};

// Function for getting handling all events
const accountChangeHandler = (account) => {
	// Setting an address data
	setdata({
	address: account,
	});

	// Setting a balance
	getbalance(account);
};
	  	
const reward = async()=>{
	console.log("claiming reward..");
	const accounts = await web3.eth.getAccounts();

	await stakingcontract.methods.getReward().send({from:accounts[0]});
	
		  }
         const approve = async()=>{
			const accounts = await  web3.eth.getAccounts();
			await erc20contract1.methods.approve("0x0aD6710743b1D63b280F3a77B2609E5F6A11545c",web3.utils.toBN(100000000000000000000)).send({from:accounts[0]});
			await erc20contract2.methods.approve("0x0aD6710743b1D63b280F3a77B2609E5F6A11545c",web3.utils.toBN(100000000000000000000)).send({from:accounts[0]});
			
				  }

	  
		  
	

return (
	<div className="App">
	{/* Calling all values which we
	have stored in usestate */}

	<Card className="text-center">
		<Card.Header>
		<strong>Address: </strong>
		{data.address}
		</Card.Header>
		<Card.Body>
		<Card.Text>
			<strong>Balance: </strong>
			{data.Balance}
		</Card.Text>
		<Button onClick={btnhandler} variant="primary">
			Connect to wallet
		</Button>
		
		
		
		<br/>
		<br/>
		<Button onClick={approve} >
		approve
		</Button><br/><br/>
		<h2>Stake Amount</h2>
		<br/>
		
		
     <label>Amount</label>&nbsp;&nbsp;<input ref={inputamt}
        type="text"
        id="amt"
        name="amt"/>&nbsp;&nbsp;
     <button onClick={handle}>Stake</button>
     <p>{amount}</p><br/><br/>
		<h2>Unstake Amount</h2>
		<br/>
		
		
     <label>Amount</label>&nbsp;&nbsp;<input ref={inputamt1}
        type="text"
        id="amt"
        name="amt"/>&nbsp;&nbsp;
     <button onClick={handle1}>Unstake</button>
     <p>{amount1}</p>

	 <br/>
		<br/>
		<Button onClick={reward} >
		get reward
		</Button>
		
		</Card.Body>
	</Card>
	</div>
);

}
export default App;

