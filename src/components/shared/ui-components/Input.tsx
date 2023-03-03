import { ChangeEvent } from "react";
import "./Input.scss";

export interface InputProps {
  value: string | number;
  type: string;
  placeholder?: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>, label: string) => void;
}

const Input = ({ value, type, placeholder, label, onChange }: InputProps) => {
  return (
    <div className="input-container ic1">
      <input
        className="input"
        type={type}
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, label)}
      />
      <div className="cut"></div>
      <label className="placeholder">{label}:</label>
    </div>
  );
};

export default Input;
