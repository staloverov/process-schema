import React, {
  forwardRef,
  HTMLAttributes,
  useMemo,
  useRef,
  useState,
} from "react";
import { Xwrapper } from "react-xarrows";
import assignRef from "#src/components/assignRef";
import { Background, Canvas } from "#src/components/canvas/styled";
import { ProcessNode } from "#src/@types/process-node";
import { SchemaTask } from "#src/components/task";

export interface SchemaProps extends HTMLAttributes<HTMLDivElement> {
  /** признак горизонтального расположения схемы процесса */
  horizontalProcess: boolean;
  rowCount: number;
  colCount: number;
  nodes: Array<ProcessNode>;
  actionMenuTaskId: number;
  activeTaskId?: number;

  onActivateTask?: (id: number) => void;
  onEditTask?: (id: number) => void;
  onEditTaskLinks?: (id: number) => void;
  onAddTask?: (id: number) => void;
  onDeleteTask?: (id: number) => void;
}

export const Schema = forwardRef<HTMLDivElement, SchemaProps>(
  (
    {
      horizontalProcess,
      rowCount,
      colCount,
      nodes,
      activeTaskId,
      actionMenuTaskId,
      onActivateTask,
      onEditTask,
      onEditTaskLinks,
      onAddTask,
      onDeleteTask,
      ...props
    }: SchemaProps,
    ref
  ) => {
    const [activeTask, setActiveTask] = useState<number | undefined>(
      activeTaskId
    );
    const canvasRef = useRef<HTMLDivElement>(null);

    const handleSelectNode = (id: number) => {
      if (activeTask !== id) {
        setActiveTask(id);
        onActivateTask?.(id);
      }
    };

    const handleMenuButtonClick = (id: number) => {
      if (activeTask !== id) setActiveTask(id);
    };

    const handleEditTask = (id: number) => {
      onEditTask?.(id);
    };

    const handleEditTaskLinks = (id: number) => {
      onEditTaskLinks?.(id);
    };

    const handleDeleteTask = (id: number) => {
      onDeleteTask?.(id);
    };

    const handleAddTask = (id: number) => {
      onAddTask?.(id);
    };

    const tasks = useMemo(() => {
      return nodes.map((node) => {
        const isRight = horizontalProcess
          ? node.weight === colCount - 1
          : node.rowNumber === rowCount - 1;

        return (
          <SchemaTask
            node={node}
            active={activeTask === node.id}
            horizontalProcess={horizontalProcess}
            onSelectNode={handleSelectNode}
            menuTaskId={actionMenuTaskId}
            onEdit={handleEditTask}
            onEditLinks={handleEditTaskLinks}
            onDelete={handleDeleteTask}
            onMenuButtonClick={handleMenuButtonClick}
            // onChangeTaskAuto={changeTaskAuto}
            // onChangeTaskFinal={changeTaskFinal}
            onAddNewTask={handleAddTask}
            isLast={isRight}
            key={node.id}
          />
        );
      });
    }, [nodes]);

    return (
      <Xwrapper>
        <Background id="schema_container" ref={assignRef(ref, canvasRef)}>
          <Canvas
            horizontalProcess={horizontalProcess}
            rowCount={rowCount}
            columnCount={colCount}
          >
            {tasks}
            {arrows}
          </Canvas>
        </Background>
      </Xwrapper>
    );
  }
);
