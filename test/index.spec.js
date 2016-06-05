import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { connect } from '../src/index';

function hz(q) {
  return {
    watch: () => ({ subscribe: (handler) => handler(['subscription']) })
  }
}

const TestComp = () => <div />;

describe('connect', () => {

  it('should return React component with 2 subscriptions', () => {

    const TestCompContainer = connect(TestComp, {
      subscriptions: {
        items: (hz) => hz('items'),
        users: (hz) => hz('users'),
      }
    }, hz);

    const wrapper = mount(<TestCompContainer />);

    expect(wrapper.nodes[0]._subscriptions).to.have.length(2);
  });

  it('should return React component with 2 mutations', () => {

    const TestCompContainer = connect(TestComp, {
      mutations: {
        removeItem: (hz) => (id) => hz('items').remove(id),
        addUser: (hz) => (name) => hz('users').store({ name }),
      }
    }, hz);

    const wrapper = mount(<TestCompContainer />);

    expect(wrapper.nodes[0]._mutations).to.include.keys(['removeItem', 'addUser']);
  });
});
