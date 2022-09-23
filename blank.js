// add this before routes in app.js

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});
// in layouts
<!DOCTYPE html>
<html>
  <head>
    <title>{{title}}</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
<body>
{{#if user }}
  <form action='/sessions?_method=DELETE' method='POST'>
      <input type="submit" value="Log Out">
    </form>
{{else}}
<a href="/sessions/new">Log in</a>
  {{!-- <form action='/sessions?_method=CREATE' method='GET'>
      <input type="button" value="Log in">
    </form> --}}
    {{/if}}
    {{{body}}}
</body>