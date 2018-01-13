import React from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import url from 'url'

import { Button, Card, Input } from 'semantic-ui-react'

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      unit: 'fahrenheit',
      location: '',
      forecast: []
    }
    this.onLocationChange = this.onLocationChange.bind(this)
    this.onLocationSearch = this.onLocationSearch.bind(this)
  }

  onLocationChange (event, data) {
    this.setState({
      location: data.value,
      forecast: []
    })
  }

  onLocationSearch () {
    console.log(`Search weather at "${this.state.location}" using Yahoo Weather API`)
    const apiUrlObject = {
      protocol: 'https',
      hostname: 'query.yahooapis.com',
      pathname: 'v1/public/yql',
      query: {
        q: `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${this.state.location}")`,
        format: 'json',
        env: 'http://datatables.org/alltables.env'
      }
    }
    fetch(url.format(apiUrlObject))
      .then(response => response.json())
      .then(data => {
        if (data.query.results) {
          this.setState({
            forecast: data.query.results.channel.item.forecast
          })
        } else {
          console.log(`No results found for location search "${this.state.location}"`)
        }
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
        <h1 className='title'>Weather SPA</h1>
        <div className='unit'>
          <Button.Group>
            <Button color={this.state.unit === 'fahrenheit' ? 'blue' : null} onClick={() => this.onChangeTempUnit('fahrenheit')}>Fahrenheit</Button>
            <Button.Or />
            <Button color={this.state.unit === 'celsius' ? 'blue' : null} onClick={() => this.onChangeTempUnit('celsius')}>Celsius</Button>
          </Button.Group>
        </div>
        <div className='location'>
          <p>Location</p>
          <Input placeholder='Eg. Tokyo' onChange={this.onLocationChange} action={{ content: 'Search', onClick: this.onLocationSearch }} />
        </div>
        <div className='forecast'>
          <Card.Group itemsPerRow={5}>
            {
              this.state.forecast.map(dayForecast => (
                <Card>
                  <Card.Content>
                    <Card.Header>
                      { dayForecast.text }
                    </Card.Header>
                    <Card.Meta>
                      <span className='date'>
                        { dayForecast.date }
                      </span>
                    </Card.Meta>
                    <Card.Description>
                      {
                        this.state.unit === 'fahrenheit'
                          ? <span>High { dayForecast.high }°F - Low { dayForecast.low }°F</span>
                          : <span>High { this.FtoC(dayForecast.high) }°C - Low { this.FtoC(dayForecast.low) }°C</span>
                      }
                    </Card.Description>
                  </Card.Content>
                </Card>
              ))
            }
          </Card.Group>
        </div>
        <div className='footer'>
          <a href='https://www.yahoo.com/?ilc=401' target='_blank'>
            <img src='https://poweredby.yahoo.com/purple.png' width='134' height='29' />
          </a>
        </div>
        <style jsx>{`
          .container {
            width: 1200px;
            margin: 0 auto;
            padding: 20px 0;
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
