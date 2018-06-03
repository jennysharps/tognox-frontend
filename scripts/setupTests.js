import 'raf/polyfill';
const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');
const configureStore = require('redux-mock-store');

global.mockStore = configureStore.default();

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });
