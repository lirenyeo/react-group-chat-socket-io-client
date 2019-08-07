import React from 'react'
import {
  ListGroup,
  ListGroupItem,
 } from 'reactstrap'

export default ({
  currentUser,
  users
}) => (
  <>
    <div id="user-list-header">
      <span>Active Users ({ users.length })</span>
    </div>
    <div id="user-list">
      <ListGroup>
        {
          users.map(({username, id, avatar}) =>
            <ListGroupItem key={id}>
              <span>
                <img className="sidebar-avatar" src={avatar} alt="avatar"/>
                {currentUser.id === id ? <strong>You</strong> : <span>{username}</span>}
              </span>
            </ListGroupItem>
          )
        }
      </ListGroup>
    </div>
  </>
)