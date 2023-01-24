import { SyntheticEvent } from "react";
import { CopyIcon } from "../../src/icons";

type Props = {
  profileImgSrc: string;
  login: string;
  apiKey: string;
  browserSourceId: string;
};

const UserCard = ({ profileImgSrc, login, apiKey, browserSourceId }: Props) => {
  const apiKeyCopyClickHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    navigator.clipboard.writeText(apiKey);
  };

  const browserSourceCopyClickHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    navigator.clipboard.writeText(browserSourceId);
  };

  return (
    <div className="cardContainer">
      <div className="userDisplay">
        <img className="profileImg" src={profileImgSrc} id="profileImg" />
        <div className="username">{login}</div>
      </div>
      <div className="separator" />
      <div className="registrationDetailsDisplay">
        <div className="apiKeyFlexContainer">
          <div className="apiKeyHeader epilogue">API Key</div>
          <div className="copyApiKeyContainer">
            <div className="apiKey">{apiKey}</div>
            <a onClick={apiKeyCopyClickHandler}>
              <CopyIcon className="copyIcon" id="apiKeyCopyIcon" />
            </a>
          </div>
        </div>
        <div className="browserSourceFlexContainer">
          <div className="browserSourceHeader epilogue">
            OBS Browser Source Link
          </div>
          <a onClick={browserSourceCopyClickHandler}>
            <CopyIcon className="copyIcon" id="browserSourceCopyIcon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
