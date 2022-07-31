import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ActionMenu } from "./index";
import { ProcessNode } from "#src/@types/process-node";
import styled from "styled-components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Primitives/ActionMenu",
  component: ActionMenu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
} as ComponentMeta<typeof ActionMenu>;

const nodeInWaitingState: ProcessNode = {
  id: 514,
  name: "Финализация",
  state: 1,
  dueDate: null,
  isFinal: false,
  isAutomatic: false,
  disabled: false,
  isExpired: false,
  executorName: "Sasha Sokolov",
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

const Wrapper = styled.div`
  height: 200px;
`;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ActionMenu> = (args) => (
  <Wrapper>
    <ActionMenu {...args} />
  </Wrapper>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  node: nodeInWaitingState,
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//     label: 'Button',
// };
//
// export const Large = Template.bind({});
// Large.args = {
//     size: 'large',
//     label: 'Button',
// };
//
// export const Small = Template.bind({});
// Small.args = {
//     size: 'small',
//     label: 'Button',
// };
