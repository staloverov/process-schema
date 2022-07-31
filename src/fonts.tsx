import * as React from "react";

import Inter_ttf from "./assets/fonts/Inter-Regular.ttf";
import Fira_woff from "./assets/fonts/FiraSans-Regular.woff";
import Fira_woff2 from "./assets/fonts/FiraSans-Regular.woff2";

const fonts = `
    @font-face {
        font-family: 'Inter';
        src: url('${Inter_ttf}') format('truetype');
        font-display: swap;
        font-style: normal;
        font-feature-settings: 'tnum' on, 'lnum' on, 'cv03' on, 'cv04' on;
    }
    
    @font-face {
        font-family: 'Fira Sans';
        src: url('${Fira_woff}') format('woff');
        font-display: swap;
        font-style: normal;
        font-feature-settings: 'tnum' on, 'lnum' on, 'cv03' on, 'cv04' on;
    }
    
    @font-face {
        font-family: 'Fira Sans';
        src: url('${Fira_woff2}') format('woff2');
        font-display: swap;
        font-style: normal;
        font-feature-settings: 'tnum' on, 'lnum' on, 'cv03' on, 'cv04' on;
    }
`;

export function Fonts(
  props: React.StyleHTMLAttributes<HTMLStyleElement>
): JSX.Element {
  return <style type="text/css" children={fonts} {...props} />;
}
