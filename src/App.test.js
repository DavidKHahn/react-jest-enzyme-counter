import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import React from 'react';
import App from './App';

// set up enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});
test("renders button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});
test("renders counter display", () => {
  const wrapper = setup();
  const counter = findByTestAttr(wrapper, "counter-display");
  expect(counter.length).toBe(1);
});
test("counter starts at 0", () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
});
describe("Increment", () => {
  test("clicking on button increments counter display", () => {
    const wrapper = setup();

    // find the button
    const button = findByTestAttr(wrapper, "increment-button");
    // click the button
    button.simulate('click');

    // find the display, and test that the number has been incremented
    const count = findByTestAttr(wrapper, "count").text();
    expect(count).toBe("1");
  });
});
describe("Decrement", () => {
  test("clicking on button decrements counter display", () => {
    const wrapper = setup();
    // find the button
    const button = findByTestAttr(wrapper, "decrement-button");
    // click the button
    button.simulate('click');

    // find the display, and test that the number has been decremented
    const count = findByTestAttr(wrapper, "count").text();
    expect(count).toBe("0");
  });
});
describe("error when counter goes below 0", () => {
  test("error message appears when counter goes below 0", () => {
    // use of 'hidden' allows control over error msg
    const wrapper = setup();
    // find the error msg
    const errorMsg = findByTestAttr(wrapper, 'error-msg');

    // using enzyme's ".hasClass()" method
    // http://airbnb.io/enzyme/docs/api/ShallowWrapper/hasClass.html
    const errorHasHiddenClass = errorMsg.hasClass('hidden');
    console.log(wrapper.debug());
    expect(errorHasHiddenClass).toBe(true);
  });
});

describe("error msg when counter goes above 0 not appears", () => {
  // using a describe here so I can use a "beforeEach" for shared setup

  // scoping wrapper to the describe, so it can be used in beforeEach and the tests
  let wrapper
  beforeEach(() => {
    // no need to set counter value here; default value of 0 is good
    wrapper = setup();

    // find the button and click
    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
  });
  test('error shows', () => {
    // check the class of the error msg
    const errorMsg = findByTestAttr(wrapper, 'error-msg');
    const errorHasHiddenClass = errorMsg.hasClass('hidden');
    expect(errorHasHiddenClass).toBe(false);
  });
  test('counter still shows 0', () => {
    const count = findByTestAttr(wrapper, 'count').text();
    expect(count).toBe("0");
  });
  test('incrementing counter clears error msg', () => {
    const increment = findByTestAttr(wrapper, 'increment-button');
    increment.simulate('click');

    // check the class of the error msg div
    const errorMsg = findByTestAttr(wrapper, 'error-msg');
    const errorHasHiddenClass = errorMsg.hasClass('hidden');
    expect(errorHasHiddenClass).toBe(true);
  })
})