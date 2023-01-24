import { VoicelineRef, VoicelineStatus } from "./types";

let voicelineQueue: VoicelineRef[] = [];

export const addVoicelineRefToQueue = (ref: VoicelineRef): void => {
  // Add ref to voicelineQueue
  voicelineQueue.push(ref);
  console.log(`Ref added to queue: '${ref.htmlElement.innerHTML}'`);
};

export const purgeRemovableVoicelines = (): void => {
  voicelineQueue.forEach(voiceline => {
    if (voiceline.voicelineStatus === VoicelineStatus.Removable) {
      // play fade out animation
      voiceline.htmlElement.classList.add("disappear");
      // remove the element from DOM
      voiceline.htmlElement.addEventListener("animationend", () => voiceline.htmlElement.remove());
      console.log(`'${voiceline.htmlElement.innerText}' removed from queue`);
    }
  })
  voicelineQueue = voicelineQueue.filter(voiceline => voiceline.voicelineStatus !== VoicelineStatus.Removable);
}

export const getNextVoicelineToPlay = (): VoicelineRef | null => {
  // Filter voicelines to only those with status Queued
  const queuedStatusVoicelines = voicelineQueue.filter(vl => vl.voicelineStatus === VoicelineStatus.Queued);
  if (queuedStatusVoicelines.length === 0) {
    return null;
  }

  //  Get the newest voiceline based on queueTime
  return queuedStatusVoicelines.reduce(
    (prev, curr) => prev.queueTime < curr.queueTime ? prev : curr
  );
}

/* Figma flowchart for playNextVoiceline()
* https://www.figma.com/file/2lmXy1KrCZtyWePBhtpLT2/socket-display-voiceline-page?node-id=0%3A1&t=GnwdHqU5UJC1oqnH-1
*/
// play the next voiceline in the queue
export const playNextVoiceline = (): void => {
  console.log(`%cplayNextVoiceline()%c called.\nQueue: ${JSON.stringify(voicelineQueue, null, 2)}`, 'color: gold', 'color: white');
  // queue empty?
  if (voicelineQueue.length === 0) {
    console.log("Queue for voicelines empty");
    return;
  }

  // any voiceline has VoicelineStatus playing?
  if (voicelineQueue.some(voiceline => voiceline.voicelineStatus === VoicelineStatus.Playing || voiceline.voicelineStatus === VoicelineStatus.Loading)) {
    console.log("One or more voicelines are Loading or playing audio, will not load/play another voiceline till all voicelines have stopped playing audio");
    return;
  }

  // Find first PLAYABLE queued voiceline from queueTime
  console.log(voicelineQueue.map( (vl, i) => `${i}: ${vl.htmlElement.innerText}`).join('\n'));
  const nextPlayableVoiceline = getNextVoicelineToPlay();
  if (!nextPlayableVoiceline) {
    console.log('No next playable voiceline. Returning...');
    return;
  }
  console.log(`Next voiceline to play is: '${nextPlayableVoiceline.htmlElement.innerText}'`);

  // Load voiceline to play
  const audioElement = new Audio(nextPlayableVoiceline.audioSource);
  audioElement.volume = 0.75;
  nextPlayableVoiceline.voicelineStatus = VoicelineStatus.Loading;
  
  // Get container to append the new voiceline into
  const voicelineContainerDiv = document.getElementById("voicelineChatContainer");
  if (!voicelineContainerDiv) {
    throw new Error("#voicelineContainer div is missing from webpage");
  }

  /* Set callback on finishing loading voiceline to:
  *  1. Add voiceline element to DOM
  *  2. Set voiceline VoicelineStatus to 'Playing'
  * */
  audioElement.addEventListener('canplaythrough', () => {
    nextPlayableVoiceline.voicelineStatus = VoicelineStatus.Playing;
    
    // add new voiceline html element
    voicelineContainerDiv.appendChild(nextPlayableVoiceline.htmlElement);
    audioElement.play();
    console.log(`'%c${nextPlayableVoiceline.htmlElement.innerText}' %chas been set to %c'Playing'`, 'color: lightblue', 'color: white', 'color: plum');
  });

  /* Set callback on finishing playing voiceline to set VoicelineStatus to 'Ended' */
  audioElement.addEventListener('ended', () => {
    nextPlayableVoiceline.voicelineStatus = VoicelineStatus.Ended; 
    console.log(`'%c${nextPlayableVoiceline.htmlElement.innerText}' %chas been set to %c'Ended'`, 'color: lightblue', 'color: white', 'color: plum');
    // delay playing next voiceline by 1 second
    setTimeout(() => {
      playNextVoiceline();
    }, 1 * 1000);

    // set a timeout 7s after voiceline audio ending to remove the voiceline HTML element
    setTimeout( () => {
      nextPlayableVoiceline.voicelineStatus = VoicelineStatus.Removable;
      console.log(`'%c${nextPlayableVoiceline.htmlElement.innerText}' %chas been set to %c'Removable'`, 'color: lightblue', 'color: white', 'color: plum');
      purgeRemovableVoicelines();
    }, 7 * 1000);
  });

}
