import { forwardRef, HTMLAttributes } from "react";
import styled from "styled-components";
import { ProcessNode } from "#src/@types/process-node";

const Menu = styled.div`
  position: absolute;
  background-color: ${(p) => p.theme.color.grey70};
  border-radius: 8px;
  padding: 4px 15px;
  z-index: 3;
  width: fit-content;
`;

const MenuItem = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 29px;
  letter-spacing: 0.4px;
  color: ${(p) => p.theme.color.colorMainLight};
  cursor: pointer;
  opacity: 1;
  transition: opacity 300ms ease-in-out;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  &:hover {
    opacity: 0.5;
  }
`;

export type MenuPosition = {
  left: number | string;
  top: number | string;
};

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  node: ProcessNode;
  position?: MenuPosition;
  onEdit?: () => void;
  onEditLinks?: () => void;
  onFinalClick?: () => void;
  onAutoClick?: () => void;
  onDelete?: () => void;
}

export const ActionMenu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      node,
      position,
      onEdit,
      onEditLinks,
      onDelete,
      onFinalClick,
      onAutoClick,
      ...props
    }: MenuProps,
    ref
  ) => {
    const handleEditClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onEdit?.();
    };

    const handleEditLinksClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onEditLinks?.();
    };

    const handleFinalClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onFinalClick?.();
    };

    const handleAutoClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onAutoClick?.();
    };

    const handleDeleteClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onDelete?.();
    };

    return (
      <Menu style={position} {...props} ref={ref}>
        {!node.disabled && (
          <MenuItem onClick={handleEditClick}>Редактировать</MenuItem>
        )}
        {!node.disabled && (
          <MenuItem onClick={handleEditLinksClick}>Указать связи</MenuItem>
        )}
        {!node.disabled && !node.hasOutlines && !node.isAutomatic && (
          <MenuItem onClick={handleFinalClick}>
            {node.isFinal ? "Убрать признак конечной" : "Сделать конечной"}
          </MenuItem>
        )}
        {!node.disabled && node.isFinal && !node.executorName && (
          <MenuItem onClick={handleAutoClick}>
            {node.isAutomatic
              ? "Убрать признак автоматической"
              : "Сделать автоматической"}
          </MenuItem>
        )}
        <MenuItem onClick={handleDeleteClick}>Удалить</MenuItem>
      </Menu>
    );
  }
);
