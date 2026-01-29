import axios from "axios";
import { useState } from "react";

export default function TransactionsUpload() {
  const [file, setFile] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const baseURL = import.meta.env.VITE_BACKEND_API_BASEURL;
  const accessTokenName = import.meta.env.VITE_ACCESS_TOKEN_NAME;

  const handleUpload = async () => {
    if (!file) {
      setErrorMsg("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    try {
      const token = localStorage.getItem(accessTokenName);
      await axios.post(baseURL + "transactions/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMsg("CVS uploaded successfully");
    } catch (error) {
      setErrorMsg("Upload failed !");
    }
  };
  return (
    <>
      <div className="p-4 text-center bg-light-dark rounded">
        <label htmlFor="formFile" className="form-label fs-5">
          Upload Transaction File (CSV)
        </label>
        <div>
          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="alert alert-success" role="alert">
              {successMsg}
            </div>
          )}
        </div>
        <div className="d-flex align-items-center gap-2">
          <input
            className="form-control"
            type="file"
            accept=".csv"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
}
