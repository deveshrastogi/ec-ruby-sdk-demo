import React, { Component } from 'react'
import styles from '../styles/Generic.css'
import Tagline from '../components/Tagline'
import logo from '../components/JuspayLogo'
import Loader from '../components/Loader'

var wallet_list = ["Loading"];
var popupAttrs = "height=440,width=800,left=200,top=150,location=1,status=1,scrollbars=1,screenX=200"

class WalletBalance extends Component {
	render () {
		return (
				<div>
					<label className={styles.text} style={{color: '#62BF5D', fontSize: '13px'}}>&#8377;{this.props.balance}</label>
				</div>
			)
	}
}

export default class WalletPayment extends Component {

	constructor(props) {
		super(props);
		this.state = {
			PAYTM : '',
			FREECHARGE : '',
			MOBIKWIK : '',
			powerWallets : false,
			showLoader: true
		}
	}

	componentWillMount = () => {
		var newObj = {}
		newObj['showLoader'] = false
		var customerId = this.props.location.query.customerId;
		$.get('/list_wallets', {"customer_id": customerId}, function(data){
			var walletsList = JSON.parse(data).wallets;
			wallet_list.splice(0);
			if(walletsList && walletsList.length>0){
				walletsList.forEach(function(w){
					w = JSON.parse(w)
					newObj['powerWallets'] = true;
					newObj[w.wallet] = w
				});
			}
			this.setState(newObj);
		}.bind(this));
	}

	refreshBalances = () => {
		this.setState({PAYTM: '', FREECHARGE: '', MOBIKWIK: ''})
		var newObj = {}
		wallet_list.splice(0);
		wallet_list.push("Loading");
		var customerId = this.props.location.query.customerId;
		$.get('/refresh_wallets', {"customer_id": customerId}, function(data){
			var walletsList = JSON.parse(data).wallets;
			wallet_list.splice(0);
			if(walletsList && walletsList.length>0){
				walletsList.forEach(function(w){
					w = JSON.parse(w)
					newObj[w.wallet] = w
				});
			}
			this.setState(newObj);
		}.bind(this));
	}

	handlePayment = (e) => {
		e.preventDefault();
		var sec_window = window.open("", "_blank", popupAttrs)
		sec_window.document.write(logo)
		var payment_method = document.querySelector('input[name="powerWallets"]:checked').value
		var wallet = this.state[payment_method]
		var params = {
			"order_id" : this.props.routeParams.orderId,
			"payment_method_type" : "WALLET",
			"payment_method" : payment_method,
			"redirect_after_payment" : "true"

		};
		if(wallet) {
			params["direct_wallet_token"] = wallet.token;
		}
		$.get('/create_txn',params, function(data){
			var data = JSON.parse(data)
			if(data.url){
				sec_window.location.replace(data.url)
			}
		});
	}
	
  	render () {
  		if(this.state.showLoader) {
  			return (<div><Loader>Fetching Wallets. Please Wait...</Loader></div>)
  		}
  		var amount = this.props.location.query.amount
  		var tagline =  'Select your wallet to proceed. Total amount payable: \u20b9 ' + amount
  		var mobikwikBalance = ''
  		var paytmBalance = ''
  		var freechargeBalance = ''
  		var refreshBalanceButton = null
  		if(this.state.powerWallets) {
  			refreshBalanceButton = <a className={styles.btnRefresh} onClick={this.refreshBalances}><span className="glyphicon glyphicon-refresh"></span> Refresh Balance</a>
  		}
  		if(this.state.MOBIKWIK){
  			mobikwikBalance = <WalletBalance balance={this.state.MOBIKWIK.current_balance} />
  		}
  		if(this.state.PAYTM){
  			paytmBalance = <WalletBalance balance={this.state.PAYTM.current_balance} />
  		}
  		if(this.state.FREECHARGE){
  			freechargeBalance = <WalletBalance balance={this.state.FREECHARGE.current_balance} />
  		}
  		return(
			<div>
				<Tagline message={tagline} />
				{refreshBalanceButton}
				<div style={{marginTop: '5px', marginLeft: '5px'}}><h4>Wallets Payment</h4></div>
				<hr style={{marginTop : '-5px'}}/>
				<div style={{marginTop: '5px',marginLeft: '5px',marginBottom: '10px'}} className="radio">
					<label className={styles.text} style={{fontSize: "15px"}}><input type="radio" name="powerWallets" value="MOBIKWIK" />MOBIKWIK WALLET</label><label style={{marginLeft: '-30px'}}>{mobikwikBalance}</label>
				</div>
				<div style={{marginTop: '5px',marginLeft: '5px',marginBottom: '10px'}} className="radio">
					<label className={styles.text} style={{fontSize: "15px"}}><input type="radio" name="powerWallets" value="PAYTM" />PAYTM WALLET</label><label style={{marginLeft: '-30px'}}>{paytmBalance}</label>
				</div>
				<div style={{marginTop: '5px',marginLeft: '5px',marginBottom: '10px'}} className="radio">
					<label className={styles.text} style={{fontSize: "15px"}}><input type="radio" name="powerWallets" value="FREECHARGE" />FREECHARGE WALLET</label><label style={{marginLeft: '-30px'}}>{freechargeBalance}</label>
				</div>
				<div className="form-group">
				    	<button type="submit" className={styles.btnPri} onClick={this.handlePayment}>Continue</button>
				</div>
			</div>
			)
  	}
}