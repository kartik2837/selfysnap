import { useRef } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const BecomeSellerFormStep5 = ({ formik }: any) => {
  const gstRef = useRef<HTMLInputElement>(null);
  const panRef = useRef<HTMLInputElement>(null);
  const bankRef = useRef<HTMLInputElement>(null);

  const handleFile = (field: string, file: File | null) => {
    formik.setFieldValue(`documents.${field}`, file);
    formik.setFieldTouched(`documents.${field}`, true);
  };

  const FileBox = ({
    label,
    field,
    file,
    inputRef,
  }: {
    label: string;
    field: string;
    file: File | null;
    inputRef: any;
  }) => {
    const error =
      formik.touched?.documents?.[field] && formik.errors?.documents?.[field];

    return (
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-800">{label}</label>
        <div
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            error
              ? "border-red-400 bg-red-50"
              : file
              ? "border-green-400 bg-green-50"
              : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => handleFile(field, e.target.files?.[0] || null)}
          />

          {file ? (
            <div className="flex flex-col items-center gap-1">
              <CheckCircleIcon sx={{ fontSize: 40, color: "#16a34a" }} />
              <p className="text-sm font-semibold text-green-700 truncate max-w-full">
                {file.name}
              </p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
              <p className="text-xs text-indigo-600 font-medium mt-1">
                Click to change
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <CloudUploadIcon sx={{ fontSize: 40, color: "#6366f1" }} />
              <p className="text-sm font-semibold text-gray-700">
                Click to upload
              </p>
              <p className="text-xs text-gray-500">
                JPG, PNG, PDF (max 5MB)
              </p>
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-red-600 font-medium">{error}</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <FileBox
        label="1. GST Certificate *"
        field="gstCertificate"
        file={formik.values.documents.gstCertificate}
        inputRef={gstRef}
      />

      <FileBox
        label="2. PAN Card *"
        field="panCard"
        file={formik.values.documents.panCard}
        inputRef={panRef}
      />

      <div className="border-t pt-5">
        <FormControl fullWidth>
          <FormLabel
            sx={{ fontSize: "14px", fontWeight: "600", color: "#1f2937", mb: 1 }}
          >
            3. Bank Verification Document *
          </FormLabel>
          <RadioGroup
            name="documents.bankProofType"
            value={formik.values.documents.bankProofType}
            onChange={formik.handleChange}
            sx={{ flexDirection: "row", gap: 3 }}
          >
            <FormControlLabel
              value="cancelled_cheque"
              control={<Radio size="small" />}
              label={<span className="text-sm">Cancelled Cheque</span>}
            />
            <FormControlLabel
              value="passbook_savings"
              control={<Radio size="small" />}
              label={<span className="text-sm">Passbook (Savings)</span>}
            />
            <FormControlLabel
              value="passbook_current"
              control={<Radio size="small" />}
              label={<span className="text-sm">Passbook (Current)</span>}
            />
          </RadioGroup>
        </FormControl>
      </div>

      <FileBox
        label="Upload Bank Document *"
        field="bankProof"
        file={formik.values.documents.bankProof}
        inputRef={bankRef}
      />

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-800 space-y-1">
        <p className="font-semibold"> Important:</p>
        <p>• All documents must be clear and readable</p>
        <p>• Max 5MB per file • Formats: JPG, PNG, PDF</p>
        <p>• Verification takes 24-48 hours</p>
      </div>
    </div>
  );
};

export default BecomeSellerFormStep5;