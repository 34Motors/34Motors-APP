import { commentReturn } from "@/interfaces/comment.interfaces";
import { CommentCard } from "./commentCard";

export const CommentsList = ({ comments }: { comments: commentReturn[] }) => {

  const commentsToRender = comments.map((comment) => (
    <CommentCard key={comment.id+Math.random()} commentData={comment} />
  ));

  return (
    <div>
      <h4 className="text-heading6 font-600 font-lexend text-grey-1 mb-6">
        Comentários
      </h4>
      <ul className="flex flex-col gap-11">
        {commentsToRender.length > 0 ? (
          commentsToRender
        ) : (
          <p className="text-base text-grey-2 font-400 font-inter leading-7">
            Este carro ainda não possui comentários.
          </p>
        )}
      </ul>
    </div>
  );
};
