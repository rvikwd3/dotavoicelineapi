const linkReference = {
  homepage:  "https://dotavoicelineapi.live",
  voicelineReference:  "https://dota-plus-voicelines-page.netlify.app",
  projectRepo: "https://github.com/rvikwd3/dotavoicelineapi",
  raviGithubProfile: "https://github.com/rvikwd3",
  raviTwitterProfile: "https://twitter.com/rvikwd7",
  nightbotHomepage: "https://nightbot.tv/",
  nightbotCommandGist: "https://gist.github.com/rvikwd3/f120f0e77a46055a28589bab9f2bd84a",
  socketDisplayPage: "https://dotavoicelineapi.live/user/socketDisplayPage?id=",
};

export const getLink = (linkName: keyof typeof linkReference):string => {
  return linkReference[linkName];
}