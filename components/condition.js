import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'

import WeatherIcon from '../components/weatherIcon'

import { TEMPERATURE_UNIT_CELSIUS, TEMPERATURE_UNIT_FAHRENHEIT } from '../constants'

const Condition = ({ condition, tempUnit }) => (
  <div className='container'>
    <h2>Condition</h2>
    <Card>
      <Card.Content>
        <Card.Header>
          { condition.text }
        </Card.Header>
        <WeatherIcon code={condition.code} text={condition.text} />
        <Card.Meta>
          <span className='date'>
            { condition.date }
          </span>
        </Card.Meta>
        <Card.Description>
          {
            tempUnit === TEMPERATURE_UNIT_FAHRENHEIT
              ? <span>{ condition.temp }°F</span>
              : <span>{ this.FtoC(condition.temp) }°C</span>
          }
        </Card.Description>
      </Card.Content>
    </Card>
    <style jsx>{`
      .container {
        margin-bottom: 20px;
      }
    `}</style>
  </div>
)

Condition.propTypes = {
  condition: PropTypes.string.isRequired,
  tempUnit: PropTypes.oneOf([TEMPERATURE_UNIT_CELSIUS, TEMPERATURE_UNIT_FAHRENHEIT]).isRequired
}

export default Condition
