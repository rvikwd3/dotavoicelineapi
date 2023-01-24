import { VoicelineEmitMessage, VoicelineStatus } from "./types";
import { addVoicelineRefToQueue } from "./queue";
import { getPlusTierImgSrc, getRandomDotaPlayerColor } from "./utils";

// Add a voiceline to the voiceline queue
export const queueVoiceline = (voiceline: VoicelineEmitMessage): void => {
  // Create an element for the new voiceline
  const voicelineHtmlElement = createVoicelineHtmlElement(voiceline);
  // Add voiceline to voicelineQueue
  console.log(`Queueing voiceline '${voiceline.hero.name} ${voiceline.plusTier}'`);
  addVoicelineRefToQueue({
    htmlElement:  voicelineHtmlElement,
    queueTime: Date.now(),
    audioSource: voiceline.voiceline.url,
    voicelineStatus: VoicelineStatus.Queued
  });
}

const createVoicelineHtmlElement = (voiceline: VoicelineEmitMessage): HTMLDivElement => {

  const voicelineItem = document.createElement('div');
  voicelineItem.classList.add("voicelineItem");

  const dotaPlusTierImg = document.createElement('img');
  dotaPlusTierImg.classList.add("dotaPlusTier");
  dotaPlusTierImg.src = getPlusTierImgSrc(voiceline.plusTier);

  const heroAvatarImg = document.createElement('img');
  heroAvatarImg.classList.add("heroAvatar");
  heroAvatarImg.src = voiceline.hero.avatar;

  const twitchUsername = document.createElement('span');
  twitchUsername.classList.add('twitchUsername', 'topMarginForMiddle');
  twitchUsername.style.color = getRandomDotaPlayerColor();
  twitchUsername.innerText = `${voiceline.username}`;

  // Add a colon :
  const usernameColon = document.createElement('span');
  usernameColon.textContent = ':';
  usernameColon.classList.add('voicelineColon', 'topMarginForMiddle');

    // Add voiceline icon
  const voicelineIconContainer = document.createElement('div');
  voicelineIconContainer.classList.add('voicelineIconContainer');
  const voicelineIcon = document.createElement('img');
  voicelineIcon.setAttribute('src', import.meta.env.VITE_VOICELINE_ICON_URL);
  voicelineIcon.classList.add('voicelineIcon');
  voicelineIconContainer.appendChild(voicelineIcon);

  const voicelineTextContainer = document.createElement('div');
  voicelineTextContainer.classList.add('voicelineTextContainer', 'topMarginForMiddle');

  const voicelineText = document.createElement('span');
  voicelineText.classList.add("voicelineText");
  voicelineText.innerText = `${voiceline.voiceline.text}`;
  voicelineText.classList.add(voiceline.plusTier);

  voicelineTextContainer.appendChild(voicelineText);
  
  voicelineItem.appendChild(dotaPlusTierImg);
  voicelineItem.appendChild(heroAvatarImg);
  voicelineItem.appendChild(twitchUsername);
  voicelineItem.appendChild(usernameColon);
  voicelineItem.appendChild(voicelineIconContainer);
  voicelineItem.appendChild(voicelineTextContainer);

  return voicelineItem;
}