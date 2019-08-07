import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter
 } from 'reactstrap'

import './App.css'

import ChatConversation from './containers/ChatConversation'
import ChatForm from './containers/ChatForm'
import ChatSidebar from './containers/ChatSidebar'
import Socket from './utils/Socket'


export default class App extends Component {
  state = {
    currentUser: {},
    users: [],
    conversations: [],
  }

  componentDidMount = () => {
    // window.open('http://localhost:3000', "_blank", 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=600,height=800,left = 650,top = 250');
    Socket.on('GET_CURRENT_USER', user => {
      this.setState({
        currentUser: {
          ...user,
          avatar: `https://api.adorable.io/avatars/150/${user.username}.png`
        }
      })
    })

    Socket.on('UPDATE_USER_LIST', users => {
      this.setState({
        users: users.map(user => ({
          ...user,
          avatar: `https://api.adorable.io/avatars/100/${user.username}.png`
        }))
      })
    })

    Socket.on('RECEIVE_BROADCAST', conversation => {
      this.setState({
        conversations: [...this.state.conversations, conversation]
      })
      document.getElementById('chat-message-container').scrollTop = 10000
    })

    Socket.on('HAS_ERROR', err => {
      console.log(err)
    })

    Socket.emit('NEW_USER')
  }

  sendMessage = text => {
    Socket.emit('BROADCAST_MESSAGE', {
      username: this.state.currentUser.username,
      message: text,
      timestamp: Date.now()
    })
  }


  render() {
    const { currentUser, users, conversations } = this.state
    return (
      <Container>
        <Card className="mt-3">
          <Row noGutters>
            <Col xs={9}>
              <CardHeader>
                Welcome!&nbsp;
                { currentUser.username && currentUser.username.length
                  ? <span>Your username is <strong>{ currentUser.username }</strong>.</span>
                  : null }
              </CardHeader>
              <CardBody className="p-0">
                <ChatConversation
                  currentUsername={currentUser.username}
                  conversations={conversations}
                />
              </CardBody>
              <CardFooter className="card-footer">
                <ChatForm
                  sendMessage={this.sendMessage}
                  currentUsername={currentUser.username}
                />
              </CardFooter>
            </Col>

            <Col xs={3} className="left-border">
              <ChatSidebar currentUser={currentUser} users={users} />
            </Col>
          </Row>
        </Card>
      </Container>
    )
  }
}
