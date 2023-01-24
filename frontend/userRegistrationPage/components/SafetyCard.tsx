import { AlertIcon } from "../../src/icons";

const SafetyCard = () => {
  return (
    <div className="safetyContainer">
      <div className="header">
        <AlertIcon className="headerIcon" />
        <span className="headerText epilogue">API Key Safety</span>
      </div>
      <div className="description">
        Don’t share your <strong>API Key</strong> with anyone else. If you wish to reset your <strong>API Key</strong>, reauthenticate via Twitch to <a href="#" className="textLink">Reset Your Profile</a>.
      </div>
    </div>
  )
}

export default SafetyCard;