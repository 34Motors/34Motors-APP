import { commentReturn } from "@/interfaces/comment.interfaces";
import { UserBadge } from "./userBadge";
import { BsFillPencilFill } from "react-icons/bs";
import { useCallback, useState } from "react";
import { EditDeleteCommentForm } from "./editDeleteCommentForm";
import { useAuth } from "@/contexts/authContext";
import { API } from "@/services/apis";
import { useCarsContext } from "@/contexts/carsContext";

const diffDates = (start: number, end: number): string => {
  const days = Math.ceil((end - start) / 86400000);

  if (days <= 1) {
    return "Hoje";
  }

  if (days < 30) {
    const sufix = days === 1 ? "" : "s";
    return `Há ${days} dia${sufix}`;
  }

  const months = Math.floor(days / 30);
  const monthSufix = months === 1 ? "mês" : "meses";

  return `Há ${months} ${monthSufix}`;
};

export const CommentCard = ({ commentData }: { commentData: commentReturn }) => {
  const commentDate = new Date(commentData.postDate);
  const dateDiff = diffDates(commentDate.getTime(), Date.now());

  const [isClicked, setIsClicked] = useState(false);
  const { user } = useAuth();
  const { reloadComments } = useCarsContext();
  const hasPermision = user.id === commentData.user.id ? true : false;

  

  const deleteComment = async () => {
    await API.delete(`/comments/${commentData.id}`);
    reloadComments(commentData.carId);
    setIsClicked(false);
  };

  return (
    <li className="relative max-w-2xl">
      <div className="flex items-center gap-2 mb-3">
        <UserBadge
          bg_color={commentData.user?.userColor}
          initials_color="text-white"
          name_color="grey-1"
          name={commentData.user?.name}
        />
        <span className="text-grey-3 text-xs font-inter">•</span>
        <span className="text-grey-3 text-xs font-inter">{dateDiff}</span>
      </div>
      {isClicked ? (
        <EditDeleteCommentForm
          deleteComment={deleteComment}
          setIsClicked={() => setIsClicked(false)}
        />
      ) : (
        <p className="font-inter text-sm overflow-hidden text-ellipsis text-grey-2 leading-6">
          {commentData.description}
        </p>
      )}
      <div
        className="absolute top-[2px] right-4 flex gap-2 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-grey-3"
        onClick={() => setIsClicked(true)}
      >
        {hasPermision && <BsFillPencilFill className="text-grey-3 h-3" />}
      </div>
    </li>
  );
};
