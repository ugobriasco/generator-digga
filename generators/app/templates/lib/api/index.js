<% if (openWeather) { %>const openWeather = require('./open-weather');<% } %>
<% if (auth0) { %>const auth0 = require('./auth0');<% } %>

module.exports = {
<% if (openWeather) { %>    openWeather,<% } %>
<% if (auth0) { %>  auth0<% } %>
} 
