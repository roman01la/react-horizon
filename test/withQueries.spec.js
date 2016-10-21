import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { withQueries, HorizonProvider } from '../src/index';
import { Horizon } from './utils';

describe('withQueries', () => {

  it('should create container component with 2 subscriptions', () => {
    @withQueries({
      subscriptions: {
        items: (hz) => hz('items').watch(),
        users: (hz) => hz('users').watch(),
      }
    })
    class WithSubscriptions extends React.Component {
      render() {
        return <div/>
      }
    }

    const wrapper = mount((
      <HorizonProvider instance={Horizon()}>
        <WithSubscriptions />
      </HorizonProvider>
    ));

    expect(wrapper.find(WithSubscriptions).nodes[0]._subscriptions)
      .to.have.length(2);
  });

  it('should create container component with 2 mutations', () => {
    @withQueries({
      mutations: {
        createItem: (hz) => (item) => hz('items').store(item),
        addUser: (hz) => (user) => hz('users').store(user),
      }
    })
    class WithMutations extends React.Component {
      render() {
        return <div/>
      }
    }

    const wrapper = mount((
      <HorizonProvider instance={Horizon()}>
        <WithMutations />
      </HorizonProvider>
    ));

    expect(wrapper.find(WithMutations).nodes[0]._mutations)
      .to.have.keys(['createItem', 'addUser']);
  });
});
