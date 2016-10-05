import React, { Component } from 'react'
import '../styles/Loader.css'

class Loader extends Component {
  render () {
    return (
      <div>
        <center>
          <div style={{fontSize: "16px" , marginTop: '15%'}}>
            <img id='juspay-logo' src='https://d3oxf4lkkqx2kx.cloudfront.net/images/juspay-logo-v2-64x64.png'/>
            <p>{this.props.children}</p>
          </div>
        </center>
      </div>
    )
  }
}

export default Loader