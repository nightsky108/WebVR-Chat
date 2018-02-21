import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Helmet from 'react-helmet'
/*
Locale Information:
Antd is actually a chinese library by AliBaba, the chinese equiv. of Amazon
Locale Provider cascades context down to components, providing
english messages for things like "No Data" in tables
*/
import { Link } from 'react-router'

import enUS from 'antd/lib/locale-provider/en_US'
import { LocaleProvider, Spin, Layout, Icon } from 'antd'
const { Header } = Layout

//  Importing images for usage in styling (made possible by webpack loaders)
import favicon from '../../images/favicon.ico'
// Metadata for SEO - don't change this much!
const meta = [
  { charset: 'utf-8' },
  // Meta descriptions are commonly used on search engine result pages to
  // display preview snippets for a given page.
  { name: 'WebVR Chat', content: 'Web-based VR Chat Rooms' },
  // Setting IE=edge tells Internet Explorer to use the latest engine to
  //  render the page and execute Javascript
  { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
  // Using the viewport tag allows you to control the width and scaling of
  // the browser's viewport:
  // - include width=device-width to match the screen's width in
  // device-independent pixels
  // - include initial-scale=1 to establish 1:1 relationship between css pixels
  // and device-independent pixels
  // - ensure your page is accessible by not disabling user scaling.
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  // Disable tap highlight on IE
  { name: 'msapplication-tap-highlight', content: 'no' },
  // Add to homescreen for Chrome on Android
  { name: 'mobile-web-app-capable', content: 'yes' },
  // Add to homescreen for Safari on IOS
  { name: 'apple-mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
  { name: 'apple-mobile-web-app-title', content: 'UW STF' }
]
// Add to homescreen for Chrome on Android
const link = [{ rel: 'icon', href: favicon }]

import Login from './Login/Login'

/*
TEMPLATE:
The core UI for the website
Keeps track of many things like page nav, admin status, etc
Views adjust as necessary
*/
import '../../css/main'
import styles from './Template.css'
@connect(state => ({
  // Using redux-responsive for JS based media queries
  screen: state.screen,
  //  Nextlocation is the route of new pages router is transitioning to.
  nextLocation: state.routing.locationBeforeTransitions
    ? state.routing.locationBeforeTransitions.pathname
    : '1'
}))
class Template extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    screen: PropTypes.object,
    router: PropTypes.object,
    nextLocation: PropTypes.string
  }
  constructor (props) {
    super(props)
    this.state = { open: false }
  }
  //  Toggle menu view
  handleToggle = () => this.setState({ open: !this.state.open })
  //  Changed pages? Close the nav
  componentWillReceiveProps (nextProps) {
    if (this.state.open) {
      if (this.props.nextLocation !== nextProps.nextLocation) {
        this.setState({ open: false })
      }
    }
  }
  render (
    { children, screen, nextLocation, router, stf, links, year } = this.props,
    { open } = this.state
  ) {
    // React-router is separated from redux store - too heavy to persist.
    return (
      <LocaleProvider locale={enUS}>
        <div>
          <Helmet
            titleTemplate='%s - UW Student Tech'
            meta={meta} link={link}
          />
          <Header>
            {screen.lessThan.large &&
              <Icon
                style={{fontSize: 32, lineHeight: 'inherit', color: 'white', marginRight: 16}}
                type={this.state.open ? 'menu-unfold' : 'menu-fold'}
                onClick={this.handleToggle}
              />
            }
            <Link to='/'>
              <h1>WebVR Chat</h1>
            </Link>
            <Login />
          </Header>
          <div className={styles['body']}>
            {children || <Spin size='large' tip='Loading Page...' />}
          </div>
        </div>
      </LocaleProvider>
    )
  }
}

export default Template
