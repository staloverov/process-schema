import React, {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { getTaskState } from "#src/tools/get-task-state";
import moment from "moment";
import { TASK_STATE } from "#src/constants/task";
import { ActionMenu, MenuPosition } from "#src/components/action-menu";
import { ProcessNode } from "#src/@types/process-node";
import {
  AddButton,
  Cell,
  Executor,
  ExtInfo,
  ExtInfoItem,
  FirstRow,
  Point,
  Task,
  TaskButton,
  TaskId,
  TaskName,
  TaskState,
} from "./styled";
import assignRef from "#src/components/assignRef";

export interface TaskProps extends HTMLAttributes<HTMLDivElement> {
  node: ProcessNode;
  active: boolean;
  isLast: boolean;
  menuTaskId: number;
  horizontalProcess: boolean;
  onSelectNode?: (id: number) => void;
  onEditLinks?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onMenuButtonClick?: (id: number) => void;
  onAddNewTask?: (id: number) => void;
  onChangeTaskFinal?: (id: number, value: boolean) => void;
  onChangeTaskAuto?: (id: number, value: boolean) => void;
}

export const SchemaTask = forwardRef<HTMLDivElement, TaskProps>(
  (props: TaskProps, ref) => {
    const {
      node,
      active,
      onSelectNode,
      horizontalProcess,
      menuTaskId,
      isLast,
    } = props;
    const taskRef = useRef<HTMLDivElement>(null);

    const editLinks = useCallback(() => {
      if (props.onEditLinks) {
        props.onEditLinks(node.id);
      }
    }, [menuTaskId]);

    const editTask = useCallback(() => {
      if (props.onEdit) {
        props.onEdit(node.id);
      }
    }, [menuTaskId, active]);

    const deleteTask = useCallback(() => {
      if (props.onDelete) {
        props.onDelete(node.id);
      }
    }, [menuTaskId]);

    const addNewTask = useCallback(() => {
      if (props.onAddNewTask) {
        props.onAddNewTask(node.id);
      }
    }, [node]);

    const setTaskFinal = useCallback(() => {
      if (props.onChangeTaskFinal) {
        props.onChangeTaskFinal(node.id, !node.isFinal);
      }
    }, [node]);

    const setTaskAuto = useCallback(() => {
      if (props.onChangeTaskAuto) {
        props.onChangeTaskAuto(node.id, !node.isAutomatic);
      }
    }, [node]);

    const state = useMemo(() => {
      const isExpired =
          node &&
          node.state !== TASK_STATE.DONE.value &&
          moment(node.dueDate).isBefore(moment()),
        _state = getTaskState(node.state);

      return isExpired
        ? { isExpired, css: "_expired", caption: _state.caption }
        : { isExpired, ..._state };
    }, [node]);

    const handleTaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.currentTarget.closest(".task-button__add-new-task")) return;

      onSelectNode?.(node.id);
    };

    const handleMenuButtonDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (props.onMenuButtonClick) {
        e.stopPropagation();
        props.onMenuButtonClick(node.id);
      }
    };

    const menuPosition = useMemo<MenuPosition | undefined>(() => {
      if (menuTaskId === node.id) {
        const setToLeftBorder =
          isLast &&
          (horizontalProcess || (!horizontalProcess && node.rowNumber > 0));

        return {
          left: setToLeftBorder
            ? ""
            : (taskRef?.current?.offsetWidth || 0) +
              10 +
              (taskRef?.current?.offsetLeft || 0),
          right: setToLeftBorder
            ? (taskRef?.current?.offsetLeft || 0) + 40
            : "",
          top: taskRef?.current?.offsetTop || 0,
        };
      }
    }, [menuTaskId]);

    return (
      <Cell
        horizontalProcess={horizontalProcess}
        row={node.rowNumber}
        column={node.weight}
      >
        <Task
          ref={assignRef(ref, taskRef)}
          expired={state.isExpired}
          disabled={node.disabled}
          active={active}
          id={"js-task_" + node.id}
          onClick={handleTaskClick}
          onDoubleClick={editTask}
        >
          <FirstRow>
            <TaskId className="task__id _grey50">{node.id}</TaskId>
            {node.dueDate && (
              <div className="task__due-date _black">
                {new Date(node.dueDate).toLocaleDateString("ru-RU")}
              </div>
            )}
            <TaskButton onMouseDown={handleMenuButtonDown}>
              <Point />
              <Point />
              <Point />
            </TaskButton>
          </FirstRow>
          <TaskName>{node.name}</TaskName>
          <Executor>{node.executorName ? node.executorName : ""}</Executor>
          <TaskState className={`task-state ${state.css}`}>
            {state.caption}
          </TaskState>
          {!node.disabled && !node.isFinal && (
            <AddButton onClick={addNewTask} />
          )}
          <ExtInfo>
            {node.isFinal && <ExtInfoItem type={"final"}>Конечная</ExtInfoItem>}
            {node.isAutomatic && <ExtInfoItem type={"auto"}>Авто</ExtInfoItem>}
          </ExtInfo>
        </Task>
        {menuTaskId === node.id && (
          <ActionMenu
            node={node}
            position={menuPosition}
            onEdit={editTask}
            onFinalClick={setTaskFinal}
            onAutoClick={setTaskAuto}
            onDelete={deleteTask}
            onEditLinks={editLinks}
          />
        )}
      </Cell>
    );
  }
);
