import { AuthUrlContext } from "../context/AuthUrlContext";
import { useContext } from "react";
import {
  CommandPlusIcon,
  CopyIcon,
  GlobeIcon,
  TwitchLogo,
  WebcamIcon,
} from "../icons";
import SetupInstruction from "./SetupInstruction";
import RegisterButton from "./RegisterButton";
import { RegisterButtonColor, RegisterButtonSize } from "../types";
import { getLink } from "../utils";

/* Image Imports */
import registerClickImg from "Assets/images/registerClick.png";
import twitchAuthorizeClickImg from "Assets/images/twitchAuthorizeClick.png";
import copyObsBrowserSourceImg from "Assets/images/copyObsBrowserSource.png";
import pasteObsBrowserSourceImg from "Assets/images/pasteObsBrowserSource.png";
import addSourceImg from "Assets/images/addSource.png";
import selectSourceImg from "Assets/images/selectSource.png";
import createNewSourceImg from "Assets/images/createNewSource.png";
import nightbotLoginImg from "Assets/images/nightbotLogin.png";
import nightbotCustomClickImg from "Assets/images/nightbotCustomClick.png";
import nightbotAddCommandImg from "Assets/images/nightbotAddCommand.png";
import pasteNightbotCommandImg from "Assets/images/pasteNightbotCommand.png";
import nightbotSubmitCommandImg from "Assets/images/nightbotSubmitCommand.png";

const SetupSection = () => {
  const authUrl = useContext(AuthUrlContext);
  const setupInstructions = [
    {
      header: "Register",
      icon: (className: string) => <TwitchLogo className={className} />,
      description: (
        <span>
          Authenticate your Twitch info by clicking on the{" "}
          <a
            className="textLink"
            href={authUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Register link
          </a>
          .
        </span>
      ),
      imgSrcList: [registerClickImg, twitchAuthorizeClickImg]
    },
    {
      header: "Copy",
      icon: (className: string) => <CopyIcon className={className} />,
      description: (
        <span>
          On the <i>Successful Registration</i> page, copy the{" "}
          <strong>OBS Browser Source</strong> link provided.
        </span>
      ),
      imgSrcList: [copyObsBrowserSourceImg],
    },
    {
      header: "OBS Browser Source",
      icon: (className: string) => <GlobeIcon className={className} />,
      description: (
        <span>
          In OBS, create a new <strong>Browser Source</strong>. Paste the link
          you copied in the URL field.
        </span>
      ),
      imgSrcList: [
        addSourceImg,
        selectSourceImg,
        createNewSourceImg,
        pasteObsBrowserSourceImg,
      ],
    },
    {
      header: "Nightbot Command",
      icon: (className: string) => <CommandPlusIcon className={className} />,
      description: (
        <span>
          Login to{" "}
          <a
            href={getLink("nightbotHomepage")}
            className="textLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nightbot
          </a>{" "}
          and add a new <strong>Custom Command</strong>. You can copy-paste the
          command we’ve provided{" "}
          <a
            className="textLink"
            href={getLink("nightbotCommandGist")}
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          , or write your own.
        </span>
      ),
      imgSrcList: [
        nightbotLoginImg,
        nightbotCustomClickImg,
        nightbotAddCommandImg,
        pasteNightbotCommandImg,
        nightbotSubmitCommandImg
      ],
    },
  ];

  return (
    <>
      <div className="setupSectionContainer">
        <div className="setupSectionHeader">
          <WebcamIcon className="icon" />
          <span className="title epilogue">
            Setup Voicelines For Your Stream
          </span>
        </div>
        <div className="setupSectionDescription">
          <p className="description">
            Setup your stream to utilize the Voiceline API by using OBS Browser
            Source and Nightbot.
          </p>
        </div>
        <div className="setupInstructionContainer">
          {setupInstructions.map((instruction) => (
            <SetupInstruction key={instruction.header} {...instruction} />
          ))}
        </div>
        <div className="largeRegisterButtonContainer">
          <RegisterButton
            size={RegisterButtonSize.Large}
            color={RegisterButtonColor.SeaGreen}
            url={authUrl}
          />
        </div>
      </div>
    </>
  );
};

export default SetupSection;
