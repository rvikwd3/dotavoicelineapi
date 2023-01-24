import voicelineIconUrl from "Assets/images/voiceline_icon.png";
import { useContext } from "react";
import { AuthUrlContext } from "../context/AuthUrlContext";
import { getLink } from "../utils";

const Header = () => {
  const authUrl = useContext(AuthUrlContext);
  return (
    <div className="pageHeader">
      <div className="headerTitle">
        <img src={voicelineIconUrl} id="headerTitleIcon" />
        <a href={getLink("homepage")} className="removeLinkDecoration">
          Dota Voiceline API
        </a>
      </div>
      <div className="headerNavLinkContainer">
        <a
          className="removeLinkDecoration headerNavLink"
          href={getLink("voicelineReference")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Voicelines
        </a>
        <a
          className="removeLinkDecoration headerNavLink"
          href={authUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Register
        </a>
      </div>
    </div>
  );
};

export default Header;
