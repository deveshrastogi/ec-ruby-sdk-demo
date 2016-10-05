import React, { Component } from 'react'
import styles from '../styles/Banner.css'

export default class Banner extends Component {
  render () {
    var _heading = styles.none;
    var _tagline =  styles.none;
    var _iconColorOverride;

    if(this.props.heading)
      _heading = styles.bannerHeader;
    if(this.props.tagline)
      _tagline = styles.tagline;
    if(this.props.iconColor)
      _iconColorOverride = {
        color: this.props.iconColor,
        fontSize: '54px'
      }

    return (
      <div className={styles.wrapper} style={this.props.styles}>
        <div className={_heading}>{this.props.heading}</div>
        <div className={_tagline}>{this.props.tagline}</div>
        {this.props.children}</div>
    )
  }
}