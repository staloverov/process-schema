import React, { useRef } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SchemaTask } from "#src/components/task";
import { ProcessNode } from "#src/@types/process-node";
import styled from "styled-components";
import { ARROW_TYPE, LineArrow } from "#src/components/line-arrow/index";
import { Arrow } from "#src/@types/arrow";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Primitives/Arrow",
  component: SchemaTask,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof SchemaTask>;

const startNode: ProcessNode = {
  id: 1,
  name: "Start",
  state: 1,
  dueDate: null,
  isFinal: false,
  isAutomatic: false,
  disabled: false,
  isExpired: false,
  executorName: "User 1",
  weight: 10,
  rowNumber: 1,
  index: 13,
  dependencies: {
    count: 3,
    nodes: [515],
  },
  hasInlines: true,
  hasOutlines: true,
};

const finishNode: ProcessNode = {
  id: 2,
  name: "Finish",
  state: 1,
  dueDate: null,
  isFinal: true,
  isAutomatic: false,
  disabled: false,
  isExpired: false,
  executorName: "User 2",
  weight: 10,
  rowNumber: 1,
  index: 13,
  dependencies: {
    count: 3,
    nodes: [515],
  },
  hasInlines: true,
  hasOutlines: true,
};

const arrow1: Arrow = {
  id: 1,
  disabled: false,
  expression: null,
  from: 1,
  to: 2,
  hasCondition: false,
  offsetStart: -20,
  offsetEnd: -20,
};

const arrow2: Arrow = {
  id: 1,
  disabled: false,
  expression: null,
  from: 1,
  to: 2,
  hasCondition: false,
  offsetStart: 20,
  offsetEnd: 20,
};

const arrow3: Arrow = {
  id: 1,
  disabled: false,
  expression: null,
  from: 1,
  to: 2,
  hasCondition: false,
};

const Wrapper = styled.div`
  display: flex;
  column-gap: 100px;
`;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SchemaTask> = (args) => {
  const startNodeRef = useRef<HTMLDivElement>(null);
  const finishNodeRef = useRef<HTMLDivElement>(null);

  return (
    <Wrapper>
      <SchemaTask
        ref={startNodeRef}
        node={startNode}
        menuTaskId={0}
        active={false}
        horizontalProcess={true}
        isLast={false}
      />
      <SchemaTask
        ref={finishNodeRef}
        node={finishNode}
        menuTaskId={0}
        active={false}
        horizontalProcess={true}
        isLast={true}
      />
      <LineArrow
        start={startNodeRef}
        end={finishNodeRef}
        type={ARROW_TYPE.IN}
        item={arrow1}
        setSelected={(value) => console.log(value)}
        selected={0}
        horizontalProcess={true}
      />
      <LineArrow
        start={startNodeRef}
        end={finishNodeRef}
        type={ARROW_TYPE.OUT}
        item={arrow2}
        setSelected={(value) => console.log(value)}
        selected={0}
        horizontalProcess={true}
      />
      <LineArrow
        start={startNodeRef}
        end={finishNodeRef}
        type={ARROW_TYPE.DEFAULT}
        item={arrow3}
        setSelected={(value) => console.log(value)}
        selected={0}
        horizontalProcess={true}
      />
    </Wrapper>
  );
};

export const Primary = Template.bind({});
