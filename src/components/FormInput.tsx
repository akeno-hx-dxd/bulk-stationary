// app/components/FormInput.tsx
import React from "react";

type FormInputProps = {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const FormInput: React.FC<FormInputProps> = ({ label, name, type = "text", value, onChange }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-gray-700 font-medium">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="p-2 border rounded-md"
    />
  </div>
);

export default FormInput;
