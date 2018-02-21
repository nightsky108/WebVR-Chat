import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

/*
FRONT PAGE: .../
Splash page. This is semi-dynamic
Admins can set a basic schedule and announcement
Via the config panel. No coding required.
*/
import styles from './FrontPage.css'
@connect(state => ({
  config: state.config
}))
class FrontPage extends React.Component {
  render (
    { config } = this.props
  ) {
    return (
      <article className={styles['page']}>
        <Helmet title='Home' />
        <section>
          <p>Front Page</p>
        </section>
      </article>
    )
  }
}

export default FrontPage
