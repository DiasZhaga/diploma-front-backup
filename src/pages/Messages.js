// src/pages/Messages.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/css/style.css";

export default function Messages() {
  const mockConversations = [
    { id: 1, title: "Alice" },
    { id: 2, title: "Bob" },
    { id: 3, title: "Charlie" }
  ];
  const mockMessages = {
    1: [
      { fromMe: false, text: "Hi there!" },
      { fromMe: true,  text: "Hello Alice, how are you?" },
      { fromMe: false, text: "I'm good, thanks!" },
    ],
    2: [
      { fromMe: false, text: "Hey, are you free tomorrow?" },
      { fromMe: true,  text: "Yes, let’s catch up." },
    ],
    3: [
      { fromMe: true,  text: "Morning Charlie!" },
      { fromMe: false, text: "Morning! What’s up?" },
    ],
  };

  const [conversations] = useState(mockConversations);
  const [activeConv, setActiveConv] = useState(null);
  const [messages, setMessages]     = useState([]);
  const [input, setInput]           = useState("");

  const selectChat = (id) => {
    setActiveConv(id);
    setMessages(mockMessages[id] || []);
  };

  const sendMessage = () => {
    if (!input.trim() || !activeConv) return;
    setMessages(msgs => [...msgs, { fromMe: true, text: input }]);
    setInput("");
  };

  return (
    <div className="container-fluid p-0 bg-light">
      <Navbar />

      <div className="page-content">
        <div className="container py-5 mt-5">
          <div className="row gx-0">
            {/* Список чатов */}
            <div
              className="col-md-4 pe-3"
              style={{ maxHeight: "75vh", overflowY: "auto" }}
            >
              <h5 className="mb-3">Chats</h5>
              <ul className="list-group">
                {conversations.map(conv => (
                  <li
                    key={conv.id}
                    className={`list-group-item ${
                      activeConv === conv.id ? "active text-white" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => selectChat(conv.id)}
                  >
                    {conv.title}
                  </li>
                ))}
              </ul>
            </div>

            {/* Окно переписки */}
            <div
              className="col-md-8 d-flex flex-column"
              style={{ height: "75vh" }}   /* фиксируем высоту всей колонки */
            >
              {activeConv ? (
                <>
                  {/* Блок сообщений: занимает всё свободное место */}
                  <div
                    className="flex-grow-1 p-3 overflow-auto bg-white"
                    style={{ borderRadius: "0.5rem 0.5rem 0 0" }}
                  >
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        className={`mb-2 d-flex ${
                          m.fromMe ? "justify-content-end" : ""
                        }`}
                      >
                        <div
                          className={`p-2 rounded ${
                            m.fromMe ? "bg-primary text-white" : "bg-light"
                          }`}
                          style={{ maxWidth: "70%" }}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Поле ввода */}
                  <div className="input-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type a message..."
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && sendMessage()}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={sendMessage}
                    >
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                  Select a chat on the left
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
