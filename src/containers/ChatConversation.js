import React from 'react'
import moment from 'moment'

export default ({
  conversations,
  currentUsername
}) => (
  <div id="chat-message-container">
    {
      conversations && conversations.map((conv, index) =>
        <div key={conv.time}>
          {
            <div className="message-bubble">
              <p className="text-muted mb-1">{conv.username === currentUsername ? 'You' : conv.username}:</p>
              <span>{conv.message}</span>
              <small className="text-right d-block text-muted font-italic">{moment(conv.time).format('hh:mm a')}</small>
            </div>
          }
        </div>
      )
    }
  </div>
)