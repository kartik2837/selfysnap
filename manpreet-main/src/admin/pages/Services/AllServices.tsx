// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { CircularProgress } from "@mui/material";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import {
//   fetchAllServicesAdmin,
//   toggleServiceActive,
// } from "../../../Redux Toolkit/Admin/ServiceSlice";

// const AllServices = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { service } = useAppSelector((s: any) => s);

//   useEffect(() => {
//     dispatch(fetchAllServicesAdmin() as any);
//   }, [dispatch]);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">🏪 All Services</h1>
//         <button
//           onClick={() => navigate("/admin/services/create")}
//           className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold"
//         >
//           + Create Service
//         </button>
//       </div>

//       {service.loading ? (
//         <div className="text-center py-10"><CircularProgress /></div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {service.services?.map((s: any) => (
//             <div
//               key={s._id}
//               className={`bg-white rounded-2xl shadow-md p-5 ${
//                 !s.isActive ? "opacity-60" : ""
//               }`}
//             >
//               <h3 className="font-bold text-lg">
//                 {s.icon} {s.name}
//               </h3>
//               <p className="text-xs text-gray-500 mt-1">{s.description}</p>
//               <div className="flex justify-between items-center mt-3">
//                 <span className="font-bold text-indigo-600">₹{s.price}</span>
//                 <span className="text-xs text-gray-500">
//                   {s.category} · {s.deliveryDays}d
//                 </span>
//               </div>
//               <button
//                 onClick={() => dispatch(toggleServiceActive(s._id) as any)}
//                 className="w-full mt-3 py-1.5 bg-gray-100 rounded-lg text-xs font-bold"
//               >
//                 {s.isActive ? "Deactivate" : "Activate"}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllServices;























import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import {
  fetchAllServicesAdmin,
  toggleServiceActive,
  deleteService,
} from "../../../Redux Toolkit/Admin/ServiceSlice";

const AllServices = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { service } = useAppSelector((s: any) => s);

  useEffect(() => {
    dispatch(fetchAllServicesAdmin() as any);
  }, [dispatch]);

  const handleDelete = (id: string, name: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${name}"? This action cannot be undone.`
    );
    if (confirmDelete) {
      dispatch(deleteService(id) as any);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/services/edit/${id}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold"> All Services</h1>
        <button
          onClick={() => navigate("/admin/services/create")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold"
        >
          + Create Service
        </button>
      </div>

      {service.loading ? (
        <div className="text-center py-10">
          <CircularProgress />
        </div>
      ) : service.services?.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No services found. Create your first service!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {service.services?.map((s: any) => (
            <div
              key={s._id}
              className={`bg-white rounded-2xl shadow-md p-5 ${
                !s.isActive ? "opacity-60" : ""
              }`}
            >
              <h3 className="font-bold text-lg">
                {s.icon} {s.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{s.description}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="font-bold text-indigo-600">₹{s.price}</span>
                <span className="text-xs text-gray-500">
                  {s.category} · {s.deliveryDays}d
                </span>
              </div>

              {/* Toggle Active */}
              <button
                onClick={() => dispatch(toggleServiceActive(s._id) as any)}
                className="w-full mt-3 py-1.5 bg-gray-100 rounded-lg text-xs font-bold"
              >
                {s.isActive ? "Deactivate" : "Activate"}
              </button>

              {/* Edit + Delete */}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(s._id)}
                  className="flex-1 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition"
                >
                   Edit
                </button>
                <button
                  onClick={() => handleDelete(s._id, s.name)}
                  className="flex-1 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition"
                >
                   Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllServices;
