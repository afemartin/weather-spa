import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'

import Temperature from '../components/temperature'
import WeatherIcon from '../components/weatherIcon'

import { TEMPERATURE_UNIT_CELSIUS, TEMPERATURE_UNIT_FAHRENHEIT } from '../constants'

const Condition = ({ location, condition, tempUnit }) => (
  <div className='container'>
    <h2>Weather for {location}</h2>
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
          <Temperature degrees={condition.temp} unit={tempUnit} />
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
  location: PropTypes.string.isRequired,
  condition: PropTypes.object.isRequired,
  tempUnit: PropTypes.oneOf([TEMPERATURE_UNIT_CELSIUS, TEMPERATURE_UNIT_FAHRENHEIT]).isRequired
}

export default Condition
