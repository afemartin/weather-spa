import React from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import url from 'url'

import { Card, Input } from 'semantic-ui-react'

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
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

  render () {
    return (
      <div className='container'>
        <Head>
          <title>Weather SPA</title>
          <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css' />
        </Head>
        <h1 className='title'>Weather SPA</h1>
        <p>Location</p>
        <Input placeholder='Eg. Tokyo' onChange={this.onLocationChange} action={{ content: 'Search', onClick: this.onLocationSearch }} />
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
                    High { dayForecast.high }° - Low { dayForecast.low }°
                  </Card.Description>
                </Card.Content>
              </Card>
            ))
          }
        </Card.Group>
        <style jsx>{`
          .container {
            width: 1200px;
            margin: 0 auto;
          }
          .title {
            margin: 10px 0;
          }
        `}</style>
      </div>
    )
  }
}
