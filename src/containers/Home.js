import React, { Component } from 'react'
import styles from '../styles/Generic.css'
import Loader from '../components/Loader'
import Tagline from '../components/Tagline'

export default class Home extends Component {

	constructor (props) {

		super(props);
		if(localStorage.getItem('parameters')){
			this.state = JSON.parse(localStorage.getItem('parameters'))
		}
		else {
			this.state = {
				amount : "",
				customer_phone : "",
				customer_email : "",
				customer_id : "",
				showLoader : false
			}
		}
	}

	amountChange = (event) => {
		this.setState({amount:event.target.value})
	}

	mobileChange = (event) => {
		this.setState({customer_phone:event.target.value})
	}

	emailChange = (event) => {
		this.setState({customer_email:event.target.value})
	}

	customerIdChange = (event) => {
		this.setState({customer_id:event.target.value})
	}

	submitAmount = () => {
		this.setState({showLoader:true})
		var orderId = '';
		var url = '#/order/:orderId/paymentmethods?amount='+this.state.amount.toString()+'&customerId='+this.state.customer_id
		localStorage.setItem('parameters', JSON.stringify(this.state));
		var params = JSON.parse(JSON.stringify(this.state))
		$.get('/order_create',params, function(data){
			var data = JSON.parse(data)
			orderId = JSON.parse(data.order).order_id
			url = url.replace(':orderId',orderId)
			window.location.href = url;
		});
	}
	
  	render () {
  		var tagline = "Welcome to Juspay API demo ! Please create your order"
  		if(this.state.showLoader){
  			return(<div><Loader>Creating Order. Please Wait...</Loader></div>);
  		}
	   	return (
	       <div>
	       		<Tagline message={tagline} />
				<div className={styles.order}>
					<div className={styles.text}>ORDER CREATION</div>
					<div className={styles.inputBlock}>
	                    <input autoFocus id="amount" name="amount"
	                      className={styles.input} type="tel" onChange={this.amountChange} value={this.state.amount} required/>
	                    <div className={styles.label}>Amount</div>
	                </div>
	                <div className={styles.inputBlock}>
	                    <input className={styles.input} type="tel" onChange={this.mobileChange} value={this.state.customer_phone} required/>
	                    <div className={styles.label}>Mobile Number</div>
	                </div>
	                <div className={styles.inputBlock}>
	                    <input className={styles.input} type="tel" onChange={this.emailChange} value={this.state.customer_email} required/>
	                    <div className={styles.label}>Email</div>
	                </div>
	                <div className={styles.inputBlock}>
	                    <input className={styles.input} type="tel" onChange={this.customerIdChange} value={this.state.customer_id} required/>
	                    <div className={styles.label}>Customer Id</div>
	                </div>
                	<button className={styles.btnPri} onClick={this.submitAmount}>Continue</button>
	                <div style={{marginTop: "20px"}}></div>
	        	</div>
        	</div>
	    );
  	}
}