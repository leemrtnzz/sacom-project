import { createEffect, createSignal, Show } from "solid-js";
import BodyMOdal from "../components/Modal/Body";
import ModalChildren from "../components/Modal/Children";

export default function Customer() {
    const [showModal, setShowModal] = createSignal(false);
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
            }}>
                <ModalChildren id="name" lable="Name" placeholder="John Doe" required = {true}/>
                <ModalChildren id="company" lable="Perusahaan" placeholder="PT. Mugiwara" required = {false}/>
                <ModalChildren id="phone" lable="Nomor Telepon" placeholder="628389XX" required = {true}/>
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