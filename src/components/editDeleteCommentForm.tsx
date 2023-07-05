import { commentReturn } from "@/interfaces/comment.interfaces";
import { useForm } from "react-hook-form";

interface editDeleteCommentInterface {
    deleteComment: () => void;
    setIsClicked: () => void;
}

const EditDeleteCommentForm = ({deleteComment, setIsClicked}: editDeleteCommentInterface) => {
  const { register, handleSubmit, reset } = useForm<commentReturn>({});

  return (
    <form>
      <div className="w-full h-[140px] p-3 flex flex-col items-end justify-between bg-white border-solid border-grey-7 border-[1.5px] rounded text-grey-3 font-inter font-400 ">
        <textarea
          id=""
          className="w-full focus:outline-none h-1/2"
          placeholder="Digitar comentário"
          {...register("description")}
        ></textarea>
        <div className="flex gap-2">
          <button type="button" className="btn-negative p-2 text-sm font-600 font-inter rounded" onClick={setIsClicked}>
            Cancelar
          </button>
          <button type="button" className="btn-alert p-2 text-sm font-600 font-inter rounded" onClick={() => deleteComment()}>
            Excluir comentário
          </button>
          <button className="btn-brand p-2 text-sm font-600 font-inter rounded">
            Salvar alterações
          </button>
        </div>
      </div>
    </form>
  );
};

export { EditDeleteCommentForm };
