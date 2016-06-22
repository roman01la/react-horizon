import React, { Component, PropTypes } from 'react';
import ChatList from './list';
import ChatInput from './input';

class ChatApp extends Component {
  static propTypes = {
    authorId: PropTypes.number.isRequired,
    messages: PropTypes.array.isRequired,
    sendMessage: PropTypes.func.isRequired
  }
  static defaultProps = {
    authorId: Date.now(),
    messages: []
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

export default ChatApp;
