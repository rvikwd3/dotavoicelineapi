import { JSXElementConstructor } from "react";
import { TwitchLogo } from "../icons";
import { RegisterButtonColor, RegisterButtonSize } from "../types";

type Props = {
  color: RegisterButtonColor;
  size: RegisterButtonSize;
  url: string;
};

const RegisterButton = ({ color, size, url }: Props) => {
  const coloredButton: {
    [key in RegisterButtonSize]: { [key in RegisterButtonColor]: JSX.Element };
  } = {
    Small: {
      SeaGreen: (
        <a
          className="registerButtonSmall seaGreen removeLinkDecoration"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitchLogo className="registerIcon" />
          <span className="registerButtonText">Register via Twitch</span>
        </a>
      ),
      PastelRed: (
        <a
          className="registerButtonSmall pastelRed removeLinkDecoration"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitchLogo className="registerIcon" />
          <span className="registerButtonText">Register via Twitch</span>
        </a>
      ),
    },
    Large: {
      SeaGreen: (
        <a
          className="registerButtonLarge seaGreen removeLinkDecoration"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitchLogo className="registerIcon" />
          <span className="registerButtonText">Register via Twitch</span>
        </a>
      ),
      PastelRed: (
        <a
          className="registerButtonLarge pastelRed removeLinkDecoration"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitchLogo className="registerIcon" />
          <span className="registerButtonText">Register via Twitch</span>
        </a>
      ),
    },
  };

  return coloredButton[size][color];
};

export default RegisterButton;
