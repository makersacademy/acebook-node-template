delete button with react
- - - - - - - - - - - - -


class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { value: null };
  }

  render() {
    return <button class="delete-button"> D-BUTTON</button>;
  }

}


ReactDOM.render(React.createElement(DeleteButton, null), domContainer);
var domContainer = document.querySelector(“.delete-button-container”);


/*


*/
// include respective post inside the state of Delete constructor
// so that it is stored/remembered there
// or call it from outside

// when child function of DeleteButton i.e. deletepost/renderDelete is called with onClick/handleClick
// the state is switched to null

// then connect to database, so deleted from database with 

// no constructor in stoverflow example


/*

  Delete: (req, res) => {
    Post.findOneAndDelete({ _id: req.params.id }).exec(function (err) {
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        res.redirect("/posts");
      }
    });
  },

  */