
**Setting up Jest, Enzyme TDD (React)**

- Enzyme JS Docs: https://enzymejs.github.io/enzyme/

- ``npm install --save-dev enzyme jest-enzyme enzyme-adapter-react-16``

**Removing data-test attributes from Production:**

- ``npm install --save-dev babel-plugin-react-remove-properties``
- ``npm run eject`` - used to configure package.json
- ``npm run build``
- ``sudo npm install -g serve``
- ``serve -s build``

**Basic Set Up Example:**
- App.test.js

      import Enzyme, { shallow } from 'enzyme';
      import EnzymeAdapter from 'enzyme-adapter-react-16';

      // set up enzyme's react adapter
      Enzyme.configure({ adapter: new EnzymeAdapter() });
