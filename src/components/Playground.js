import React, { useState, useRef, useEffect } from "react";
import "../App.css";
import { isMobileDevice } from "./IsMobile";
import arrowLeft from "./icons/arrow-left.svg";
import call from "./icons/call.svg";
import moreVertical from "./icons/more-vertical.svg";
import video from "./icons/video.svg";
import Typer from "./Typer";
import blueTick from "./icons/blue-tick.svg";
import singletick from "./icons/single-tick.svg";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import whatsappback from "./icons/whatsappback.jpg";
import iphone from "./icons/iphone.png";

export default function Playground() {
  const [msg, Setmsg] = useState("");
  const [msgarr, Setmsgarr] = useState([]);
  const [userType, SetuserType] = useState("sender");
  const [profilename, Setprofilename] = useState("John");
  const [msgtime, Setmsgtime] = useState("10:30 AM");
  const [device, Setdevice] = useState("android");
  const [isSeen, Setisseen] = useState(true);
  const [profilepic, Setprofilepic] = useState(
    "https://mememe.vercel.app/svgs/avatar.svg"
  );
  const divToDownloadRef = useRef(null);
  useEffect(() => {
    const element = document.querySelector(".previewimg");
    divToDownloadRef.current = element;
  }, []);
  const recieverStyle = {
    textAlign: "left",
    width: "164px",
    marginBottom: "14px",
    position: "relative",
    right: "79px",
  };
  const senderStyle = {
    width: "164px",
    marginBottom: "14px",
    textAlign: "left",
    position: "relative",
    left: "47px",
  };
  function handlemsgSent() {
    if (msg == "") {
      Swal.fire({
        title: "Alert!",
        text: "Enter Message",
        icon: "warning",
        confirmButtonColor: "#007bff",
        confirmButtonText: "OK",
      });
      return;
    }
    const newMessage = { userType, msg, isSeen };
    Setmsgarr((prevmsg) => [...prevmsg, newMessage]);
    Setmsg("");
  }
  const handleDownload = () => {
    html2canvas(divToDownloadRef.current, {
      allowTaint: true,
      backgroundColor: null,
      useCORS: true,
    }).then((canvas) => {
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "Chat.png";
      link.href = dataURL;
      link.click();
    });
  };
  const handleProfileNameChange = (e) => {
    const enteredName = e.target.value;
    Setprofilename(enteredName);
  };

  return (
    <div>
      <div className="row container">
        <div
          className="col-lg-6 col-sm-12 previewimg"
          ref={divToDownloadRef}
          style={{ background: `url(${whatsappback})` }}
        >
          <span>
            <button
              style={{ height: "25px" }}
              className="downloadbtn button-30"
              onClick={handleDownload}
            >
              Download
            </button>
          </span>
          <img
            className="statusbar"
            style={device == "iphone" ? { height: "21px" } : {}}
            src={
              device == "android"
                ? "https://lh3.googleusercontent.com/lGPcKx09nzIAFtAjFbQ_6FoXc3hnT7y0oMOGVNI8tbFWziGJQdUAgar1TBMmIGP_2Sj0gvLJonpoydv5UyTrOl_WJnrDz45RPMkSM7s=w1064-v0"
                : iphone
            }
            alt=""
          />
          <div className="navchat">
            <img src="" alt="" />
            <img src={arrowLeft} />
            <img className="profilepic" src={profilepic} alt="" />

            <span className="profilename">
              <b>{profilename}</b>
            </span>
            <span className="onlinestatus">online</span>

            <img className="icons" src={video} alt="" />
            <img className="icons" src={call} alt="" />
            <img className="icons" src={moreVertical} alt="" />
          </div>
          <ol>
            {msgarr.map((item, index) => {
              const { userType, msg, isSeen } = item;
              return (
                <li
                  key={index}
                  style={userType === "receiver" ? recieverStyle : senderStyle}
                  className={
                    userType === "sender"
                      ? "sender-message container"
                      : "reciever-message container"
                  }
                >
                  {msg}
                  <br />
                  <p className="msgtimespan">
                    {msgtime}{" "}
                    <span>
                      {userType == "sender" && (
                        <img
                          src={isSeen === true ? blueTick : singletick}
                          alt=""
                        />
                      )}
                    </span>
                  </p>
                  <br />
                </li>
              );
            })}
          </ol>

          <Typer></Typer>
        </div>
        {isMobileDevice() && <br></br>}
        <div className="col-lg-6 col-sm-12 container inputinfo">
          <br />
          {isMobileDevice() && <br />}
          <form>
            <label htmlFor="profilename">Profile Name</label>
            <input
              type="text"
              maxLength={12}
              value={profilename}
              onChange={handleProfileNameChange}
            />
            <br />
            <br />
            <label htmlFor="profilepic">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                Setprofilepic(URL.createObjectURL(selectedFile));
              }}
            />

            <br />
            <br />
            <label htmlFor="">Device Type</label>
            <span className="radioinputs">
              <label htmlFor="android">Android</label>
              <input
                type="radio"
                checked={device === "android"}
                value={"android"}
                className="android"
                onChange={(e) => {
                  Setdevice(e.target.value);
                }}
              />
              <label htmlFor="iphone">Iphone</label>
              <input
                type="radio"
                checked={device === "iphone"}
                value={"iphone"}
                className="iphone"
                onChange={(e) => {
                  Setdevice(e.target.value);
                }}
              />
            </span>
            <label htmlFor="message">Message</label>
            <input
              type="text"
              className="message"
              value={msg}
              onChange={(e) => {
                Setmsg(e.target.value);
              }}
            />
            <br />
            <label htmlFor="user">Receiver/Sender</label>
            <select
              name=""
              id=""
              className="user"
              onChange={(e) => {
                SetuserType(e.target.value);
              }}
            >
              <option value="sender">Sender</option>
              <option value="receiver">Receiver</option>
            </select>
            <label htmlFor="seen">Seen</label>
            <select
              value={isSeen}
              onChange={(e) => {
                Setisseen(e.target.value);
              }}
              className="seen"
              name=""
              id=""
            >
              <option value={true}>YES</option>
              <option value={false}>NO</option>
            </select>
            <br />
            <label htmlFor="msgtime">Message Time</label>
            <input
              className="msgtime"
              value={msgtime}
              onChange={(e) => {
                Setmsgtime(e.target.value);
              }}
              type="text"
            />
      
            <br />
            <br />
            <button
              className="button-30"
              onClick={(e) => {
                e.preventDefault();
                handlemsgSent();
              }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
