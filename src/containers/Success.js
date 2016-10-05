import React, { Component } from 'react'
import styles from '../styles/PaymentEnd.css'
import Banner from '../components/Banner'

class Success extends Component {

	makeTransaction () {
		window.location.href = '#/'
	}

    render () {

        var icon =  "ion-ios-checkmark";
        var titleMessage =  "Payment Success";
        var recieptMsg = "Amount Paid";
        var appendPaymentEndDesc = "is successful.";
        var amount = this.props.location.query.amount;
        var txnId = this.props.location.query.orderId;


        return (
            <div className={styles.paymentEndWrapper}>
                <Banner>
                    <div className={styles.paymentEndTitleSuccess}>
                        <span className={styles.paymentEndTitleIcon}><span className={icon}></span></span>
                        <span className={styles.paymentEndTitleName}>{titleMessage}</span>
                    </div>
                    <div className={styles.paymentEndDesc}>
                        Your payment of <b style={{textDecoration: "none"}}>&#8377; {amount}</b>,
                            towards transaction ID: <b style={{textDecoration: "none"}}>{txnId}</b>, {appendPaymentEndDesc} To make another transaction, Click below.
                    </div>
                    <div>
	                    <center>
                            <div style={{width: '200px'}}>
                                <button className={styles.paymentBtn} onClick={this.makeTransaction}>Make Another Payment</button>
                            </div>
                        </center>
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

export default Success