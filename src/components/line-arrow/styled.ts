import styled from "styled-components";
import { TextBox } from "#src/components/ui-kit";

export const Tooltip = styled.div<{ hasCondition?: boolean }>`
  padding: 1px 8px;
  border-radius: 24px;
  display: flex;
  background-color: ${(p) =>
    p.hasCondition ? p.theme.color.conditionBlue : p.theme.color.grey70};
`;

export const Editor = styled.div`
  position: absolute;
  top: 35px;
  left: 50%;
  transform: translateX(-50%);
  width: 305px;
  height: auto;
  background-color: ${(p) => p.theme.color.colorMainLight};
  padding: 16px;
  box-shadow: 0 2px 10px rgba(41, 42, 49, 0.12);
  border-radius: 8px;
`;

export const CloseButton = styled.button`
  position: absolute;
  width: 20px;
  height: 20px;
  background: ${(p) => p.theme.color.grey100};
  top: -16px;
  right: -20px;
  border-radius: 50%;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 15px;
    height: 2px;
    background-color: ${(p) => p.theme.color.colorMainLight};
    -webkit-transition: background-color 0.3s ease;
    transition: background-color 0.3s ease;
  }

  &:before {
    -webkit-transform: translate(-50%, -50%) rotate(45deg);
    -ms-transform: translate(-50%, -50%) rotate(45deg);
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    -webkit-transform: translate(-50%, -50%) rotate(-45deg);
    -ms-transform: translate(-50%, -50%) rotate(-45deg);
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export const ValueTextBox = styled(TextBox)`
  margin-bottom: 12px;
`;

export const TooltipButton = styled.button`
  background: transparent;
  padding: 0;
  cursor: pointer;
  position: relative;
  height: 22px;
  width: 22px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.25px;
  color: ${(p) => p.theme.color.colorMainLight};
  opacity: 1;
  transition: opacity 300ms ease-in-out;

  &:not(:last-child) {
    margin-right: 7px;
  }

  &:last-child {
    margin-left: 7px;
  }

  &:after {
    content: "";
    position: absolute;
    top: 4px;
    right: -7px;
    height: 14px;
    width: 1px;
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:hover {
    opacity: ${(p) => (p.disabled ? 0.2 : 0.5)};
  }
`;
