import { commentReturn } from "@/interfaces/comment.interfaces";
import { UserBadge } from "./userBadge";

const diffDates = (start: number, end: number): string => {
  const days = Math.ceil((end - start) / 86400000);

  if(days <= 1) {
    return "Hoje"
  }

  if(days < 30) {
    const sufix = days === 1 ? "" : "s"
    return `Há ${days} dia${sufix}`
  }

  const months = Math.floor(days / 30)
  const monthSufix = months === 1 ? "mês" : "meses"

  return `Há ${months} ${monthSufix}`
  
};

export const CommentCard = ({ comment }: { comment: commentReturn }) => {
  const commentDate = new Date(comment.postDate);
  const dateDiff = diffDates(commentDate.getTime(), Date.now());
  
  return (
    <li>
      <div className="flex items-center gap-2 mb-3">
        <UserBadge
          bg_color="bg-brand-1"
          initials_color="text-white"
          name_color="grey-1"
          name={comment.user?.name}
        />
        <span className="text-grey-3 text-xs font-inter">•</span>
        <span className="text-grey-3 text-xs font-inter">{dateDiff}</span>
      </div>
      <p className="font-inter text-sm overflow-hidden text-ellipsis text-grey-2 leading-6">
        {comment.description}
      </p>
    </li>
  );
};
