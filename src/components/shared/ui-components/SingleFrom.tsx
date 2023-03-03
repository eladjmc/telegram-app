import "./SingleForm.scss";
import { ReactNode, ChangeEvent, FormEvent, FormEventHandler } from "react";
import Input, { InputProps } from "./Input";

// Should contain a form with a single input field and a submit button

interface FooterButton {
  onClick: () => void;
  text: string;
  color?: string;
}

interface Props {
  inputs: InputProps[];
  button?: FooterButton;
  title: string;
  submitText?: string;
  onSubmit: () => void;
  children?: ReactNode;
}

const SingleFrom = ({
  inputs,
  button,
  title,
  onSubmit,
  submitText,
  children,
}: Props) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      <h1 className="title">{title}</h1>
      {inputs.map((input: InputProps) => {
        return (
          <Input
            key={input.label}
            label={input.label}
            placeholder={input.placeholder}
            value={input.value}
            onChange={input.onChange}
            type={input.type}
          />
        );
      })}
      <button className="submit" type="submit">{submitText || "Submit"}</button>
    </form>
  );
};

export default SingleFrom;
