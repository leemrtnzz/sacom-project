import { createEffect, createSignal, Show } from "solid-js";
import BodyMOdal from "../components/Modal/Body";
import ModalInput from "../components/Modal/ModalInput";

export default function Customer() {
    const [showModal, setShowModal] = createSignal(false);
    async function handleSubmit(e: Event) {
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        setShowModal(!showModal());
        const res = await fetch("/api/customer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            console.log(json);
    }
    createEffect(() => {
        console.log(showModal());
    });
  return (
    <section class="m-5">
        <h1 class="text-3xl font-semibold">Customer</h1>
        <h1 class="underline cursor-pointer" onclick={() => {
            setShowModal(!showModal());
        }}>Tambahkan data</h1>
        <Show when={showModal()} fallback="">
            <BodyMOdal handle={() => {
                setShowModal(!showModal());
            }} onSubmit={(e) => {
                handleSubmit(e);
            }}>
                <ModalInput id="name" type="string" name="name" label="Name" placeholder="John Doe" required = {true}/>
                <ModalInput id="company" type="string" name="company" label="Perusahaan" placeholder="PT. Mugiwara" required = {false}/>
                <ModalInput id="phone" type="string" name="phone" label="Nomor Telepon" placeholder="628389XX" required = {true}/>
            </BodyMOdal>
        </Show>
        <table>
            <thead>
                <tr class="bg-gray-200 border">
                    <th class="border px-5">ID</th>
                    <th class="border px-5">Nama</th>
                    <th class="border px-5">Perusahaan</th>
                    <th class="border px-5">Telepon</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="border px-5">1</td>
                    <td class="border px-5">Budi</td>
                    <td class="border px-5">PT. Mugiwara</td>
                    <td class="border px-5">6283841365567</td>
                </tr>
            </tbody>
        </table>
    </section>
  );
}