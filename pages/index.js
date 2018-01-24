import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import url from 'url'

import { Button, Card, Grid, Input, Form, List, Message } from 'semantic-ui-react'

import WeatherIcon from '../components/weatherIcon'

export default class Index extends React.Component {
  static async getInitialProps ({ query }) {
    const location = query.q
    if (!location) {
      return {
        location: null,
        data: {},
        loading: false,
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
        },
        loading: false
      }
    } else {
      return {
        location: location,
        data: {},
        loading: false,
        error: `No results found for location search "${location}"`
      }
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      unit: 'fahrenheit',
      location: props.location || ''
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
    Router.push({
      pathname: '/',
      query: { q: this.state.location }
    })
  }

  onChangeTempUnit (unit) {
    this.setState({
      unit: unit
    })
  }

  FtoC (temp) {
    return Math.round((temp - 32) / (9 / 5))
  }

  render () {
    return (
      <div className='container'>
        <Head>
          <title>Weather SPA</title>
          <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css' />
        </Head>
        <div className='header'>
          <h1 className='title'>Weather SPA</h1>
          <div className='unit'>
            <Button.Group>
              <Button color={this.state.unit === 'fahrenheit' ? 'blue' : null} onClick={() => this.onChangeTempUnit('fahrenheit')}>Fahrenheit</Button>
              <Button.Or />
              <Button color={this.state.unit === 'celsius' ? 'blue' : null} onClick={() => this.onChangeTempUnit('celsius')}>Celsius</Button>
            </Button.Group>
          </div>
        </div>
        <div className='location'>
          <h2>Location</h2>
          <Form loading={this.props.loading} onSubmit={this.onLocationSubmit}>
            <Form.Field>
              <Input name='location' placeholder='Eg. Tokyo' icon='search' defaultValue={this.props.location} onChange={this.onLocationChange} />
            </Form.Field>
          </Form>
        </div>
        <div className='data'>
          {
            this.props.error && <Message negative>{this.props.error}</Message>
          }
          <Grid>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={6} computer={6}>
                <div className='condition'>
                  <h2>Condition</h2>
                  {
                    this.props.data.condition && (
                      <Card>
                        <Card.Content>
                          <Card.Header>
                            { this.props.data.condition.text }
                          </Card.Header>
                          <WeatherIcon code={this.props.data.condition.code} text={this.props.data.condition.text} />
                          <Card.Meta>
                            <span className='date'>
                              { this.props.data.condition.date }
                            </span>
                          </Card.Meta>
                          <Card.Description>
                            {
                              this.state.unit === 'fahrenheit'
                                ? <span>{ this.props.data.condition.temp }°F</span>
                                : <span>{ this.FtoC(this.props.data.condition.temp) }°C</span>
                            }
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    )
                  }
                </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={10} computer={10}>
                <div className='forecast'>
                  <h2>Forecast</h2>
                  <List celled>
                    {
                      this.props.data.forecast && this.props.data.forecast.map(dayForecast => (
                        <List.Item key={dayForecast.date} style={{ padding: '5px' }} >
                          <List.Content floated='right'>
                            <div style={{ width: '35px', margin: '0 auto' }}>
                              <WeatherIcon code={dayForecast.code} text={dayForecast.text} />
                            </div>
                            <div>
                              {
                                this.state.unit === 'fahrenheit'
                                  ? <span>{ dayForecast.high }°F • { dayForecast.low }°F</span>
                                  : <span>{ this.FtoC(dayForecast.high) }°C • { this.FtoC(dayForecast.low) }°C</span>
                              }
                            </div>
                          </List.Content>
                          <List.Content>
                            <p className='date'>{ dayForecast.date }</p>
                            <p>{ dayForecast.text }</p>
                          </List.Content>
                        </List.Item>
                      ))
                    }
                  </List>
                </div>
              </Grid.Column>
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
          .unit {
            float: right;
          }
          .location {
            margin-bottom: 20px;
          }
          .condition {
            margin-bottom: 20px;
          }
          .forecast {
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
