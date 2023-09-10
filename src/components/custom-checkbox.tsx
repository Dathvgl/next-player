"use client";

import { useRef } from "react";
import { ChildReact } from "~/types/type";

interface CustomCheckboxProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export default function CustomCheckbox(props: CustomCheckboxProps) {
  const { id, className, children } = props;
  const ref = useRef<HTMLInputElement>(null);

  function onClick() {
    if (ref.current) {
      ref.current.checked = !ref.current.checked;
    }
  }

  return (
    <button className={`relative ${className}`} onClick={onClick}>
      <input ref={ref} id={id} type="checkbox" className="absolute" />
      {children}
    </button>
  );
}
