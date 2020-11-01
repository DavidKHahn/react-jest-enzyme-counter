
**Setting up Jest, Enzyme TDD (React)**

- Enzyme JS Docs: https://enzymejs.github.io/enzyme/

``npm install --save-dev enzyme jest-enzyme enzyme-adapter-react-16``

- App.test.js

      import Enzyme, { shallow } from 'enzyme';
      import EnzymeAdapter from 'enzyme-adapter-react-16';

      // set up enzyme's react adapter
      Enzyme.configure({ adapter: new EnzymeAdapter() });
