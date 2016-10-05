import React, { Component } from 'react'
import styles from '../styles/Tagline.css'

export default class Tagline extends Component {
  render () {
    return (
      <div className={styles.tagline}>
        <span className="message">{this.props.message}</span>
      </div>
    )
  }
}
