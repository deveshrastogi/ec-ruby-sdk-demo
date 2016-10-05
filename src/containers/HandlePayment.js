import React, { Component } from 'react'
import Loader from '../components/Loader'

export default class Success extends Component {

	componentDidMount () {
		localStorage.removeItem('parameters')
		var orderId = this.props.location.query.orderId
		var status = this.props.location.query.status
		$.get('/order_status',{"order_id": orderId}, function(data){
			var data = JSON.parse(data);		
			var amount = data.amount
			var customerId = data.customerId
			if(status=='CHARGED'){
				window.close()
				window.opener.location.href = '#/success?orderId='+orderId+'&status='+status+ '&amount='+amount
			}
			else{
				window.close()
				window.opener.location.href = '#/failure?orderId='+orderId+'&status='+status+ '&amount='+amount+ '&customerId='+customerId
			}
		});
	}

	render () {
		return (<div><Loader>Redirecting back to merchant's website. Please wait...</Loader></div>)
	}
}