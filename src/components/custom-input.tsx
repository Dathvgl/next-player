"use client";

import { HTMLInputTypeAttribute, useEffect, useRef } from "react";

interface CustomCheckboxProps {
  id?: string;
  className?: string;
  name?: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  state?: boolean;
  callback?: () => void;
  children: React.ReactNode;
}

export default function CustomInput(props: CustomCheckboxProps) {
  const { id, className, name, value, type, state, callback, children } = props;
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state && ref.current) {
      ref.current.checked = !ref.current.checked;
      callback?.();
    }
  }, [state]);

  function onClick() {
    if (ref.current) {
      ref.current.checked = !ref.current.checked;
    }
  }

  return (
    <button className={`relative ${className}`} onClick={onClick}>
      <input
        ref={ref}
        id={id}
        type={type}
        name={name}
        value={value}
        className="absolute appearance-none"
      />
      {children}
    </button>
  );
}
