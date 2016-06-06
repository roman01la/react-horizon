import React, { Component } from 'react';
import { connect } from '../../../src/index';
import ChatList from './list';
import ChatInput from './input';

class ChatApp extends Component {
  static defaultProps = {
    authorId: Date.now()
  }
  render() {

    const { authorId, messages, sendMessage } = this.props;

    return (
      <div>
        <ChatList messages={messages} />
        <ChatInput onSave={(text) => sendMessage({ t: new Date(), text, authorId })} />
      </div>
    );
  }
}

const ChatAppContainer = connect(ChatApp, {
  subscriptions: {
    messages: (hz) => hz('messages')
      .order('t', 'descending')
      .limit(8)
  },
  mutations: {
    sendMessage: (hz) => (message) => hz('messages').store(message)
  }
});

export default ChatAppContainer;
