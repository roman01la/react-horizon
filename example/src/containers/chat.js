import { connect } from '../../../src/index';
import ChatApp from '../components/chat';

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
