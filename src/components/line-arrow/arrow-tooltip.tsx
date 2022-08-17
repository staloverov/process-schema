import React, { useState } from "react";
import Bucket from "tt-assets/svg/bucket.svg";
import ConditionEditor from "./condition-editor";

type Props = {
  onDeleteArrow: Function;
  onApplyCondition: Function;
  hasCondition: boolean;
  condition: string;
  disabled: boolean;
};

export default function ArrowTooltip(props: Props) {
  const [editorVisible, setEditorVisible] = useState(false);
  const { hasCondition, onDeleteArrow, onApplyCondition, condition, disabled } =
    props;

  const toggleEditorVisible = () => {
    if (!disabled) setEditorVisible(!editorVisible);
  };

  const applyCondition = (e) => {
    onApplyCondition(e);
    setEditorVisible(false);
  };

  return (
    <div
      className={
        "x-arrow__tooltip" + (hasCondition ? " _with-condition" : " _default")
      }
    >
      <div className="x-arrow__tooltip-buttons-block">
        <button className="x-arrow__tooltip-button" onClick={onDeleteArrow}>
          <Bucket />
        </button>
        <button
          className={"x-arrow__tooltip-button" + (disabled ? " _disabled" : "")}
          onClick={toggleEditorVisible}
        >
          if
        </button>
      </div>

      {editorVisible && (
        <ConditionEditor
          value={condition}
          onApply={applyCondition}
          onClose={toggleEditorVisible}
        />
      )}
    </div>
  );
}
