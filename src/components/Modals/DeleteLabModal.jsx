// O=============================================================================================O */

// Hooks de state:

// Icones:
import trash from "../../assets/icons/UI/delete.png";

// API:
import { deleteLab } from "../../api/lab_requests";

// Componentes:
import PButton from "../buttons/PButton";
import TButton from "../buttons/TButton";

function DeleteLabModal({ labId, labName, closeModal }) {
  return (
    <div className="bg-iflab_gray_light bg-opacity-50 w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-iflab_white rounded-md w-[30rem] shadow-xl p-5">
        <div className="flex flex-col justify-center gap-5">
          <h1 className="text-xl">Tem certeza?</h1>
        </div>
        <div className="bg-iflab_white_dark rounded-md my-5 py-5 flex flex-col gap-2">
          <h2 className="ml-3">
            Ao{" "}
            <span className="font-bold">deletar o laboratório {labName}</span>{" "}
            você perderá:
          </h2>
          <ul className="list-disc list-inside text-sm ml-5">
            <li>Sessões registradas no laboratório</li>
            <li>Reservas de elementos/equipamentos feitas no laboratório</li>
            <li>Usuários que possuem acesso ao laboratório</li>
            <li>Todas as informações do laboratório</li>
          </ul>
          <h2 className="ml-3">
            Essa ação é <span className="font-bold">irreversível</span>.
          </h2>
        </div>
        <div className="flex justify-between px-5">
          <TButton text="Não deletar laboratório" onClick={closeModal} />
          <PButton
            text="Deletar laboratório"
            onClick={() => {
              deleteLab(labId);
              closeModal();
              window.location.reload();
            }}
            icon={trash}
            goodAction={false}
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteLabModal;
