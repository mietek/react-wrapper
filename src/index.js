"use strict";

/* global React */

var elements = require("./elements");

var _ = module.exports = {
  childrenOnly: React.Children.only,

  domNode: React.findDOMNode,

  initTouch: function () {
    React.initializeTouchEvents(true);
  },

  propTypes: React.PropTypes,

  render: React.render,

  makeComponent: function (displayName, mod) {
    if (!mod.exports.displayName) {
      mod.exports.displayName = displayName;
    }
    if (!mod.exports.mixins) {
      mod.exports.mixins = [React.addons.PureRenderMixin];
    }
    var com = React.createClass(mod.exports);
    if (mod.makeHot) {
      com = mod.makeHot(com);
    }
    mod.exports = com;
  },

  wrap: function (com) {
    return function (thing) {
      var props;
      if (typeof thing === "object") {
        props = thing;
      } else if (typeof thing === "string") {
        props = {
          className: thing
        };
      } else {
        props = null;
      }
      var args = [com, props];
      for (var i = 1; i < arguments.length; i += 1) {
        args.push(arguments[i]);
      }
      return React.createElement.apply(null, args);
    };
  }
};

_.transitionGroup    = _.wrap(React.addons.TransitionGroup);
_.cssTransitionGroup = _.wrap(React.addons.CSSTransitionGroup);

elements.forEach(function (element) {
    _[element] = _.wrap(element);
  });
