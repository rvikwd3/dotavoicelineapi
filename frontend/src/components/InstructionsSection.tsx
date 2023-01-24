import { SyntheticEvent, useEffect, useRef, useState } from "react";
import {
  TwitchLogo,
  CopyIcon,
  MicrophoneIcon,
  VolumeIcon,
  PasteIcon,
} from "../icons";
import { PillNames } from "../types";
import { getLink } from "../utils";
import { Pill } from "./Pill";
import Voiceline from "./Voiceline";

/* Image Imports */
import meepoVoicelinesBrightImg from "Assets/images/meepoVoicelinesDecontrast.png";
import copyCommandClickImg from "Assets/images/copyCommandClick.png";
import pasteCommandChatImg from "Assets/images/pasteCommandChat.png";
import playVoicelineImg from "Assets/images/playVoiceline.png";

const InstructionsSection = () => {
  const [selectedPill, setSelectedPill] = useState<PillNames>(PillNames.Listen);
  const intersectionRef = useRef<HTMLDivElement | null>(null);

  const voicelineVisibleCallback = (entries: IntersectionObserverEntry[], observer:IntersectionObserver) => {
    const [ entry ] = entries;
    console.log("Entry intersecting? ", entry.isIntersecting);
    const popupVoicelineElement = document.getElementById("popupVoiceline");

    if (popupVoicelineElement && entry.isIntersecting) {
      popupVoicelineElement.classList.add("popupVoicelineIntersect");
      observer.unobserve(entry.target);
    }
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 1.0
  }

  useEffect(() => {
    const observer = new IntersectionObserver(voicelineVisibleCallback, observerOptions);
    if (intersectionRef.current) observer.observe(intersectionRef.current);

    return () => {
      if (intersectionRef.current) observer.unobserve(intersectionRef.current);
    }
  }, [intersectionRef, observerOptions]);

  const handlePillClick = (pill: PillNames) => {
    if (selectedPill === pill) {
      return (event: SyntheticEvent) => event.preventDefault();
    } else {
      return (event: SyntheticEvent) => {
        event.preventDefault();
        setSelectedPill(pill);
      };
    }
  };

  const pillList = [
    {
      icon: (className: string) => <VolumeIcon className={className} />,
      content: PillNames.Listen,
      handleClick: handlePillClick(PillNames.Listen),
      carouselImgSrc: meepoVoicelinesBrightImg,
    },
    {
      icon: (className: string) => <CopyIcon className={className} />,
      content: PillNames.Copy,
      handleClick: handlePillClick(PillNames.Copy),
      carouselImgSrc: copyCommandClickImg,
    },
    {
      icon: (className: string) => <PasteIcon className={className} />,
      content: PillNames.Paste,
      handleClick: handlePillClick(PillNames.Paste),
      carouselImgSrc: pasteCommandChatImg,
    },
    {
      icon: (className: string) => <MicrophoneIcon className={className} />,
      content: PillNames.Play,
      handleClick: handlePillClick(PillNames.Play),
      carouselImgSrc: playVoicelineImg,
    },
  ];

  return (
    <>
      <div className="instructionsSectionContainer">
        <div className="instructionsSectionHeader">
          <TwitchLogo className="icon" />
          <span className="title epilogue">How To Play Voicelines</span>
        </div>
        <div className="instructionsSectionDescription">
          <p className="description">
            Use the{" "}
            <a
              href={getLink("voicelineReference")}
              className="textLink"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voicelines Reference
            </a>{" "}
            to find the voiceline you want. Play Voicelines on stream by
            copy-pasting the voiceline command into chat.
          </p>
        </div>

        <div className="pillsCarouselContainer">
          <div className="pillFlexContainer">
            {pillList.map((pill) => (
              <Pill key={pill.content} selectedPill={selectedPill} {...pill} />
            ))}
          </div>
          <div className="instructionImageCarousel" ref={intersectionRef}>
            {selectedPill === PillNames.Listen
              ? <div className="popupVoicelineContainer">
                <Voiceline className="popupVoiceline" id="popupVoiceline" />
              </div>
              : <></>
            }
            <img
              className="carouselImageSrc"
              key={selectedPill}
              src={
                pillList.find((pill) => selectedPill === pill.content)
                  ?.carouselImgSrc
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructionsSection;
