import { JSX } from "solid-js";
interface modalInputProps {
    id: string,
    label: string,
    name: string,
    type: string,
    placeholder: string, 
    required: boolean
}
export default function modalInput(props: modalInputProps) {
    return (
        <div class="flex flex-col mb-5 gap-2">
            <label class="font-semibold">
                {props.label} {props.required ? <span class="text-red-400">*</span> : ""}
            </label>
            <input type={props.type} id={props.id} name={props.name} class="border rounded-sm px-2 py-2 text-base" placeholder={props.placeholder} required={props.required} />


        </div>
    );
}