import expect from 'expect';
import React from 'react';
import { mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import LoginPage from './LoginPage';

function setup(loggingIn) {
  const props = {
      credentials: {}, loggingIn: loggingIn, errors: {},
      onLogin: () => {},
      onChange: () => {}
  };

  return shallow(<LoginPage {...props } />);
}

describe('Login page component test', () => {
  it('renders form and h1', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form'));
    expect(wrapper.find('h1').text()).toEqual('Welcome');
  });
});

/*
import CourseForm from './CourseForm';
describe('CourseForm via Enzyme', () => {
  it('renders form and h1', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Course');
  });

  it('save button is labeled "Save" when not saving', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('save button is labeled "Saving..." when saving', () => {
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toBe('Saving...');
  });
});
*/
