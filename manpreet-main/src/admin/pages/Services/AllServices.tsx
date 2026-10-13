import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import {
  fetchAllServicesAdmin,
  toggleServiceActive,
} from "../../../Redux Toolkit/Admin/ServiceSlice";

const AllServices = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { service } = useAppSelector((s: any) => s);

  useEffect(() => {
    dispatch(fetchAllServicesAdmin() as any);
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🏪 All Services</h1>
        <button
          onClick={() => navigate("/admin/services/create")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold"
        >
          + Create Service
        </button>
      </div>

      {service.loading ? (
        <div className="text-center py-10"><CircularProgress /></div>
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
              <button
                onClick={() => dispatch(toggleServiceActive(s._id) as any)}
                className="w-full mt-3 py-1.5 bg-gray-100 rounded-lg text-xs font-bold"
              >
                {s.isActive ? "Deactivate" : "Activate"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllServices;