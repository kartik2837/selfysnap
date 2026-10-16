import { useState, useEffect, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import {
  updateService,
  fetchAllServicesAdmin,
} from "../../../Redux Toolkit/Admin/ServiceSlice";

const CATEGORIES = [
  { value: "listing", label: "📝 Listing" },
  { value: "video", label: "🎬 Video" },
  { value: "account", label: "📊 Account" },
  { value: "design", label: "🖼️ Design" },
  { value: "banner", label: "🎨 Banner" },
  { value: "other", label: "✨ Other" },
];

const ICONS = ["📝", "🎬", "📊", "🖼️", "🎨", "📦", "🚀", "✨"];

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const EditService = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { service } = useAppSelector((s: any) => s);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "listing",
    icon: "📝",
    price: "",
    description: "",
    deliveryDays: "3",
  });
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [loaded, setLoaded] = useState(false);

  // अगर सर्विस लिस्ट में नहीं है (डायरेक्ट URL खोला), तो पहले फेच करें
  useEffect(() => {
    if (service.services.length === 0) {
      dispatch(fetchAllServicesAdmin() as any);
    }
  }, [dispatch, service.services.length]);

  // डेटा मिलने पर फॉर्म प्री-फिल करें
  useEffect(() => {
    if (loaded) return;
    const existing = service.services.find((s: any) => s._id === id);
    if (existing) {
      setForm({
        name: existing.name || "",
        slug: existing.slug || "",
        category: existing.category || "listing",
        icon: existing.icon || "📝",
        price: String(existing.price ?? ""),
        description: existing.description || "",
        deliveryDays: String(existing.deliveryDays ?? "3"),
      });
      setFeatures(existing.features || []);
      setLoaded(true);
    }
  }, [service.services, id, loaded]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;
    if (!form.name.trim()) return alert("Enter name");
    if (!form.price) return alert("Enter price");

    const res = await dispatch(
      updateService({
        id,
        payload: {
          name: form.name.trim(),
          slug: form.slug.trim() || slugify(form.name),
          category: form.category,
          icon: form.icon,
          price: Number(form.price),
          description: form.description.trim(),
          deliveryDays: Number(form.deliveryDays) || 3,
          features,
        },
      }) as any
    );

    if (updateService.fulfilled.match(res)) {
      alert("✅ Service updated!");
      setTimeout(() => navigate("/admin/services"), 1200);
    } else {
      alert("❌ " + res.payload);
    }
  };

  if (!loaded) {
    return (
      <div className="text-center py-20">
        <CircularProgress />
        <p className="mt-3 text-gray-500">Loading service…</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 mb-6 text-white">
        <h1 className="text-2xl font-bold"> Edit Service</h1>
        
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 space-y-4">
        <TextField
          fullWidth
          label="Service Name *"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
              slug: slugify(e.target.value),
            })
          }
        />

        <TextField
          fullWidth
          label="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />

        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            label="Category"
          >
            {CATEGORIES.map((c) => (
              <MenuItem key={c.value} value={c.value}>
                {c.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div>
          <label className="block font-semibold mb-2 text-sm">Icon</label>
          <div className="flex gap-2 flex-wrap">
            {ICONS.map((i) => (
              <button
                type="button"
                key={i}
                onClick={() => setForm({ ...form, icon: i })}
                className={`px-3 py-2 rounded-lg text-xl border-2 ${
                  form.icon === i ? "border-indigo-500 bg-indigo-50" : "border-gray-200"
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextField
            fullWidth
            type="number"
            label="Price (₹) *"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <TextField
            fullWidth
            type="number"
            label="Delivery Days"
            value={form.deliveryDays}
            onChange={(e) => setForm({ ...form, deliveryDays: e.target.value })}
          />
        </div>

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div>
          <label className="block font-semibold text-sm mb-2">Features</label>
          <div className="flex gap-2">
            <TextField
              fullWidth
              size="small"
              placeholder="e.g., 5 images white bg"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (featureInput.trim()) {
                    setFeatures([...features, featureInput.trim()]);
                    setFeatureInput("");
                  }
                }
              }}
            />
            <Button
              onClick={() => {
                if (featureInput.trim()) {
                  setFeatures([...features, featureInput.trim()]);
                  setFeatureInput("");
                }
              }}
              variant="outlined"
            >
              Add
            </Button>
          </div>
          {features.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-2">
              {features.map((f, i) => (
                <span
                  key={i}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs cursor-pointer"
                  onClick={() => setFeatures(features.filter((_, x) => x !== i))}
                >
                  {f} ✕
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={() => navigate("/admin/services")}
            sx={{ py: 2 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={service.loading}
            sx={{ py: 2, background: "linear-gradient(to right, #2563eb, #6366f1)" }}
          >
            {service.loading ? <CircularProgress size={20} /> : "Update Service"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditService;
