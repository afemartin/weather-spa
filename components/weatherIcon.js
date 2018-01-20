import PropTypes from 'prop-types'

const codeToIcon = (code) => {
  // Extracted from "Condition codes" at https://developer.yahoo.com/weather/documentation.html
  return {
    '0': 'fog',             // Yahoo Code "tornado"
    '1': 'tstorms',         // Yahoo Code "tropical storm"
    '2': 'fog',             // Yahoo Code "hurricane"
    '3': 'tstorms',         // Yahoo Code "severe thunderstorms"
    '4': 'tstorms',         // Yahoo Code "thunderstorms"
    '5': 'sleet',           // Yahoo Code "mixed rain and snow"
    '6': 'sleet',           // Yahoo Code "mixed rain and sleet"
    '7': 'sleet',           // Yahoo Code "mixed snow and sleet"
    '8': 'chancerain',      // Yahoo Code "freezing drizzle"
    '9': 'chancerain',      // Yahoo Code "drizzle"
    '10': 'chancerain',     // Yahoo Code "freezing rain"
    '11': 'chancerain',     // Yahoo Code "showers"
    '12': 'chancerain',     // Yahoo Code "showers"
    '13': 'chanceflurries', // Yahoo Code "snow flurries"
    '14': 'chancesnow',     // Yahoo Code "light snow showers"
    '15': 'chancesnow',     // Yahoo Code "blowing snow"
    '16': 'snow',           // Yahoo Code "snow"
    '17': 'sleet',          // Yahoo Code "hail"
    '18': 'sleet',          // Yahoo Code "sleet"
    '19': 'fog',            // Yahoo Code "dust"
    '20': 'fog',            // Yahoo Code "foggy"
    '21': 'hazy',           // Yahoo Code "haze"
    '22': 'fog',            // Yahoo Code "smoky"
    '23': 'fog',            // Yahoo Code "blustery"
    '24': 'fog',            // Yahoo Code "windy"
    '25': 'snow',           // Yahoo Code "cold"
    '26': 'cloudy',         // Yahoo Code "cloudy"
    '27': 'mostlycloudy',   // Yahoo Code "mostly cloudy (night)"
    '28': 'mostlycloudy',   // Yahoo Code "mostly cloudy (day)"
    '29': 'partlycloudy',   // Yahoo Code "partly cloudy (night)"
    '30': 'partlycloudy',   // Yahoo Code "partly cloudy (day)"
    '31': 'clear',          // Yahoo Code "clear (night)"
    '32': 'sunny',          // Yahoo Code "sunny"
    '33': 'sunny',          // Yahoo Code "fair (night)"
    '34': 'sunny',          // Yahoo Code "fair (day)"
    '35': 'sleet',          // Yahoo Code "mixed rain and hail"
    '36': 'sunny',          // Yahoo Code "hot"
    '37': 'chancetstorms',  // Yahoo Code "isolated thunderstorms"
    '38': 'chancetstorms',  // Yahoo Code "scattered thunderstorms"
    '39': 'chancetstorms',  // Yahoo Code "scattered thunderstorms"
    '40': 'chancerain',     // Yahoo Code "scattered showers"
    '41': 'snow',           // Yahoo Code "heavy snow"
    '42': 'chancesnow',     // Yahoo Code "scattered snow showers"
    '43': 'snow',           // Yahoo Code "heavy snow"
    '44': 'partlycloudy',   // Yahoo Code "partly cloudy"
    '45': 'tstorms',        // Yahoo Code "thundershowers"
    '46': 'chancesnow',     // Yahoo Code "snow showers"
    '47': 'chancetstorms'   // Yahoo Code "isolated thundershowers"
  }[code] || 'unknown'
}

const WeatherIcon = ({ code, text, day }) => (
  <img src={`static/icons/weather-underground/${day ? 'day' : 'night'}/${codeToIcon(code)}.svg`} alt={text} />
)

WeatherIcon.propTypes = {
  code: PropTypes.string.isRequired,
  text: PropTypes.string,
  day: PropTypes.bool
}

WeatherIcon.defaultProps = {
  text: '',
  day: true
}

export default WeatherIcon
