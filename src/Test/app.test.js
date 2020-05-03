//https://create-react-app.dev/docs/running-tests/
//https://markoskon.com/unit-testing-with-react-scripts/


import React from 'react';
import ReactDOM from 'react-dom';
import App from '../Components/App';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);

//   const { getByText } = render(<App />);
//   expect(getByText('Learn React')).toBeInTheDocument();
});