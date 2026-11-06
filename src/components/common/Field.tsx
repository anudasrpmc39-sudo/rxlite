import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string };
export function Field({label,hint,...props}: Props) { return <label className="field"><span>{label}</span><input {...props}/>{hint && <small>{hint}</small>}</label>; }
export function TextArea({label,...props}: TextareaHTMLAttributes<HTMLTextAreaElement> & {label:string}) { return <label className="field"><span>{label}</span><textarea {...props}/></label>; }
