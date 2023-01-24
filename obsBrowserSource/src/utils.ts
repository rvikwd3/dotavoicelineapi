import { PlusTiers } from "./types";

export const getPlusTierImgSrc = (plusTier: PlusTiers | "caster"): string => {
  switch (plusTier) {
    case PlusTiers.bag:
      return "https://i.imgur.com/yDNqroF.png"
    case PlusTiers.bonus:
      return "https://i.imgur.com/mQCl91E.png"
    case PlusTiers.bronze:
      return "https://i.imgur.com/ZMt6Qd8.png"
    case PlusTiers.silver:
      return "https://i.imgur.com/uTVUfTT.png"
    case PlusTiers.gold:
      return "https://i.imgur.com/qAucNov.png"
    case PlusTiers.platinum:
      return "https://i.imgur.com/3PpskET.png"
    case PlusTiers.master:
      return "https://i.imgur.com/EsycvXt.png"
    case PlusTiers.grandmaster:
      return "https://i.imgur.com/wEb9DEG.png"
    case 'caster':
      return "https://i.imgur.com/mQCl91E.png"
    default:
      console.log("getPlusTierImgSrc unreachable code: default case in switch");
      return "";
  }
}

export const getRandomDotaPlayerColor = (): string => {
   const dotaPlayerColorList = [
    '#3074F9',
    '#66FFC0',
    '#BD00B7',
    '#F8F50A',
    '#FF6901',
    '#FF88C5',
    '#A2B349',
    '#63DAFA',
    '#01831F',
    '#9F6B00'
  ]
  return dotaPlayerColorList[Math.floor(Math.random() * dotaPlayerColorList.length)]; 
}