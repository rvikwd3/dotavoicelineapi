import { SyntheticEvent } from "react";
import { PillNames } from "../types";

type Props = {
  selectedPill: PillNames;
  icon: (className: string) => JSX.Element;
  content: PillNames;
  handleClick: (event: SyntheticEvent) => void;
};

export const Pill = ({ selectedPill, icon, content, handleClick }: Props) => {
  const darkPill = (
    <div className="darkPill" onClick={handleClick}>
      {icon("darkPillIcon")}
      <p className="pillContent">{content}</p>
    </div>
  );

  const lightPill = (
    <div className="lightPill" onClick={handleClick}>
      {icon("lightPillIcon")}
      <p className="pillContent">{content}</p>
    </div>
  );

  return selectedPill === content ? darkPill : lightPill;
};
