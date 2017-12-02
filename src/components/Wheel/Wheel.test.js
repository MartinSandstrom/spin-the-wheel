import React from 'react';
import Wheel from './Wheel.js';

import { shallow } from 'enzyme';
import { expect } from 'chai';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Wheel', () => {
	it('renders one item', () => {
		const wrapper = shallow(<Wheel spinDuration={7}/>);
		expect(wrapper.find('.wheel-component')).to.have.length(1);
	});
});
