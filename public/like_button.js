"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LikeButton = function (_React$Component) {
  _inherits(LikeButton, _React$Component);

  function LikeButton(props) {
    _classCallCheck(this, LikeButton);

    var _this = _possibleConstructorReturn(this, (LikeButton.__proto__ || Object.getPrototypeOf(LikeButton)).call(this, props));

    _this.addLike = function () {
      var newCount = _this.state.likes + 1;
      _this.setState({
        likes: newCount
      });
      // Retrieve Likes
      fetch("/posts/updatelikes/" + _this.props.postId, {
        method: "POST"
      });
    };

    _this.componentDidMount = function () {
      fetch("/posts/viewlikes/" + _this.props.postId).then(function (response) {
        return response.json();
      }).then(function (responseJson) {
        _this.setState({ likes: responseJson.likes });
      });
    };

    console.log(props);
    _this.state = { likes: null };
    return _this;
  }

  // lifecyle method


  _createClass(LikeButton, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "button",
        { "class": "like-button", onClick: this.addLike },
        "Likes: ",
        this.state.likes
      );
    }
  }]);

  return LikeButton;
}(React.Component);

// in order to render the like button for all posts, we must iterate through all instances of the element


document.querySelectorAll(".like-button-container").forEach(function (domContainer) {
  ReactDOM.render(React.createElement(LikeButton, domContainer.dataset), domContainer);
});