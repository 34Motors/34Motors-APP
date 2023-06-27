import { commentReturn } from "@/interfaces/comment.interfaces";
import { UserBadge } from "./userBadge";

export const CommentCard = ({comment} : {comment: commentReturn}) => {
  return (
    <li>
      <div className="flex items-center gap-2 mb-3">
        <UserBadge
          bg_color="bg-brand-1"
          initials_color="text-white"
          name_color="grey-1"
          name={comment.user.name}
        />
        <span className="text-grey-3 text-xs font-inter">•</span>
        <span className="text-grey-3 text-xs font-inter">há 3 dias</span>
      </div>
      <p className="font-inter text-sm overflow-hidden text-ellipsis text-grey-2 leading-6">
        {comment.description}
      </p>
    </li>
  );
};
