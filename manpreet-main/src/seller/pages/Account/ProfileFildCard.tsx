// import { Divider } from "@mui/material";

// interface ProfileFieldCardProps {
//   label: string;
//   value?: string | number;
// }

// const ProfileFildCard = ({ label, value }: ProfileFieldCardProps) => {
//   return (
//     <div className="p-5 flex items-center bg-slate-50">
//       <p className="w-20 lg:w-36 pr-5">{label}</p>

//       <Divider orientation="vertical" flexItem />

//       <p className="pl-4 lg:pl-10 font-semibold lg:text-lg">
//         {value ?? "N/A"}
//       </p>
//     </div>
//   );
// };

// export default ProfileFildCard;























// src/.../ProfileFildCard.tsx

import { Divider, Tooltip } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

interface ProfileFieldCardProps {
  label: string;
  value?: string | number;
  locked?: boolean;
}

const ProfileFildCard = ({ label, value, locked }: ProfileFieldCardProps) => {
  return (
    <div className="p-5 flex items-center bg-slate-50">
      <p className="w-20 lg:w-36 pr-5">{label}</p>

      <Divider orientation="vertical" flexItem />

      <p className="pl-4 lg:pl-10 font-semibold lg:text-lg flex-1">
        {value ?? "N/A"}
      </p>

      {locked && (
        <Tooltip title=" field locked  — selfysnap" arrow>
          <LockIcon fontSize="small" sx={{ color: "text.disabled" }} />
        </Tooltip>
      )}
    </div>
  );
};

export default ProfileFildCard;
