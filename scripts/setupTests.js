import 'raf/polyfill';
const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');
const configureStore = require('redux-mock-store');

global.mockStore = configureStore();

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    };
  };

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  function(callback) {
    setTimeout(callback, 0);
  };
