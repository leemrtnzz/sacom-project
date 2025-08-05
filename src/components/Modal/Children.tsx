import { JSX } from "solid-js";
interface modalChildrenProps {
    id: string,
    lable: string, 
    placeholder: string, 
    required: boolean
}
export default function modalChildren(props: modalChildrenProps) {
    return (
        <div class="flex flex-col mb-5 gap-2">
            <label class="font-semibold">
                {props.lable} {props.required ? <span class="text-red-400">*</span> : ""}
            </label>
            <input id={props.id} class="border rounded-sm px-2 py-2 text-base" placeholder={props.placeholder} type="text" />
        </div>
    );
}