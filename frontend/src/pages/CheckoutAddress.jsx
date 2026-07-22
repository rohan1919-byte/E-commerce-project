import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { MapPin, Save } from "lucide-react";

export default function CheckoutAddress() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const labels = {
    fullname: "Full Name",
    phone: "Phone Number",
    addressLine: "Address",
    city: "City",
    state: "State",
    pincode: "Pincode",
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    let newErrors = {};

    if (form.fullname.trim().length < 3) {
      newErrors.fullname = "Enter a valid name.";
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (form.addressLine.trim().length < 10) {
      newErrors.addressLine = "Enter complete address.";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!form.state.trim()) {
      newErrors.state = "State is required.";
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const saveAddress = async () => {
    if (!validate()) return;

    await api.post("/address/add", {
      ...form,
      userId,
    });

    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-xl border border-slate-200 bg-white shadow-lg p-8">

        <div className="flex items-center gap-3 mb-8">
          <MapPin className="text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-800">
            Delivery Address
          </h1>
        </div>

        <div className="space-y-5">
          {Object.keys(form).map((key) => (
            <div key={key}>
              <label className="block mb-1 text-sm font-medium text-slate-700">
                {labels[key]}
              </label>

              <input
                name={key}
                value={form[key]}
                onChange={handleChange}
                placeholder={`Enter ${labels[key].toLowerCase()}`}
                className={`w-full rounded-md border px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500 ${
                  errors[key]
                    ? "border-red-500"
                    : "border-slate-300"
                }`}
              />

              {errors[key] && (
                <p className="mt-1 text-xs text-red-600">
                  {errors[key]}
                </p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={saveAddress}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <Save size={18} />
          Save Address
        </button>
      </div>
    </div>
  );
}