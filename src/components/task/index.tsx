import { HTMLAttributes, useCallback, useMemo, useRef } from "react";
import { getTaskState } from "#src/tools/get-task-state";
import moment from "moment";
import { TASK_STATE } from "#src/constants/task";
import { ActionMenu, MenuPosition } from "#src/components/action-menu";
import { ProcessNode } from "#src/@types/process-node";
import {
  AddButton,
  Cell,
  Executor,
  FirstRow,
  Point,
  Task,
  TaskButton,
  TaskId,
  TaskName,
  TaskState,
} from "./styled";

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
  onChangeTaskFinal?: (id: number) => void;
  onChangeTaskAuto?: (id: number) => void;
}

export function SchemaTask(props: TaskProps) {
  const { node, active, onSelectNode, horizontalProcess, menuTaskId, isLast } =
    props;
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

  const style = useMemo(() => {
    return {
      width: "100%",
      height: "100%",
      gridColumnStart: horizontalProcess ? node.weight + 1 : node.rowNumber + 1,
      gridRowStart: horizontalProcess ? node.rowNumber + 1 : node.weight + 1,
    };
  }, [node, horizontalProcess]);

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

  const onTaskClick = (e) => {
    if (e.target.closest(".task-button__add-new-task")) return;

    onSelectNode?.(node.id);
  };

  const taskClass = useMemo(() => {
    return (
      "process-schema__task unselectable" +
      (node.disabled
        ? " _disabled"
        : (active ? " _active" : "") + (state.isExpired ? " _expired" : ""))
    );
  }, [node, active]);

  const onMenuButtonClick = (e) => {
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
          : taskRef?.current?.offsetWidth + 10 + taskRef.current.offsetLeft,
        right: setToLeftBorder ? taskRef.current.offsetLeft + 40 : "",
        top: taskRef.current.offsetTop,
      };
    }
  }, [menuTaskId]);

  return node ? (
    <Cell
      horizontalProcess={horizontalProcess}
      row={node.rowNumber}
      column={node.weight}
    >
      <Task
        expired={state.isExpired}
        disabled={node.disabled}
        active={active}
        // className={taskClass}
        ref={taskRef}
        id={"js-task_" + node.id}
        onClick={onTaskClick}
        onDoubleClick={editTask}
      >
        <FirstRow>
          <TaskId className="task__id _grey50">{node.id}</TaskId>
          {node.dueDate && (
            <div className="task__due-date _black">
              {new Date(node.dueDate).toLocaleDateString("ru-RU")}
            </div>
          )}
          <TaskButton onMouseDown={onMenuButtonClick}>
            <Point />
            <Point />
            <Point />
          </TaskButton>
        </FirstRow>
        <TaskName>{node.name}</TaskName>
        <Executor className="task__executor _black">
          {node.executorName ? node.executorName : ""}
        </Executor>
        <TaskState className={`task-state ${state.css}`}>
          {state.caption}
        </TaskState>
        {!node.disabled && !node.isFinal && <AddButton onClick={addNewTask} />}
        <div className="task__ext-info">
          {node.isFinal && (
            <div className="ext-info__item _final">Конечная</div>
          )}
          {node.isAutomatic && <div className="ext-info__item _auto">Авто</div>}
        </div>
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
  ) : null;
}
