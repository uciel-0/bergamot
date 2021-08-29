import axios from 'axios';

const getIp = () => axios.get('https://jsonip.com/')
.then(data => {
    console.log('jsonip call success', data.data.ip);
    return data.data.ip
})
.catch(err => {
    console.error('jsonip call failure', err);
})

const getApproximateLocationInfo = (ip) => axios.get('http://www.geoplugin.net/json.gp', { params: { ip } })
.then(data => {
    console.log('geoplugin data', data.data);
    return {
        geoplugin_city: data.data.geoplugin_city,
        geoplugin_region: data.data.geoplugin_region,
        geoplugin_countryCode: data.data.geoplugin_countryCode,
        geoplugin_countryName: data.data.geoplugin_countryName,
        geoplugin_latitude: data.data.geoplugin_latitude,
        geoplugin_longitude: data.data.geoplugin_longitude,
    }
})
.catch(err => console.error('geoplugin api call failure', err))

export const getInfo = (req, res) => getIp()
.then(ip => getApproximateLocationInfo(ip))
.then(geopluginData => res.send({geopluginData}))
.catch(err => {
    console.error('error in get info call', err);
    res.sendStatus(500);   
});