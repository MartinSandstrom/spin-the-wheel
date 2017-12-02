import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('The application', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App />, div);
	});

	it('contains the lead information test', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('.app-lead').text())
		.to.equal('Drag the right side of the wheel up or down to spin, or simply press the button.');
	});
});
