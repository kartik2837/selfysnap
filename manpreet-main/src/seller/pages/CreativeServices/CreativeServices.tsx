import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { fetchActiveServices } from "../../../Redux Toolkit/Admin/ServiceSlice";

const CATEGORIES = ["all", "listing", "video", "account", "design", "banner"];

const CreativeServices = () => {
  const dispatch = useAppDispatch();
  const { service } = useAppSelector((s: any) => s);
  const [cat, setCat] = useState("all");

  useEffect(() => {
    dispatch(fetchActiveServices(cat === "all" ? undefined : cat) as any);
  }, [cat, dispatch]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🎨 Creative Studio</h1>
        <Link
          to="/seller/creative-services/my-requests"
          className="px-4 py-2 bg-gray-200 rounded-lg font-bold"
        >
          📋 My Requests
        </Link>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold ${
              cat === c ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      {service.loading ? (
        <div className="text-center py-10"><CircularProgress /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {service.services?.map((s: any) => (
            <div key={s._id} className="bg-white rounded-2xl shadow-md p-6">
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-lg">{s.name}</h3>
              <p className="text-xs text-gray-500 mt-2 h-10">{s.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-2xl font-bold text-indigo-600">
                  ₹{s.price}
                </span>
                <span className="text-xs text-gray-500">
                  {s.deliveryDays} days
                </span>
              </div>
              <Link
                to={`/seller/creative-services/request/${s.slug}`}
                className="block text-center mt-4 py-2 bg-indigo-600 text-white rounded-lg font-bold"
              >
                Request This Service
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreativeServices;