import { useAuth } from "@/contexts/authContext";
import { commentReturn, editComment } from "@/interfaces/comment.interfaces";
import { editCommentSchema } from "@/schemas/commentSchema";
import { API } from "@/services/apis";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface editDeleteCommentInterface {
  deleteComment: () => void;
  editComment: (commentData: editComment) => void;
  setIsClicked: () => void;
  commentData: commentReturn;
}

const EditDeleteCommentForm = ({
  deleteComment,
  setIsClicked,
  editComment,
  commentData,
}: editDeleteCommentInterface) => {
  const { register, handleSubmit, reset } = useForm<editComment>({
    resolver: zodResolver(editCommentSchema),
    mode: "onBlur",
    defaultValues: {
      description: commentData.description,
    },
  });

  return (
    <form onSubmit={handleSubmit(editComment)}>
      <div className="w-full h-[140px] p-3 flex flex-col items-end justify-between bg-white border-solid border-grey-7 border-[1.5px] rounded text-grey-3 font-inter font-400 ">
        <textarea
          id=""
          className="w-full focus:outline-none h-1/2"
          placeholder="Digitar comentário"
          {...register("description")}
        ></textarea>
        <div className="flex gap-2 ">
          <button
            type="button"
            className="btn-negative p-2 text-sm font-600 font-inter rounded lt:text-xs lt:p-1"
            onClick={setIsClicked}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn-alert p-2 text-sm font-600 font-inter rounded lt:text-xs lt:p-1"
            onClick={() => deleteComment()}
          >
            Excluir comentário
          </button>
          <button className="btn-brand p-2 text-sm font-600 font-inter rounded lt:text-xs lt:p-1">
            Salvar alterações
          </button>
        </div>
      </div>
    </form>
  );
};

export { EditDeleteCommentForm };
