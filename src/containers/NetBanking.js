import React, { Component } from 'react'
import styles from '../styles/Generic.css'
import Tagline from '../components/Tagline'
import logo from '../components/JuspayLogo'

var popupAttrs = "height=440,width=800,left=200,top=150,location=1,status=1,scrollbars=1,screenX=200"

export default class NetBanking extends Component {

	handlePayment = (e) => {
		e.preventDefault();
		var sec_window = window.open("", "_blank", popupAttrs)
		sec_window.document.write(logo)
		var payment_method = document.getElementById("payment_method").value
		var params = {
		"order_id" : this.props.routeParams.orderId,
		"payment_method_type" : "NB",
		"payment_method" : payment_method,
		"redirect_after_payment" : "true"
		}
		$.get('/create_txn',params, function(data){
			var data = JSON.parse(data)
			sec_window.location.replace(data.url)
		});

	}

	render (){

  		var amount = this.props.location.query.amount
		var tagline =  'Select your bank to proceed. Total amount payable: \u20b9 ' + amount.toString()
		return(
			<div>
				<Tagline message={tagline} />
                <div className="form-group">
    				<select id="payment_method" className="form-control" style={{width: '100%', marginTop: '20px', marginBottom: '20px'}} defaultValue="Select Bank">
    	            	<option value="SB" noselect>Select Bank</option>
                        <option disabled>----</option>
    	            	<option value="NB_AXIS">AXIS</option>
    	            	<option value="NB_HDFC">HDFC</option>
    	            	<option value="NB_SBI">SBI</option>
    	            </select>
                </div>
				<button type="submit" className={styles.btnPri} onClick={this.handlePayment}>Continue</button>
			</div>

		);
	}
}