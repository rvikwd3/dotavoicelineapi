import heroImageUrl from "../../assets/images/heroImage.png";
import RegisterButton from "./RegisterButton";
import { RegisterButtonColor, RegisterButtonSize } from "../types";
import Header from "./Header";
import { useContext } from "react";
import { AuthUrlContext } from "../context/AuthUrlContext";



const HeroPage = () => {
  const authUrl = useContext(AuthUrlContext);
  return (
    <div id="heroPageDiv">
      <div className="inner">
        <Header />
      </div>
      <div className="heroDescription">
        <div className="title epilogue">
          Play your favourite voicelines on stream
        </div>
        <div className="subtitle">
          An API platform for streamers to allow viewers to play Dota Plus
          chatwheel audio on their stream
        </div>
      </div>
      <div className="heroImageContainer">
        <img src={heroImageUrl} className="heroImage" />
      </div>
      <div className="buttonContainer">
        <RegisterButton
          size={RegisterButtonSize.Small}
          color={RegisterButtonColor.SeaGreen}
          url={authUrl}
        />
      </div>
    </div>
  );
};

export default HeroPage;
