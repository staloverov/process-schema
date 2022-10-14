import { css } from "styled-components";

export const CustomScrollMixin = css`
  &::-webkit-scrollbar-track {
    border-radius: 8px 8px 64px 64px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px 8px 64px 64px;
  }
`;
