import React, { useEffect, useRef, useState } from 'react';
import Aside from '@dailyjs/shared/components/Aside';
import { Button } from '@dailyjs/shared/components/Button';
import { TextInput } from '@dailyjs/shared/components/Input';
import { useUIState } from '@dailyjs/shared/contexts/UIStateProvider';
import { useChat } from '../../contexts/ChatProvider';

export const CHAT_ASIDE = 'chat';

export const ChatAside = () => {
  const { showAside, setShowAside } = useUIState();
  const { sendMessage, chatHistory, setHasNewMessages } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const chatWindowRef = useRef();

  useEffect(() => {
    // Clear out any new message otifications if we're showing the chat screen
    if (showAside === CHAT_ASIDE) {
      setHasNewMessages(false);
    }
  }, [showAside, chatHistory.length, setHasNewMessages]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatHistory?.length]);

  if (!showAside || showAside !== CHAT_ASIDE) {
    return null;
  }

  return (
    <Aside onClose={() => setShowAside(false)}>
      <div className="messages-container" ref={chatWindowRef}>
        {chatHistory.map((chatItem) => (
          <div
            className={chatItem.isLocal ? 'message local' : 'message'}
            key={chatItem.id}
          >
            <span className="content">{chatItem.message}</span>
            <span className="sender">{chatItem.sender}</span>
          </div>
        ))}
      </div>
      <footer className="chat-footer">
        <TextInput
          value={newMessage}
          placeholder="Type message here"
          variant="transparent"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button
          className="send-button"
          variant="transparent"
          disabled={!newMessage}
          onClick={() => {
            sendMessage(newMessage);
            setNewMessage('');
          }}
        >
          Send
        </Button>
      </footer>
      <style jsx>{`
        .messages-container {
          flex: 1;
          overflow-y: scroll;
        }

        .message {
          margin: var(--spacing-xxs);
          padding: var(--spacing-xxs);
          background: var(--gray-wash);
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
        }

        .message.local {
          background: var(--gray-light);
        }

        .message.local .sender {
          color: var(--primary-default);
        }

        .content {
          color: var(--text-mid);
          display: block;
        }

        .sender {
          font-weight: var(--weight-medium);
          font-size: 0.75rem;
        }

        .chat-footer {
          flex-flow: row nowrap;
          box-sizing: border-box;
          padding: var(--spacing-xxs) 0;
          display: flex;
          position: relative;
          border-top: 1px solid var(--gray-light);
        }

        .chat-footer :global(.input-container) {
          flex: 1;
        }

        .chat-footer :global(.input-container input) {
          padding-right: 0px;
        }

        .chat-footer :global(.send-button) {
          padding: 0 var(--spacing-xs);
        }
      `}</style>
    </Aside>
  );
};

export default ChatAside;
