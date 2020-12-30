const axios = require('axios');
const buildExclusionParams = require('./build-exclusion-params');
const { getConfig } = require('../../helpers');

const URL = 'https://api.openweathermap.org/data/2.5/onecall';
const API_KEY = getConfig().api.openWeather.api_key;

const openWeather = {};

// https://openweathermap.org/api/one-call-api#how
openWeather.getByGeocode = ({ lat, lon, exclude, units, lang }) => {
  if (!lat || !lon) {
    throw 'MISSING_LAT_LON';
  }

  if (exclude && typeof exclude !== array) {
    throw 'EXCLUDE_SCHOULD_BE_AN_ARRAY';
  }
  return axios
    .get(URL, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        exclude: buildExclusionParams(exclude),
        units,
        lang
      }
    })
    .then(res => res.data);
};

module.exports = openWeather;
