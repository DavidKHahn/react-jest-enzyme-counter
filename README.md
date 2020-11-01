
**Setting up Jest, Enzyme TDD (React)**

- Enzyme JS Docs: https://enzymejs.github.io/enzyme/

- ``npm install --save-dev enzyme jest-enzyme enzyme-adapter-react-16``

**Removing data-test attributes from Production:**

- ``npm install --save-dev babel-plugin-react-remove-properties``
- ``npm run eject`` - used to configure package.json
- ``npm run build``
- ``sudo npm install -g serve``
- ``serve -s build``

<img width="600" alt="Screen Shot React-TDD-Review" src="https://user-images.githubusercontent.com/34965292/97795247-1fbc3c00-1bc1-11eb-8634-78066094d282.png">

**Basic Set Up Example:**
- App.test.js

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
