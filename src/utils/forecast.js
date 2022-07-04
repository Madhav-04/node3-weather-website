const request = require('request')

const forecast = ((lat,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f3332de4582e3f2480dc40ac96a2edd9&query=' + lat +','+ long +'&units=f'

    request ({ url, json: true},(error,{body}) => {
        if (error) {
            callback('Unable to Connect the Weather Server!',undefined)
        }else if (body.error) {
            callback('Unable to Find the Weather for Given Location', undefined)
        }else {
            callback( undefined, body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature + ' degress out. It feels like '+ body.current.feelslike + ' degress out. The Humidity is '+ body.current.humidity +'%.')
        }
    })
})


module.exports = forecast