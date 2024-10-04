"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const initialJobs = [
  {
    id: "1",
    technician: "Tech A",
    customer: "John Doe",
    equipment: ["Thermocouple", "Heat Gun"],
    dateTime: "2023-09-23 10:00 AM",
    status: "Confirmed",
    type: "Site",
    priority: true,
  },
  {
    id: "2",
    technician: "Tech B",
    customer: "Jane Smith",
    equipment: ["Infrared Thermometer", "Thermal Camera"],
    dateTime: "2023-09-23 01:00 PM",
    status: "Pending",
    type: "Sub-Contract",
    priority: false,
  },
  {
    id: "3",
    technician: "Tech C",
    customer: "Emily Johnson",
    equipment: ["Heat Exchanger", "Thermal Insulation"],
    dateTime: "2023-09-24 09:30 AM",
    status: "Confirmed",
    type: "Lab",
    priority: true,
  },
  {
    id: "4",
    technician: "Tech D",
    customer: "Michael Brown",
    equipment: ["Boiler", "Heating Element"],
    dateTime: "2023-09-25 11:00 AM",
    status: "Confirmed",
    type: "Site",
    priority: false,
  },
];

const jobTypes = ["All", "Site", "Sub-Contract", "Lab"];

const JobsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [showPriority, setShowPriority] = useState(false);
  const [jobs, setJobs] = useState(initialJobs);
  const router = useRouter();

  useEffect(() => {
    setJobs(initialJobs); // Set jobs after the first render
  }, []);

  const handleEdit = (jobId: string) => {
    router.push(`/dashboard/jobs/${jobId}/edit`);
  };

  const handleAdd = () => {
    router.push(`/dashboard/jobs/add`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearchTerm = job.customer
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || job.type === selectedType;
    const matchesPriority = showPriority ? job.priority : true;

    return matchesSearchTerm && matchesType && matchesPriority;
  });

  return (
    <div className="p-4 md:p-6 lg:p-12 bg-white min-h-screen">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 py-4 ">
        Jobs
      </h1>

      {/* Search and Add Job Button */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by customer name..."
          className="px-4 py-2 border border-gray-300 rounded-lg text-black"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 w-full lg:w-auto bg-red-500 text-white rounded hover:bg-red-600"
        >
          Add Job
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-black mb-4 lg:mb-0"
        >
          {jobTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <label className="flex items-center ml-4 text-black">
          <input
            type="checkbox"
            checked={showPriority}
            onChange={() => setShowPriority((prev) => !prev)}
            className="mr-2"
          />
          Show Priority Jobs Only
        </label>
      </div>

      {/* Job List for small screens */}
      <div className="block lg:hidden">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="border rounded-lg p-4 mb-4 bg-white shadow-sm"
            >
              <h2 className="text-lg font-semibold">{job.customer}</h2>
              <p className="text-gray-600">Technician: {job.technician}</p>
              <p className="text-gray-600">
                Equipment: {job.equipment.join(", ")}
              </p>
              <p className="text-gray-600">Date & Time: {job.dateTime}</p>
              <p className="text-gray-600">Status: {job.status}</p>
              <p className="text-gray-600">Type: {job.type}</p>
              <p className="text-gray-600">
                Priority: {job.priority ? "Yes" : "No"}
              </p>
              <button
                onClick={() => handleEdit(job.id)}
                className="mt-2 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Edit
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No jobs found</div>
        )}
      </div>

      {/* Job Table for larger screens */}
      <div className="hidden lg:block overflow-x-auto h-screen">
        <table className="w-full text-sm text-left text-gray-600 bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">Job ID</th>
              <th className="px-6 py-3">Technician</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Equipment</th>
              <th className="px-6 py-3">Date & Time</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr key={job.id} className="border-b border-gray-200">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {job.id}
                  </td>
                  <td className="px-6 py-4">{job.technician}</td>
                  <td className="px-6 py-4">{job.customer}</td>
                  <td className="px-6 py-4">{job.equipment.join(", ")}</td>
                  <td className="px-6 py-4">{job.dateTime}</td>
                  <td className="px-6 py-4">{job.status}</td>
                  <td className="px-6 py-4">{job.type}</td>
                  <td className="px-6 py-4">{job.priority ? "High" : "Low"}</td>
                  <td className="px-6 py-4 relative">
                    <button
                      className="text-gray-500 hover:underline"
                      onClick={(e) => {
                        const dropdown = e.currentTarget.nextElementSibling;
                        if (dropdown) {
                          dropdown.classList.toggle("hidden");
                        }
                      }}
                    >
                      &#x2022;&#x2022;&#x2022; {/* Three dots */}
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg hidden z-10">
                      <button
                        onClick={() => handleEdit(job.id)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/dashboard/jobs/${job.id}/view`)
                        }
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => router.push(`/dashboard/jobs`)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Cancel Job
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                  No jobs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsPage;
