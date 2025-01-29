import { IoIosCloseCircle } from "react-icons/io";
import { ChatData } from "../context/ChatContext";
import { MdDelete } from "react-icons/md";
import { LoadingSpinner } from "./Loading";
import { UserData } from "../context/UserContext";
import "../index.css";
import '../styles/sidebarStyle.css';
import ShinyText from "../styles/ShinyText";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { chats, createChat, createLod, setSelected, deleteChat } = ChatData();

  const { logoutHandler } = UserData();

  const deleteChatHandler = (id) => {
    if (confirm("Are you sure you want to delete this chat?")) {
      deleteChat(id);
    }
  };

  const clickEvent = (id) => {
    setSelected(id);
    toggleSidebar();
  };

  return (
    <div
      className={`fixed inset-0 p-4 transition-transform transform md:relative md:translate-x-0 md:w-1/4 md:block ${
        isOpen ? "translate-x-0" : "-translate-x-full  "
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="p-2 mb-4 text-2xl bg-gray-700 rounded md:hidden"
      >
        <IoIosCloseCircle />
      </button>

      <div
        style={{ position: "relative", height: "50px" }}
        className="flex items-center justify-center mb-8"
      >
        {/* <h1 className="text-4xl text-center main-heading-text">Anantarix</h1> */}

        <ShinyText
          text="Anantarix"
          disabled={false}
          speed={20}
          className="text-4xl text-center main-heading-text"
        />
      </div>

      <div className="mb-4">
        <button
          onClick={createChat}
          className="w-full py-2 rounded history-bg "
        >
          {createLod ? <LoadingSpinner /> : "New Chat +"}
        </button>
      </div>

      <div className="p-2 ">
        <p className="mb-2 italic text-md gray-200 text-m">Your Recent Chats</p>

        <div className="max-h-[350px] overflow-auto  mb-20 md:mb-0 thin-scrollbar">
          {chats && chats.length > 0 ? (
            chats.map((e) => (
              <button
                key={e._id}
                className="flex items-center justify-between w-full px-2 py-2 mt-2 italic text-left rounded history-bg "
                onClick={() => clickEvent(e._id)}
              >
                <span>{e.latestMessage.slice(0, 38)}...</span>
                <button
                  className="px-3 py-2 text-xl text-white rounded-md logout-btn hover:bg-red-600"
                  onClick={() => deleteChatHandler(e._id)}
                >
                  <MdDelete />
                </button>
              </button>
            ))
          ) : (
            <p className="mt-4 text-sm">No Chats Yet</p>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 w-full mb-6">
        <button
          className="px-4 py-3 text-xl text-white rounded-md logout-btn-bg hover:bg-red-600"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
