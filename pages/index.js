import React from 'react'
import Head from 'next/head'
import { Input } from 'semantic-ui-react'

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = { location: '' }
    this.onLocationChange = this.onLocationChange.bind(this)
    this.onLocationSearch = this.onLocationSearch.bind(this)
  }

  onLocationChange (event, data) {
    this.setState({
      location: data.value
    })
  }

  onLocationSearch () {
    console.log('Search weather at', this.state.location, 'using Yahoo Weather API')
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
