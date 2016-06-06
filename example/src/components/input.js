import React, { Component } from 'react';

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = { text: '' };

    this._handleSubmit = this._handleSubmit.bind(this);
  }
  _handleSubmit(event) {

    const { onSave } = this.props;
    const { text } = this.state;

    if (event.keyCode === 13) {

      const value = text.trim();

      if (value) {
        onSave(value);
        this.setState({ text: '' });
      }
    }
  }
  render() {

    const { text } = this.state;

    return (
      <div id='input' className='row'>
        <input
          className='u-full-width'
          value={text}
          onChange={(event) => this.setState({ text: event.target.value })}
          onKeyDown={this._handleSubmit}
          autoFocus={true} />
      </div>
    );
  }
}

export default ChatInput;
