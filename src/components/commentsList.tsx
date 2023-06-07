import { CommentCard } from "./commentCard";

export const CommentsList = () => {
  return (
    <div className="w-11/12 bg-white max-w-screen-sm px-7 py-9 rounded">
      <h4 className="text-heading6 font-600 font-lexend text-grey-1 mb-6">Comentários</h4>
      <ul className="flex flex-col gap-11">
        <CommentCard />
        <CommentCard />
        <CommentCard />
      </ul>
    </div>
  );
};
