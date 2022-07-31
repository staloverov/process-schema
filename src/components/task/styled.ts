import styled, { css } from "styled-components";
import { black, grey50 } from "#src/typography";

export interface CellProps {
  horizontalProcess: boolean;
  column: number;
  row: number;
}

export const AddButton = styled.button`
  background-image: url("#src/assets/png/plus.png");
  position: absolute;
  right: -8px;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  height: 16px;
  width: 16px;
  border-radius: 50%;
  cursor: pointer;
  background-size: contain;
  background-origin: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-color: inherit;
  visibility: hidden;
  opacity: 0;
  transition: opacity 300ms ease;
`;

export const Cell = styled.div<CellProps>`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 265px;
  position: relative;
  width: 100%;
  height: 100%;
  grid-column-start: ${(p) => (p.horizontalProcess ? p.column + 1 : p.row + 1)};
  grid-row-start: ${(p) => (p.horizontalProcess ? p.row + 1 : p.column + 1)};
`;

export interface TaskProps {
  active: boolean;
  expired: boolean;
  disabled: boolean;
}

const taskDisabledMixin = css`
  filter: grayscale(100%);
  opacity: 0.5;
`;

export const Task = styled.div<TaskProps>`
  position: relative;
  padding: 10px;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${(p) => p.theme.color.colorMainLight};
  border-radius: 8px;
  height: 136px;
  width: 245px;
  cursor: pointer;
  transition: border 300ms ease-in-out;
  flex-direction: column;
  border: 1px solid transparent;
  user-select: none;

  ${(p) => p.disabled && taskDisabledMixin};

  background-color: ${(p) =>
    p.active
      ? "#FFF8EA"
      : p.expired
      ? "#FEEDEC"
      : p.theme.color.colorMainLight};

  &:hover {
    border-color: #19191d;

    ${AddButton} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const FirstRow = styled.div`
  display: flex;
  width: 100%;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 22px;
  letter-spacing: 0.25px;
`;

export const TaskId = styled.div`
  flex: 1 0 auto;
  ${grey50};
`;

export const TaskButton = styled.button`
  width: 22px;
  height: 21px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-left: 5px;
  outline: none;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  transition: background-color 300ms ease;
  cursor: pointer;
  &:hover {
    background-color: ${(p) => p.theme.color.grey05};
  }
`;

export const Point = styled.div`
  width: 3px;
  height: 3px;
  background-color: ${(p) => p.theme.color.grey40};
  border-radius: 50%;
`;

export const TaskName = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.5px;
`;

export const Executor = styled.div`
  ${black};
  display: flex;
  width: 100%;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 22px;
  letter-spacing: 0.25px;
`;

export const TaskState = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
  padding: 0 8px;
  border-radius: 32px;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 22px;
  letter-spacing: 0.25px;
`;
