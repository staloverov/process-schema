import { TASK_STATE } from "../constants/task";

export const getTaskState = (state: number) => {
  const _state = Object.values(TASK_STATE).find((item) => item.value === state);

  return _state
    ? { css: _state.css, caption: _state.label }
    : { css: "_error", caption: "Ошибка" };
};
