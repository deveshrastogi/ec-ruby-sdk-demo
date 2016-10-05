import React, { Component } from 'react'
import styles from '../styles/Header.css'
import imgSrc from "../static/img/juspay-logo-main-white.png"
import goBack from '../containers/GoBack'

const showBackUrls = ["paymentmethods", "card", "netbanking", "wallet"]

var  backButtonStyle = {
  background: '#2A3540',
  padding: '5px 20px',
  cursor: 'pointer',
  position: 'absolute',
  top: '9px',
  right: '10px',
  borderRadius: '2px'
}

class BackView extends React.Component {
  render () {
    return (<div style={backButtonStyle} onClick={this.props._onClick}>
      <span className="ion-arrow-left-c"></span>
      </div>)
  }
}


export default class Header extends Component {
  componentDidMount = () => {
    window.goBack = this.navigate;
  }

  checkBackButton() {
    var url = window.location.href;
    var show = false;

    for (var i = 0; i< showBackUrls.length; i++) {
      if (url.indexOf(showBackUrls[i]) > -1) {
        show = true;
        break;
      }
    }

    return show;
  }

  render () {
    var showBackEl = this.checkBackButton()?(<BackView _onClick={this.navigate}/>): null;

    return (
      <header className={styles.header} style={this.props.styles}>
          <div className={styles.headerLogo}>
            <img onClick={this.handleClick}  src={imgSrc} />
            <span onClick={this.handleClick} className={styles.headerName}>Juspay</span>
          </div>
          {showBackEl}
          {this.props.children}
      </header>
    )
  }

  handleClick = () => {

    var route = "/";
    
    this.props.history.pushState(null, route);
  }

  navigate = () => {
    goBack(this);
  }
}

