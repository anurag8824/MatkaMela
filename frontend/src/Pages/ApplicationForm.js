import React, { useState } from "react";

export default function ApplicationForm() {
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);

  const backUrl = process.env.REACT_APP_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFiles((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();

    // Append all fields
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Append all files
    Object.entries(files).forEach(([key, file]) => {
      if (file) data.append(key, file);
    });

    console.log("Submitting data:", formData, files);

    try {
      const response = await fetch(`${backUrl}/api/submit-form`, {
        method: "POST",
        body: data,
      });

      console.log("Response:", response);

      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        alert("Failed to submit form.");
      }
    } catch (error) {
      alert("Error submitting form.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h2 className="text-center text-2xl font-semibold text-gray-700 mb-4">ऑनलाइन आवेदन विवरण भेजें</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TEXT FIELDS */}
        {[
          { label: "पद नाम", name: "designationName", placeholder: "Designation Name" },
          { label: "कार्यक्षेत्र", name: "workingArea", placeholder: "Working Area" },
          { label: "नाम", name: "fullName", placeholder: "Full Name" },
          { label: "माता का नाम", name: "motherName", placeholder: "Mother Name" },
          { label: "पिता का नाम", name: "fatherName", placeholder: "Father Name" },
          { label: "पिनकोड (स्थानीय)", name: "localPincode", placeholder: "Pincode" },
          { label: "पिनकोड (स्थायी)", name: "permanentPincode", placeholder: "Pincode" },
          { label: "जाति", name: "caste", placeholder: "Caste" },
          { label: "वैवाहिक स्थिति", name: "marriedStatus", placeholder: "Married Status" },
          { label: "मोबाइल नंबर", name: "mobileNo", placeholder: "Mobile No.", type: "number" },
          { label: "ईमेल", name: "emailId", placeholder: "Email", type: "email" },
          { label: "शैक्षणिक योग्यता", name: "academicQualification", placeholder: "Academic Qualification" },
          { label: "तकनीकी योग्यता", name: "technicalQualification", placeholder: "Technical Qualification" },
          { label: "अनुभव", name: "workingKnowledge", placeholder: "Working Knowledge" },
        ].map(({ label, name, placeholder, type = "text" }) => (
          <div key={name}>
            <label className="block font-medium mb-1">{label}</label>
            <input
              type={type}
              name={name}
              required
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* TEXTAREAS */}
        {[
          { label: "योग्यता", name: "yourHonor", placeholder: "Your Honor" },
          { label: "वर्तमान पता", name: "localAddress", placeholder: "Local Address" },
          { label: "स्थायी पता", name: "permanentAddress", placeholder: "Permanent Address" },
        ].map(({ label, name, placeholder }) => (
          <div key={name}>
            <label className="block font-medium mb-1">{label}</label>
            <textarea
              name={name}
              required
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* DATE FIELD */}
        <div>
          <label className="block font-medium mb-1">जन्म तिथि</label>
          <input
            type="date"
            name="dateOfBirth"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* SELECT FIELD */}
        <div>
          <label className="block font-medium mb-1">लिंग</label>
          <select
            name="selectGender"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">लिंग चुनें</option>
            <option value="Female">महिला</option>
            <option value="Male">पुरुष</option>
          </select>
        </div>

        {/* FILE UPLOADS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            ["profileImage", "Profile Image"],
            ["aadharFrontImage", "Aadhar Front Image"],
            ["aadharBackImage", "Aadhar Back Image"],
            ["panCardImage", "Pan Card Image (Optional)"],
            ["tenthMarksheetImage", "Tenth Marksheet"],
            ["twelthMarksheetImage", "Twelth Marksheet (Optional)"],
            ["graduateImage", "Graduate Image (Optional)"],
            ["postGraduateImage", "Post Graduate (Optional)"],
            ["bankCheque", "Bank Cheque (Optional)"],
            ["technicalCertification", "Technical Certificate (Optional)"],
            ["academicCertification", "Academic Certificate (Optional)"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                type="file"
                name={name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
          ))}
        </div>

        {/* DECLARATION */}
        <div className="mt-6">
          <label className="block font-semibold mb-2">
            शपथपत्र (घोषणा): मै एतद द्वारा घोषणा करता हूँ/करती हूँ कि मेरी जानकारी और विश्वास के अनुसार उपरोक्त दर्ज सूचनाएं सत्य, सही और पूर्ण हैं।
          </label>
        </div>

        {/* SUBMIT */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Now"}
          </button>
        </div>
      </form>
    </div>
  );
}
