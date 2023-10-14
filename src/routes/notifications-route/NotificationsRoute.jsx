import { useState } from "react";
import Button from "../../components/button/Button";
import toastMessage from "../../helper/toast-message/toastMessage";
import useFetchInstance from "../../hooks/useFetchInstance";
import send from "../../assets/images/send.png";

const NotificationsRoute = () => {
  const { tokenAwareFetch } = useFetchInstance();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sendNoti = async () => {
    if (text == "") return toastMessage("error", "Please enter message");
    setIsLoading(true);
    try {
      const data = await tokenAwareFetch("/notifications/notify-all", "POST", {
        message: text,
      });
      setText("");
      toastMessage("success", "Sent");
    } catch (error) {
      console.log(error);
      toastMessage("error", error.message);
    }

    setIsLoading(false);
  };
  return (
    <div className="outlet-outer-container">
      <div className="outlet-inner-container">
        <div className="bg-white flex flex-1 justify-center">
          <div className="flex flex-col p-5 gap-2 flex-1 max-w-md">
            <div className="flex flex-col justify-center items-center">
              <img src={send} className="w-24 md:w-44" />
              <h2 className="text-xl font-bold text-center">
                Send Notification
              </h2>
              <p className="text-gray-500 text-sm text-center">
                Notification will be sent all all users
              </p>
            </div>

            <textarea
              className="border border-gray-500 rounded-md outline-none p-1"
              placeholder="Enter message"
              onChange={(e) => setText(e.target.value)}
              value={text}
              disabled={isLoading}
            />
            <Button text={"Send"} onClick={sendNoti} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsRoute;
