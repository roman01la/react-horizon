import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { HorizonProvider, HorizonRoute } from '../src/index';
import { Horizon, assertStatus, assertStatusPropCall } from './utils';

describe('HorizonRoute', () => {

  it('should call `unsubscribe` method on object returned by calling `status` when unmounting', () => {

    const unsubscribe = sinon.spy();
    const status = () => ({ unsubscribe });

    const wrapper = mount((
      <HorizonProvider instance={Horizon({ status })}>
        <HorizonRoute />
      </HorizonProvider>
    ));

    wrapper.unmount();

    expect(unsubscribe.calledOnce).to.equal(true);
  });

  it('should set `error` to `true`', () => {

    const status = (onNext, onError) => onError(true);

    const wrapper = mount((
      <HorizonProvider instance={Horizon({ status })}>
        <HorizonRoute />
      </HorizonProvider>
    ));

    expect(wrapper.find(HorizonRoute).nodes[0].state.error).to.equal(true);
  });

  it('should set status `unconnected`', () => assertStatus('unconnected'));
  it('should set status `connected`', () => assertStatus('connected'));
  it('should set status `ready`', () => assertStatus('ready'));
  it('should set status `error`', () => assertStatus('error'));
  it('should set status `disconnected`', () => assertStatus('disconnected'));

  it('should call prop `renderConnecting`', () => assertStatusPropCall('unconnected', 'renderConnecting'));
  it('should call prop `renderConnected`', () => assertStatusPropCall('connected', 'renderConnected'));
  it('should call prop `renderSuccess`', () => assertStatusPropCall('ready', 'renderSuccess'));
  it('should call prop `renderFailure`', () => assertStatusPropCall('error', 'renderFailure'));
  it('should call prop `renderDisconnected`', () => assertStatusPropCall('disconnected', 'renderDisconnected'));
});
