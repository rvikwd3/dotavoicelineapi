import meepoAvatar from "Assets/images/meepoHeroAvatar.png";
import silverPlusTier from "Assets/images/silverPlusTier.png";
import React, {
  forwardRef,
  MutableRefObject,
  Ref,
  SyntheticEvent,
  useState,
} from "react";
import { CopyIcon } from "../icons";

type Props = {
  id?: string;
  className?: string;
};

const Voiceline = ({ id, className }: Props) => {
  const [currentAudioState, setCurrentAudioState] = useState({
    audio: new Audio(),
    controller: new AbortController(),
  });

  const entry = {
    command: "!voiceline meepo silver 1",
    heroNames: ["meepo"],
    heroIconUrl: meepoAvatar,
    plusTierName: "silver",
    plusTierIconUrl: silverPlusTier,
    voiceline: {
      text: "How ya doin?",
      url: "https://static.wikia.nocookie.net/dota2_gamepedia/images/b/bc/Vo_meepo_meepo_earthbind_05.mp3",
    },
  };

  const copyIconClickHandler = (event: SyntheticEvent) => {
    event.stopPropagation();
    navigator.clipboard.writeText(entry.command);
  };

  const voicelineClickHandler = (event: SyntheticEvent) => {
    event.preventDefault();

    // Stop currently playing audio
    currentAudioState.audio.pause();
    currentAudioState.audio.currentTime = 0;
    currentAudioState.controller.abort();

    // Setup new audio to play
    const audio = new Audio(entry.voiceline.url);
    const controller = new AbortController();
    audio.volume = 0.4;
    audio.addEventListener("canplaythrough", () => audio.play(), {
      signal: controller.signal,
    });
    setCurrentAudioState({ audio: audio, controller: controller });
  };

  return (
    <div className={className} id={id} onClick={voicelineClickHandler}>
      <div className="voicelineCommand">
        <span>{entry.command.replace(/\!voiceline /, "")}</span>
      </div>
      <img className="voicelineHeroIcon" src={entry.heroIconUrl} />
      <img className="voicelinePlusTier" src={entry.plusTierIconUrl} />
      <div className="voicelineText">{entry.voiceline.text}</div>
      <div
        className="voicelineCopyIconContainer"
        onClick={copyIconClickHandler}
      >
        <CopyIcon className="voicelineCopyIcon" />
      </div>
    </div>
  );
};

export default Voiceline;
