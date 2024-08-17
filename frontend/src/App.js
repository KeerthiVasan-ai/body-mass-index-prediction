  import { useState } from "react";
  import axios from "axios";
  import Swal from "sweetalert2"

  function App() {
    const [filename, setFilename] = useState("No file uploaded");
    const [file, setFile] = useState(null);

    const handleSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append("file", file);

      if(file == null){
          Swal.fire({
            icon: "error",
            title: "File Not Found",
            text: "Upload the Image to get started",
      });
        return;
      }
      Swal.showLoading();
      try {
        axios.post("/predict", formData).then((res) => {

          let htmlContent = `
            <div>
              <h2>Your BMI Details</h2>
              <p><strong>Height:</strong> ${res.data.height} m</p>
              <p><strong>Weight:</strong> ${res.data.weight} kg</p>
              <p><strong>BMI:</strong> ${res.data.bmi}</p>
            </div>
          `;

          Swal.hideLoading();
          Swal.fire({
            title: 'BMI Predictor',
            html: htmlContent,
            icon: 'info',
            confirmButtonText: 'Close',
            customClass: {
              container: 'sweet-container',
              popup: 'sweet-popup',
              confirmButton: 'sweet-confirm-button'
            }
          });
        });
      } catch (error) {
        Swal.hideLoading();
        console.error(error);
      }
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      setFilename(file.name);
      console.log(file)
      setFile(file);
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-3xl font-extrabold text-center my-8">
          Body Mass Index Prediction using Machine Learning
        </h1>
        <p className="text-lg font-normal text-center mb-4">
          Upload an image file to detect.
        </p>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="flex items-center justify-center rounded-lg shadow-lg px-6 py-4 mb-5">
            <label className="w-64 flex flex-col items-center px-4 py-6 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer bg-blue-500 hover:text-white">
              <svg
                className="w-8 h-8 mb-2"
                fill="blue"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">Select a file</span>
              <input
                type="file"
                name="file"
                className="hidden"
                onChange={(e) => handleFileUpload(e)}
              />
            </label>
          </div>
          <p className="text-white text-center mb-4">File Uploaded: {filename}</p>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5"
              type="submit">
              PREDICT
            </button>
          </div>
        </form>
      </div>
    );
  }

export default App;