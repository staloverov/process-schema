export interface Color {
  colorMainLight: string;
  orange: string;

  grey01: string;
  grey05: string;
  grey20: string;
  grey30: string;
  grey40: string;
  grey50: string;
  grey60: string;
  grey70: string;
  grey80: string;
  grey100: string;

  red: string;
  brightRed: string;
  green: string;
  blue: string;
  conditionBlue: string;
  yellow: string;

  schemaBG: string;
  mainDark: string;
}

export interface Theme {
  color: Color;
}

export const main: Theme = {
  color: {
    colorMainLight: "#ffffff",
    orange: "#C8684C",
    grey01: "#F8F8F8",
    grey05: "#E5E5E7",
    grey20: "#D2D2D6",
    grey30: "#B4B4BB",
    grey40: "#9696A0",
    grey50: "#787885",
    grey60: "#5A5B6A",
    grey70: "#4A4B57",
    grey80: "#3A3A44",
    grey100: "#19191D",

    red: "#C8372D",
    brightRed: "#E80000",
    green: "#43A047",
    blue: "#2979FF",
    conditionBlue: "#002C9D",
    yellow: "#F1A205",

    schemaBG: "#c4c4c433",
    mainDark: "#000000",
  },
};
