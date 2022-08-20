import React, { forwardRef, HTMLAttributes, useEffect, useState } from "react";
import { Button } from "#src/components/ui-kit";
import {
  CloseButton,
  Editor,
  ValueTextBox,
} from "#src/components/line-arrow/styled";

export interface ConditionEditorProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  onApply: (value: string) => void;
  onClose: () => void;
}

export const ConditionEditor = forwardRef<HTMLDivElement, ConditionEditorProps>(
  ({ value, onApply, onClose, ...props }: ConditionEditorProps, ref) => {
    const [myValue, setMyValue] = useState<string>(value);

    useEffect(() => {
      setMyValue(value);
    }, [value]);

    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMyValue(e.currentTarget.value);
    };

    const handleApplyClick = () => {
      if (onApply && myValue !== value) {
        onApply(myValue);
      }
    };

    return (
      <Editor ref={ref} {...props}>
        <CloseButton onClick={onClose} />
        <ValueTextBox
          value={myValue}
          label={"Условие"}
          multiline={true}
          onChange={changeValue}
        />
        <Button
          appearance={myValue !== value ? "primary" : "secondary"}
          dimension={"s"}
          onClick={handleApplyClick}
        >
          Сохранить
        </Button>
      </Editor>
    );
  }
);
