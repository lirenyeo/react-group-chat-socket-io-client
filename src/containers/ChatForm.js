import React from 'react'

export default class ChatForm extends React.Component {
  state = {
    message: '',
  }

  onTextInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onFormSubmit = e => {
    e.preventDefault()
    this.props.sendMessage(this.state.message)
    this.setState({message: ''})
  }

  render() {
    const { currentUsername } = this.props
    const { message } = this.state

    return (
      <form className="form-row align-items-center" onSubmit={this.onFormSubmit}>
        <div className="input-group">
          {
            currentUsername && currentUsername.length
              ? <div className="input-group-prepend">
                  <div className="input-group-text">
                    {currentUsername}:
                  </div>
                </div>
              : null
          }
          <input
            className="form-control"
            type="text"
            name="message"
            value={message}
            onChange={this.onTextInput}
          />
          <span className="input-group-btn">
            <input
              className="btn btn-info"
              type="submit"
              value="Send"
            />
          </span>
        </div>
      </form>
    )
  }
}