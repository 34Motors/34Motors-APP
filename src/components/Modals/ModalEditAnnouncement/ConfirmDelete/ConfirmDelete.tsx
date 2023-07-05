import { useAuth } from "@/contexts/authContext";
import { API } from "@/services/apis";
import { toast } from "react-toastify";

interface ConfirmDeleteProps {
  id: number;
  setPage: (page: number) => void;
}

const ConfirmDelete = ({ id, setPage }: ConfirmDeleteProps) => {
  const { token } = useAuth();

  async function handleDelete() {
    try {
      API.defaults.headers.common.Authorization = `Bearer ${token}`;
      await API.delete(`/cars/${id}`);
    } catch (error) {
      toast.error("Não foi possível excluir");
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-body2 font-600 text-grey-0 font-inter">
        Deseja realmente excluir esse anúncio?
      </h3>
      <div className="flex gap-2">
        <button className="btn-big btn-alert w-full" onClick={handleDelete}>
          Sim
        </button>
        <button
          className="btn-big btn-success w-full"
          onClick={() => setPage(1)}
        >
          Não (voltar)
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
