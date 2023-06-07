import { UserBadge } from "./userBadge";

export const CommentCard = () => {
  return (
    <li>
      <div className="flex items-center gap-2 mb-3">
        <UserBadge bg_color="bg-brand-1" initials_color="text-white" name_color="grey-1"/>
        <span className="text-grey-3 text-xs font-inter">•</span>
        <span className="text-grey-3 text-xs font-inter">há 3 dias</span>
      </div>
      <p className="font-inter text-sm overflow-hidden text-ellipsis text-grey-2 leading-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
        exercitationem eveniet. Cumque rerum et voluptates eaque commodi
        doloremque placeat, iusto dolor perferendis nam, reprehenderit
        voluptate! Aperiam eligendi officia commodi molestiae.
      </p>
    </li>
  );
};
