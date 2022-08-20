import React, { HTMLAttributes, useState } from "react";
import { ReactComponent as Bucket } from "#src/assets/svg/bucket.svg";
import { ConditionEditor } from "./condition-editor";
import { Tooltip, TooltipButton } from "./styled";

export interface ArrowTooltipProps extends HTMLAttributes<HTMLDivElement> {
  onDeleteArrow: () => void;
  onApplyCondition: (value: string) => void;
  hasCondition: boolean;
  condition: string;
  disabled: boolean;
}

export const ArrowTooltip = ({
  condition,
  hasCondition,
  disabled,
  onDeleteArrow,
  onApplyCondition,
}: ArrowTooltipProps) => {
  const [editorVisible, setEditorVisible] = useState<boolean>(false);

  const toggleEditorVisible = () => {
    if (!disabled) setEditorVisible(!editorVisible);
  };

  const handleApplyCondition = (value: string) => {
    onApplyCondition(value);
    setEditorVisible(false);
  };

  return (
    <Tooltip hasCondition={hasCondition}>
      <div className="x-arrow__tooltip-buttons-block">
        <TooltipButton onClick={onDeleteArrow}>
          <Bucket />
        </TooltipButton>
        <TooltipButton disabled onClick={toggleEditorVisible}>
          if
        </TooltipButton>
      </div>

      {editorVisible && (
        <ConditionEditor
          value={condition}
          onApply={handleApplyCondition}
          onClose={toggleEditorVisible}
        />
      )}
    </Tooltip>
  );
};
