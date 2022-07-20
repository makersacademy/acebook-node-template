var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeleteButton = function (_React$Component) {
  _inherits(DeleteButton, _React$Component);

  function DeleteButton(props) {
    _classCallCheck(this, DeleteButton);

    var _this = _possibleConstructorReturn(this, (DeleteButton.__proto__ || Object.getPrototypeOf(DeleteButton)).call(this, props));

    _this.state = { state: null };
    return _this;
  }

  _createClass(DeleteButton, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "button",
        { "class": "delete-button" },
        " the BUTTON"
      );
    }
  }]);

  return DeleteButton;
}(React.Component);

document.querySelectorAll(".delete-button-container").forEach(function (domContainer) {
  ReactDOM.render(React.createElement(DeleteButton, domContainer.dataset), domContainer);
});

ReactDOM.render(React.createElement(LikeButton, null), domContainer);
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