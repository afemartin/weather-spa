import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'

import WeatherIcon from '../components/weatherIcon'

import { TEMPERATURE_UNIT_CELSIUS, TEMPERATURE_UNIT_FAHRENHEIT } from '../constants'

const Forecast = ({ forecast, tempUnit }) => (
  <div className='container'>
    <h2>Forecast</h2>
    <List celled>
      { forecast.map(dayForecast =>
        <List.Item key={dayForecast.date} style={{ padding: '5px' }} >
          <List.Content floated='right'>
            <div style={{ width: '35px', margin: '0 auto' }}>
              <WeatherIcon code={dayForecast.code} text={dayForecast.text} />
            </div>
            <div>
              { tempUnit === TEMPERATURE_UNIT_FAHRENHEIT
                ? <span>{ dayForecast.high }°F • { dayForecast.low }°F</span>
                : <span>{ this.FtoC(dayForecast.high) }°C • { this.FtoC(dayForecast.low) }°C</span>
              }
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
