interface UserBadgeProps {
  bg_color: string;
  initials_color: string;
  name_color: string;
  name: string;
}
export const UserBadge = ({
  bg_color,
  initials_color,
  name_color,
  name,
}: UserBadgeProps) => {

  const nameSplit = name?.split(" ")

  const userInitials = name?.split(" ")[0][0] === name?.split(" ")[nameSplit.length-1][0] ? "" : name?.split(" ")[nameSplit.length-1][0]
  const userSecondName = name?.split(" ")[nameSplit.length-1] == name?.split(" ")[0] ? "": name?.split(" ")[nameSplit.length-1]

  return (
    <div className="flex gap-2 items-center font-inter font-500">
      <div
        className={`h-8 w-8 ${bg_color} ${initials_color}  text-sm rounded-full p-2 flex items-center justify-center capitalize`}
      >
        <span>{name?.split("")[0]}</span> 
        <span>{userInitials}</span>
      </div>
      <p className={`text-sm text-${name_color} capitalize`}>{name?.split(" ")[0]} {userSecondName}</p>
    </div>
  );
};
