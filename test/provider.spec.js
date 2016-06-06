import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { HorizonProvider } from '../src/index';
import { Horizon } from './utils';

describe('HorizonProvider', () => {

  it('should have `instance` prop with a value of an instance of `Horizon`', () => {

    const wrapper = mount((
      <HorizonProvider instance={Horizon()}>
        <div />
      </HorizonProvider>
    ));

    expect(wrapper.prop('instance'))
      .to.have.keys(['watch', 'connect', 'status']);
  });

  it('should call `connect` method of the `instance` prop', () => {

    const connect = sinon.spy();

    const wrapper = mount((
      <HorizonProvider instance={Horizon({ connect })}>
        <div />
      </HorizonProvider>
    ));

    expect(connect.calledOnce).to.equal(true);
  });
});
