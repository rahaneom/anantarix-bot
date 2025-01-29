import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { LoadingBig, LoadingSmall } from "../components/Loading";
import { GiHamburgerMenu } from "react-icons/gi";
import { ChatData } from "../context/ChatContext";
import { FiUser } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";
import { FaOm } from "react-icons/fa";
import "../index.css";
import ParticlesBackground from "../styles/ParticlesBackground";
import ReactMarkdown from "react-markdown";
import '../styles/chatStyle.css'

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState("Ask me anything...");

  useEffect(() => {
    const text = "Ask me anything...";
    let index = 0;

    const typingInterval = setInterval(() => {
      setPlaceholder((prev) => text.substring(0, index + 1));
      index++;

      if (index === text.length) {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval); 
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const {
    fetchResponse,
    messages,
    prompt,
    setPrompt,
    newRequestLoading,
    loading,
    chats,
  } = ChatData();

  const submitHandler = (e) => {
    e.preventDefault();
    fetchResponse();
  };

  const messagecontainerRef = useRef();

  useEffect(() => {
    if (messagecontainerRef.current) {
      messagecontainerRef.current.scrollTo({
        top: messagecontainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="relative">
      <div className="gradient-bg"></div>
      <ParticlesBackground />
      <div className="flex h-screen text-white ">
        <div className="absolute inset-0 -z-10"></div>
        <Sidebar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          className="fixed-sidebar"
        />

        <div className="flex flex-col flex-1 p-6 overflow-y-auto z-100">
          <button
            className="p-4 text-2xl bg-gray-800 md:hidden"
            onClick={toggleSidebar}
          >
            <GiHamburgerMenu />
          </button>

          <div className="flex-1 p-6 mb-20 md:mb-0">
            {loading ? (
              <LoadingBig />
            ) : (
              <div
                className="flex-1 p-6 max-h-[500px] max-w-[100%]   overflow-y-auto overflow-x-hidden mb-20 md:mb-0 thin-scrollbar"
                ref={messagecontainerRef}
              >
                {messages && messages.length > 0 ? (
                  messages.map((e, i) => (
                    <div key={i} className="my-4 ">
                      <div className="flex gap-1 p-5 mb-4 tracking-wide text-white user-question">
                        <div className="h-10 p-2 text-[1.5rem] chat-icon rounded-full ">
                          <FiUser />
                        </div>

                        <p className="mt-2 ml-[0.3rem]">{e.question}</p>
                      </div>
                      <div className="flex items-start gap-1 p-5 answer-box text-[0.85rem]">
                        <div className="p-2 mr-2 text-[1.45rem] chat-icon rounded-full h-15 text-green">
                          <FaOm />
                        </div>

                        <ReactMarkdown className="mt-2 break-words whitespace-pre-wrap wrap-text">
                          {e.answer}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="mb-6 text-lg header-text">
                    Hello, How can I help you today?
                  </p>
                )}

                {newRequestLoading && <LoadingSmall />}
              </div>
            )}
          </div>
        </div>

        {chats && chats.length === 0 ? (
          ""
        ) : (
          <div className="fixed bottom-0 right-0 left-auto w-full p-4  md:w-[75%]">
            <form
              className="flex items-center justify-center"
              onSubmit={submitHandler}
            >
              <input
                type="text"
                placeholder={placeholder}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                className="flex-grow p-4 text-white transition-all duration-300 ease-in-out rounded-lg shadow-md outline-none focus:border-transparent placeholder:text-white user-input-box"
              />

              <button className="p-4 ml-5 text-2xl text-white rounded history-bg send-btn btn-radius">
                <IoMdSend className=" send-icon" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
