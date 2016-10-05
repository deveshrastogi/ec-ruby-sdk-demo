import React, { Component } from 'react'
import styles from '../styles/Generic.css'
import Tagline from '../components/Tagline'
import logo from '../components/JuspayLogo'
import Loader from '../components/Loader'

var card_list = ["Loading"];
var popupAttrs = "height=440,width=800,left=200,top=150,location=1,status=1,scrollbars=1,screenX=200";

class CvvForm extends Component {

	render () {		
		return (
				<form>
					<input type="password" className="sm_inp" style={{marginTop: '2px'}} placeholder="CVV" id={this.props.card_token} />
				</form>
				);
	}
}

class EachCard extends Component {

	constructor (props) {
		super(props)
    	this.state = { showCvv:false, cardDeleted:false};
  	}

	selectedCard = () => {
		var radioButton = document.getElementById("radio"+this.props.ctoken);
		if(radioButton.checked) {
			this.setState({showCvv: true})
		}
		else {
			this.setState({showCvv: false})
		}
	}

	deleteCard = () => {
		this.setState({cardDeleted:true});
		var card_token = this.props.ctoken
		$.get('/delete_card',{"card_token": card_token}, function(data){
			var data = JSON.parse(data);
		});
	}

	render () {
		var cvv = "Loading ..."
		if (this.state.showCvv){
			cvv = <CvvForm card_token={this.props.ctoken} />;
		}else{
			cvv = null;
		}
		if(this.state.cardDeleted){
			return(<div></div>)
		}
		else{
			return (
				<div style={{marginTop: '5px',marginLeft: '5px'}} className="radio">
					<label className={styles.text} style={{fontSize: "15px", paddingRight: "150px"}}><input type="radio" name="saved_cards" onClick={this.selectedCard} value={this.props.ctoken} id={"radio"+this.props.ctoken}/>{this.props.c}</label> <a onClick={this.deleteCard} style={{color: 'red', cursor: 'Pointer'}}>Delete</a>
	      			{cvv}
      			</div>
			);
		}
	}
}

class ListCards extends Component {

	constructor(props) {
		super(props);

		this.state = {
			cards : card_list,
			cards_available : false,
			showLoader : true
		}
	}

	componentWillMount = () => {
		$.get('/list_cards',{"customer_id": this.props.customerId}, function(data){
			var data = JSON.parse(data);
			var cardsList = data.cards;
			var cards_available = false;
			var showLoader = true;
			card_list.splice(0);
			if(cardsList && cardsList.length>0){
				cardsList.forEach(function(c){
					c = JSON.parse(c)	
					cards_available = true		
					card_list.push({'ctoken':c.token,'cno':c.number});
					showLoader = false;
				});
			}
			else{
				showLoader = false;
				card_list.push("No Cards Available")
			}
			this.setState({cards:card_list, cards_available : cards_available, showLoader: showLoader});
		}.bind(this));
	}

	handlePayment = (e) => {	
		e.preventDefault();
		var sec_window = window.open("", "_blank", popupAttrs)
		sec_window.document.write(logo)
		var card_token = document.querySelector('input[name="saved_cards"]:checked').value;
		var cvv = document.getElementById(card_token).value
		var params = {
			"order_id" : this.props.orderId,
			"card_token" : card_token,
			"card_security_code" : cvv,
			"payment_method_type" : "CARD",
			"redirect_after_payment" : "true"
		}
		$.get('/create_txn',params, function(data){
			var data = JSON.parse(data)
			if(data.url) {
				sec_window.location.replace(data.url)
			}
		});
	}

	render () {
		if(this.state.showLoader) {
  			return (<div><Loader>Fetching Saved Cards. Please Wait...</Loader></div>)
  		}
		var cards = [];
		this.state.cards.forEach(function(card){
			if(card!="Loading" && card!="No Cards Available"){
				cards.push(<EachCard ctoken={card.ctoken} c={card.cno} orderId={this.props.orderId}/>);
			} else if(card=="No Cards Available") {
				cards.push(<div className="alert alert-danger">Sorry, No saved cards availabe.</div>)
			}
		}.bind(this));
		
		if(this.state.cards_available) {
			return (
				<div>
					<ul className="list-group">
						{cards}
					</ul>
					<button className={styles.btnPri} onClick = {this.handlePayment}>Continue</button>
				</div>
			);
		}
		else {
			return (
				<div>
					{cards}
				</div>
			);
		}
	}

}

class CardPaymentForm extends Component {

	constructor (props) {
		super(props)
		this.state = {
				order_id : this.props.orderId,
				card_number : "",
				name_on_card : "",
				card_exp_month : "",
				card_exp_year : "",
				card_security_code : "",
				save_to_locker : "false",
				payment_method_type : "CARD",
				redirect_after_payment : "true"
			}
	}

