import React from 'react'
import PropTypes from 'prop-types'

import { TEMPERATURE_UNIT_CELSIUS, TEMPERATURE_UNIT_FAHRENHEIT } from '../constants'

const f2c = (degrees) => Math.round((degrees - 32) / (9 / 5))

const Temperature = ({ degrees, unit }) => (
  unit === TEMPERATURE_UNIT_FAHRENHEIT
    ? <span>{ degrees }°F</span>
    : <span>{ f2c(degrees) }°C</span>
)

Temperature.propTypes = {
  degrees: PropTypes.string.isRequired,
  unit: PropTypes.oneOf([TEMPERATURE_UNIT_CELSIUS, TEMPERATURE_UNIT_FAHRENHEIT]).isRequired
}

export default Temperature
