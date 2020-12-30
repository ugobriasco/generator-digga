const api = {
<% if (openWeather) { %>
    'openWeather': {
        api_key:'MY_API_KEY'
    }
<% } %>

};

module.exports = api;
