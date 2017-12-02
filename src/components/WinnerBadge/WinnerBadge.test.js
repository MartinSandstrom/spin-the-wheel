import React from 'react';
import ReactDOM from 'react-dom';
import { WinnerBadge } from './WinnerBadge.js';

import { shallow } from 'enzyme';
import { expect } from 'chai';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Winner badge', () => {
    it('renders correctly with the correct value', () => {
        let value = 2;
        const wrapper = shallow(<WinnerBadge value={value} />);
        expect(wrapper.find('.winner-badge').text()).to.equal(value.toString());
    });
})