	handleCardNumberChange = (e) => {
		var cardNumber = e.target.value.replace(/ /g, '');
		if (cardNumber.length > 0){
			cardNumber = cardNumber.match(new RegExp('.{1,4}', 'g')).join(' ');
		}
		this.setState({card_number: cardNumber});

	}
	handleNameOnCardChange = (e) => {
   		this.setState({name_on_card: e.target.value});
	}
	handleCardMonthChange = (e) => {
   		this.setState({card_exp_month: e.target.value});
	}
	handleCardYearChange = (e) => {
   		this.setState({card_exp_year: e.target.value});
	}
	handleSecurityCodeChange = (e) => {
   		this.setState({card_security_code: e.target.value});
	}
	handleSaveToLockerChange = (e) => {
   		this.setState({save_to_locker: e.target.checked});
	}

	handlePayment = (e) => {
		e.preventDefault();
        var sec_window = window.open("", "_blank", popupAttrs)
		sec_window.document.write(logo)
		var params = JSON.parse(JSON.stringify(this.state))
		$.get('/create_txn',params, function(data){
			var data = JSON.parse(data)
			if(data.url) {
				sec_window.location.replace(data.url)
			}
		});
	}

	range (start, count) {
      return Array.apply(0, Array(count))
        .map(function (element, index) { 
          return index + start;  
      });
    }

	render (){
		return (
				<div>
	                <div className={styles.order}>
	                  	<div className={styles.inputBlock}>
	                    	<input autofocus className={styles.input} type="tel" maxLength="23" value={this.state.card_number} onChange={this.handleCardNumberChange} required/>
	                    	<div className={styles.label}>Card Number</div>
	                	</div>
		                <div className={styles.monthYearClass}>
			                <div className={styles.text}>Expiry Date</div>
			                <div className="form-group">
				                <select className="form-control" style={{width: '20%', display: 'inline-block'}} onChange={this.handleCardMonthChange} defaultValue="MM">
			                      <option value="MM" disabled>MM</option>
			                      {() => {
			                       return this.range(1,12).map((x) => {
			                         return <option key={x} value={x}>{x}</option>;
			                       })
			                      }()}
			                      
			                    </select>
			                    <select className="form-control" style={{width: '20%',display: 'inline-block', marginLeft: '5px'}} onChange={this.handleCardYearChange} defaultValue="YYYY">
			                      <option value="YYYY" className={styles.placeholder} disabled>YYYY</option>
			                      {() => {
			                       return this.range(2016,20).map((x) => {
			                         return <option key={x} value={x}>{x}</option>;
			                       })
			                      }()}
		                    </select>
		                    </div>
			            </div>
			            <div className={styles.cvvClass} >
		                    <input id="cvv" type="password" inputMode="numeric" className={styles.input}
		                      maxLength="4" name="cvv" onChange={this.handleSecurityCodeChange} required/>
		                    <div className={styles.label}>CVV</div>
		                </div>
		                <div className={styles.text} style={{marginTop: "20px"}}>
					   		<input type="checkbox" onChange = {this.handleSaveToLockerChange} /> Save card information
						</div>
		                <button className={styles.btnPri} onClick={this.handlePayment}>Continue</button>
		                <div style={{marginTop: "20px"}}></div>
		            </div>
		        </div>
			);
	}
}

class Tabs extends Component {

	render () {
		return(		
			<ul className="nav nav-tabs">
				<li className="active">
					<a href="#saved" aria-controls="saved" data-toggle="tab">
						Saved Cards
					</a>
				</li>
				<li>
					<a href="#new" aria-controls="new" data-toggle="tab">
						New Card
					</a>
				</li>
			</ul>
			);
	}
}

class TabContent extends Component {

	render () {		
		return (
				<div className="tab-content">
					<div role="tabpanel" className="tab-pane fade in active" id="saved">
						<ListCards customerId={this.props.customerId} orderId={this.props.orderId}/>
					</div>
					<div role="tabpanel" className="tab-pane fade" id="new">
						<CardPaymentForm orderId={this.props.orderId} />
					</div>
				</div>
			);
	}
}

export default class CardPayment extends Component {
	
  	render () {
  		var customerId = this.props.location.query.customerId
  		var amount = this.props.location.query.amount
  		var orderId = this.props.routeParams.orderId
		var tagline =  'Enter your card details to proceed. Total amount payable: \u20b9 ' + amount.toString()
  		return(
			<div>
				<Tagline message={tagline} />
				<Tabs />
				<TabContent customerId={customerId} orderId={orderId} />
			</div>
			)
  	}
}