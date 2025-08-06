import { JSX } from "solid-js";

interface ModalProps {
    handle: () => void;
    onSubmit:(e: Event) => void;
    children: JSX.Element | JSX.Element[];
}

export default function Modal (props: ModalProps) {
    return (
        <div class="flex z-100 bg-black/50 fixed top-0 left-0 right-0 bottom-0">
            <button class="absolute text-white text-3xl top-3 right-10" onClick={props.handle}>x</button>
            <div class="flex justify-center items-center w-full">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    props.onSubmit(e);
                }} class="bg-white flex flex-col p-5 rounded-lg w-1/3">
                    {props.children}
                    <button type="submit" class="bg-blue-700 rounded-sm text-white py-2">Submit</button>
                </form>
            </div>
            </div>
    )
}