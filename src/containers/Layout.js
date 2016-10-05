import React, { Component } from 'react'
import '../styles/core.css'
import Header from '../components/Header'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class Layout extends React.Component {
  render () {
    return (
       <div className="app">
			<div className="app__inner">
				<Header history={this.props.history} location={this.props.location}/>
				<ReactCSSTransitionGroup
	            component="div"
	            transitionName="example"
	            transitionEnterTimeout={100}
	            transitionLeaveTimeout={200}>

	            {React.cloneElement(this.props.children, {
	              key: this.props.location.pathname
	            })}
	          </ReactCSSTransitionGroup>
			</div>
			<div className="help-box">
				<a href="tel:+918040959660"><div className="callUs">
				<span id="helpCall" style={{marginRight: "10px"}} className="ion-android-call"></span>
				Call us at 080-40959660
				</div></a>
				<div className="help" id="chat-widget">
				<span id="helpChat" style={{marginRight: "10px"}} className="ion-help-buoy"></span>
				Need Help?
				</div>
			</div>
      	</div>
    )
  }
}