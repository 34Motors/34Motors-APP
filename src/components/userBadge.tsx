interface UserBadgeProps {
  bg_color: string;
  initials_color: string;
  name_color: string;
}

export const UserBadge = ({ bg_color, initials_color, name_color }: UserBadgeProps) => {
  return (
    <div className="flex gap-2 items-center font-inter font-500">
      <div
        className={`h-8 w-8 ${bg_color} ${initials_color} text-sm rounded-full p-2 flex items-center`}
      >
        SL
      </div>
      <p className={`text-sm text-${name_color}`}>Samuel Leão</p>
    </div>
  );
};
