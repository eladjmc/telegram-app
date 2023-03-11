import { ChangeEvent } from "react";
import "./Input.scss";

export interface InputProps {
  value: string | number;
  type: string;
  placeholder?: string;
  label: string;
  min?:number;
  max?:number;
  onChange: (e: ChangeEvent<HTMLInputElement>, label: string) => void;
}

const Input = ({ value, type, placeholder, label,min,max, onChange }: InputProps) => {
  return (
    <div className="input-container ic1">
      <input
        className="input"
        type={type}
        id={label}
        placeholder={placeholder}
        value={value}
        min={min}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, label)}
      />
      <div className="cut"></div>
      <label className="placeholder">{label}</label>
    </div>
  );
};

export default Input;
