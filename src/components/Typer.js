import React from "react";
import "./Typer.css";
import smile from "./icons/smile.svg";
import attachment from "./icons/attachment.svg";
import instagram from "./icons/instagram.svg";
import mic from "./icons/mic.svg";
import { isMobileDevice } from "./IsMobile";
export default function Typer() {
  return (
    <div>
      <div className="inputtext">
        <img className="iconsoftyper" src={smile} alt="" />

        <input
          placeholder="      Type a message"
          style={{backgroundColor:"white"}}
          value={""}
          className="whatsapp-input"
          type="text"
          disabled
        />
        <img className="attach" src={attachment} alt="" />
        <img className="insta" src={instagram} alt="" />
      { isMobileDevice() ? <div> <img className="mic" src={mic} alt="" /></div> :<img className="mic" src={mic} alt="" />}
      </div>
    </div>
  );
}
