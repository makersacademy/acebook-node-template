<%- include ('../partials/header.ejs') %>
<%- include ('../partials/body.ejs') %>

<div>
  <div class='trip-title'>
    <h1>Activities for <%=username%>'s trip to <%= trip.destination %></h1>
    <form id="activity" action="/trips/itinerary/<%=trip.id%>" method="post">
      <input id="activity" type="text" name="activity" required>
      <input type="submit" value="Add activity">
    </form>
  </div>



<%- include ('../partials/footer.ejs') %>
