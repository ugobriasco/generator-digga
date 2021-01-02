const api = {
<% if (openWeather) { %>
    'openWeather': {
        api_key:'MY_API_KEY'
    },
<% } %><% if (auth0) { %>
    'auth0': {
        url:'https://YOUR_USERNAME.YOUR_AREA.auth0.com'
    },
<% } %>
};

module.exports = api;
