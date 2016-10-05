import React, { Component } from 'react'
import styles from '../styles/PaymentEnd.css'
import Banner from '../components/Banner'

export default class Failure extends Component {

	retryPayment = () => {
	    var amount = this.props.location.query.amount;
        var orderId = this.props.location.query.orderId;
        var customerId = this.props.location.query.customerId;
		window.location.href = "#/order/:orderId/paymentmethods?amount=".replace(':orderId',orderId) + amount +'&customerId=' + customerId
	}

    render () {
        
        var icon =  "ion-close-circled";
        var titleMessage =  "Payment Failed";
        var recieptMsg = "Amount to be Paid";
        var appendPaymentEndDesc = "has failed.";
        var amount = this.props.location.query.amount;
        var txnId = this.props.location.query.orderId;

        return (
            <div className={styles.paymentEndWrapper}>
                <Banner>
                    <div className={styles.paymentEndTitleFailed}>
                        <span className={styles.paymentEndTitleIcon}><span className={icon}></span></span>
                        <span className={styles.paymentEndTitleName}>{titleMessage}</span>
                    </div>
                    <div className={styles.paymentEndDesc}>
                        Your payment of <b style={{textDecoration: "none"}}>&#8377; {amount}</b>,
                            towards transaction ID: <b style={{textDecoration: "none"}}>{txnId}</b>, {appendPaymentEndDesc}
                    </div>
                    <div>
	                    <center>
	                        <div style={{width: '200px'}}>
	                            <button className={styles.paymentBtn} onClick={this.retryPayment}>Retry Payment</button>
	                        </div>
	                    </center>
	                    <p style={{marginTop: '10px', color: 'gray', fontSize: '13px'}}>
	                        For clarifications contact support@juspay.in
	                    </p>
                    </div>
                </Banner>
                <div className={styles.paymentEndReciept}>
                    <div className={styles.paymentEndRecieptTitle}>
                        Payment Reciept
                    </div>
                    <div className={styles.paymentEndRecieptBody}>
                        <div className={styles.paymentEndRecieptBodyLeft}>
                            {recieptMsg}
                        </div>
                        <div className={styles.paymentEndRecieptBodyRight}>
                             &#8377; {amount}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}