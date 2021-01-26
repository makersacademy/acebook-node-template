'use strict';

class LogoutComponent extends React.Component {
  
  render() {

    return (
      <div> 
        <form action="user/logout">
          <input id="log-out" type="submit" class="button" value="Log Out"></input>
        </form>
      </div> 
    )
  }

}