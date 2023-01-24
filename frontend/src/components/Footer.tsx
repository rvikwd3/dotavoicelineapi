import { GithubIcon, TwitterIcon } from "../icons";
import { getLink } from "../utils";

const Footer = () => {
  return (
    <div className="footerSection">
      <div className="footerLinkContainer">
        <a className="footerLink" href="#" target="_blank" rel="noopener noreferrer">
          Terms Of Service
        </a>
        <a
          href={getLink("projectRepo")}
          target="_blank"
          rel="noopener noreferrer"
          className="projectRepoLink footerLink"
        >
          <span className="projectRepo">Project Repo</span>
          <GithubIcon className="footerGithubIcon" />
        </a>
      </div>
      <div className="footerVanity">
        <span className="vanity">2023 © Ravikiran Kawade</span>
        <div className="vanityIconContainer">
          <a
            href={getLink("raviGithubProfile")}
            className="iconLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="vanityIcon" />
          </a>
          <a
            href={getLink("raviTwitterProfile")}
            className="iconLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon className="vanityIcon" />
          </a>
        </div>
      </div>
      <div className="DotaDisclaimer">
        <span>
          DOTA is a trademark of Valve Corporation and used under license. By
          making use of the term "DOTA" in any content posted on any
          DotaVoicelineApi website, you agree that use of this trademark is
          subject to Valve’s trademark guidelines found at
          https://store.steampowered.com/legal.
        </span>
      </div>
    </div>
  );
};

export default Footer;
