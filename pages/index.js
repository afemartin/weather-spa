import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import url from 'url'

import { Button, Dimmer, Grid, Form, Loader, Message } from 'semantic-ui-react'

import Condition from '../components/condition'
import Forecast from '../components/forecast'

import { TEMPERATURE_UNIT_CELSIUS, TEMPERATURE_UNIT_FAHRENHEIT } from '../constants'

export default class Index extends React.Component {
  static async getInitialProps ({ query }) {
    const location = query.q
    if (!location) {
      return {
        location: null,
        data: {},
        error: null
      }
    }
    const apiUrlObject = {
      protocol: 'https',
      hostname: 'query.yahooapis.com',
      pathname: 'v1/public/yql',
      query: {
        q: `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${location}")`,
        format: 'json',
        env: 'http://datatables.org/alltables.env'
      }
    }
    try {
      const res = await fetch(url.format(apiUrlObject))
      const data = await res.json()
      if (data.query.results) {
        return {
          location: location,
          data: {
            location: data.query.results.channel.location,
            astronomy: data.query.results.channel.astronomy,
            atmosphere: data.query.results.channel.atmosphere,
            wind: data.query.results.channel.wind,
            condition: data.query.results.channel.item.condition,
            forecast: data.query.results.channel.item.forecast,
            geolocation: {
              lat: data.query.results.channel.item.lat,
              lng: data.query.results.channel.item.long
            }
          }
        }
      } else {
        return {
          location: location,
          data: {},
          error: `No results found for location search "${location}", please try with another location`
        }
      }
    } catch (error) {
      return {
        location: location,
        data: {},
        error: `There was some unexpected error when searching for "${location}", please try again.`
      }
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      tempUnit: TEMPERATURE_UNIT_FAHRENHEIT,
      location: props.location || '',
      loading: false
    }
    this.onLocationChange = this.onLocationChange.bind(this)
    this.onLocationSubmit = this.onLocationSubmit.bind(this)
  }

  onLocationChange (event, data) {
    this.setState({
      location: data.value
    })
  }

  onLocationSubmit (event, data) {
    if (!this.state.location) {
      return
    }
    this.setState({
      loading: true
    })
    Router.push({
      pathname: '/',
      query: { q: this.state.location }
    })
  }

  onChangeTempUnit (unit) {
    this.setState({
      tempUnit: unit
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      loading: false
    })
  }

  render () {
    return (
      <div className='container'>
        { this.state.loading && (
          <Dimmer active page inverted>
            <Loader inverted size='massive'>Loading</Loader>
          </Dimmer>
        )}
        <Head>
          <title>Weather SPA {this.props.data.location ? ` - ${this.props.data.location.city}` : null}</title>
          <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css' />
        </Head>
        <div className='header'>
          <h1 className='title'>Weather SPA</h1>
          <div className='tempUnit'>
            <Button.Group>
              <Button color={this.state.tempUnit === TEMPERATURE_UNIT_FAHRENHEIT ? 'blue' : null} onClick={() => this.onChangeTempUnit(TEMPERATURE_UNIT_FAHRENHEIT)}>Fahrenheit</Button>
              <Button.Or />
              <Button color={this.state.tempUnit === TEMPERATURE_UNIT_CELSIUS ? 'blue' : null} onClick={() => this.onChangeTempUnit(TEMPERATURE_UNIT_CELSIUS)}>Celsius</Button>
            </Button.Group>
          </div>
        </div>
        <div className='location'>
          <h2>Location</h2>
          <Form onSubmit={this.onLocationSubmit}>
            <Form.Group>
              <Form.Input name='location' placeholder='Eg. Tokyo' defaultValue={this.props.location} onChange={this.onLocationChange} />
              <Form.Button content={this.state.location && this.state.location === this.props.location ? 'Refresh' : 'Search'} disabled={!this.state.location.length > 0} />
            </Form.Group>
          </Form>
        </div>
        <div className='data'>
          { this.props.error &&
            <Message negative>{this.props.error}</Message>
          }
          <Grid>
            <Grid.Row>
              { this.props.data.condition &&
                <Grid.Column mobile={16} tablet={6} computer={6}>
                  <Condition location={this.props.data.location.city} condition={this.props.data.condition} tempUnit={this.state.tempUnit} />
                </Grid.Column>
              }
              { this.props.data.forecast && Array.isArray(this.props.data.forecast) &&
                <Grid.Column mobile={16} tablet={10} computer={10}>
                  <Forecast forecast={this.props.data.forecast} tempUnit={this.state.tempUnit} />
                </Grid.Column>
              }
            </Grid.Row>
          </Grid>
        </div>
        <div className='footer'>
          <a href='https://www.yahoo.com/?ilc=401' target='_blank'>
            <img src='https://poweredby.yahoo.com/purple.png' width='134' height='29' />
          </a>
        </div>
        <style jsx>{`
          .container {
            max-width: 860px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            display: flex;
            justify-content: space-between;
          }
          .title {
            margin-bottom: 20px;
          }
          .tempUnit {
            float: right;
          }
          .location {
            margin-bottom: 20px;
          }
          .footer {
            margin-bottom: 20px;
          }
        `}</style>
      </div>
    )
  }
}
