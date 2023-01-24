export enum PlusTiers {
  bronze = 'bronze',
  silver = 'silver',
  gold = 'gold',
  platinum = 'platinum',
  master = 'master',
  grandmaster = 'grandmaster',
  bonus = 'bonus',
  bag = 'bag'
}

export interface VoicelineEmitMessage {
  hero: {
    name: string;
    avatar: string;
  },
  plusTier: PlusTiers | 'caster';
  voiceline: {
    url: string;
    text: string;
  }
  username: string;
}

export enum VoicelineStatus {
  Queued = "Queued",
  Loading = "Loading",
  Playing = "Playing",
  Ended = "Ended",
  Removable = "Removable"
}

export interface VoicelineRef {
  htmlElement: HTMLDivElement;
  audioSource: string;
  queueTime: number;
  voicelineStatus: VoicelineStatus;
}