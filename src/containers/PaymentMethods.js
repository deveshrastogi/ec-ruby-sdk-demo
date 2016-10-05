import React, { Component } from 'react'
import styles from '../styles/Generic.css'
import Tagline from '../components/Tagline'

export default class PaymentMethods extends Component {
	
  	render () {
  		var amount = this.props.location.query.amount
  		var customerId = this.props.location.query.customerId
  		var orderId = this.props.routeParams.orderId
	   	var iconClass = "ion ion-ios-arrow-right iconRightArrow"
	    var tagline = "Choose any payment method to continue. Total amount payable is \u20b9 " + amount
	    var params = '?customerId='+customerId + '&amount='+amount
	    var cardroute = '#/order/:orderId/card'.replace(':orderId',orderId) + params
	    var netbankingroute = '#/order/:orderId/netbanking'.replace(':orderId',orderId) + params
	    var walletroute = '#/order/:orderId/wallet'.replace(':orderId',orderId) + params
        return (
        	<div>
        		<Tagline message={tagline} />
	        	<a href={cardroute} className={styles.tab}>
		        	<div className={styles.listView}>
		        		<div className={styles.listOthersItemLargeView}>
		        			CREDIT/DEBIT CARD
		        			<l className={iconClass} style={{float : 'right'}} />
		        		</div>
		        	</div>
	        	</a>
	        	<a href={netbankingroute} className={styles.tab}>
		        	<div className={styles.listView}>
		        		<div className={styles.listOthersItemLargeView}>
		        			NET BANKING
		        			<l className={iconClass} style={{float : 'right'}} />
		        		</div>
		        	</div>
	        	</a>
	        	<a href={walletroute} className={styles.tab}>
		        	<div className={styles.listView}>
		        		<div className={styles.listOthersItemLargeView}>
		        			WALLETS
		        			<l className={iconClass} style={{float : 'right'}} />
		        		</div>
		        	</div>
	        	</a>
        	</div>
        	);
  	}
}