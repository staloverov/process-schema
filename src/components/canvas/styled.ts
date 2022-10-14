import styled, { css } from "styled-components";
import { CustomScrollMixin } from "#src/tools/mixins";

export const Background = styled.div`
  overflow-x: auto;
  background-color: ${(p) => p.theme.color.schemaBG}
  border-radius: 10px;
  border: 1px solid ${(p) => p.theme.color.grey30}
  width: 100%;
  
  ${CustomScrollMixin}
`;

export interface CanvasProps {
  horizontalProcess: boolean;
  columnCount: number;
  rowCount: number;
}

const HorizontalMixin = css<CanvasProps>`
  grid-template-columns: ${(p) => `repeat(${p.columnCount}, 1fr)}`}
  grid-template-rows: ${(p) => `repeat(${p.rowCount}, 1fr)`}
  width: fit-content
`;

const VerticalMixin = css<CanvasProps>`
  grid-template-columns: ${(p) => `repeat(${p.rowCount}, 1fr)}`}
  grid-template-rows: ${(p) => `repeat(${p.columnCount}, 1fr)`}
`;

export const Canvas = styled.div<CanvasProps>`
  padding: 20px;
  margin: auto;
  height: auto;
  //width: fit-content
  justify-items: center;
  overflow-x: auto;
  min-height: 300px;
  //background-color: rgba(169, 169, 169, 0)
  -webkit-background-clip: text;
  -webkit-text-fill-color: inherit;
  transition: background-color 300ms;
  display: grid;
  ${(p) => (p.horizontalProcess ? HorizontalMixin : VerticalMixin)}
`;
