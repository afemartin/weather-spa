import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'

import Temperature from '../components/temperature'
import WeatherIcon from '../components/weatherIcon'

import { TEMPERATURE_UNIT_CELSIUS, TEMPERATURE_UNIT_FAHRENHEIT } from '../constants'

const Forecast = ({ forecast, tempUnit }) => (
  <div className='container'>
    <h2>Forecast for the next 10 days</h2>
    <List celled>
      { forecast.map(dayForecast =>
        <List.Item key={dayForecast.date} style={{ padding: '5px' }} >
          <List.Content floated='right'>
            <div style={{ width: '35px', margin: '0 auto' }}>
              <WeatherIcon code={dayForecast.code} text={dayForecast.text} />
            </div>
            <div>
              <Temperature degrees={dayForecast.high} unit={tempUnit} /> • <Temperature degrees={dayForecast.low} unit={tempUnit} />
            </div>
          </List.Content>
          <List.Content>
            <p>{ dayForecast.date }</p>
            <p>{ dayForecast.text }</p>
          </List.Content>
        </List.Item>
      )}
    </List>
    <style jsx>{`
      .container {
        margin-bottom: 20px;
      }
    `}</style>
  </div>
)

Forecast.propTypes = {
  forecast: PropTypes.array.isRequired,
  tempUnit: PropTypes.oneOf([TEMPERATURE_UNIT_CELSIUS, TEMPERATURE_UNIT_FAHRENHEIT]).isRequired
}

export default Forecast
