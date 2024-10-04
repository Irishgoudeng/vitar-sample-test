"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Equipment } from "@/app/types/Equipment";
import AddEquipmentModal from "@/app/components/Equipment/AddEquipmentModal";
import { db } from "@/app/firebase/config"; // Ensure this is the correct path
import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods

const EquipmentPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [scopeFilter, setScopeFilter] = useState("all"); // New state for scope filter
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const router = useRouter();

  // Fetch equipment data from Firestore
  useEffect(() => {
    const fetchEquipments = async () => {
      const equipmentCollectionRef = collection(db, "equipment");
      const equipmentSnapshot = await getDocs(equipmentCollectionRef);
      const equipmentList: Equipment[] = equipmentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Equipment[];
      setEquipments(equipmentList);
    };

    fetchEquipments();
  }, []);

  const handleDelete = (equipmentId: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this equipment?"
    );
    if (confirmDelete) {
      setEquipments((prev) =>
        prev.filter((equipment) => equipment.equipmentID !== equipmentId)
      );
      console.log(`Equipment with ID ${equipmentId} deleted`);
      router.push(`/dashboard/equipment`);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  const handleScopeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setScopeFilter(e.target.value); // Update scope filter
  };

  const handleAddEquipment = (newEquipment: Equipment) => {
    setEquipments((prev) => [...prev, newEquipment]); // Add new equipment to the list
  };

  const filteredEquipments = equipments.filter((equipment) => {
    const matchesSearch =
      equipment.equipmentName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ?? false; // Use optional chaining and fallback
    const matchesFilter =
      (selectedFilter === "all" ||
        equipment.siteName
          ?.toLowerCase()
          .includes(selectedFilter.toLowerCase())) ??
      false; // Use optional chaining and fallback
    const matchesScopeFilter =
      scopeFilter === "all" || equipment.typeOfScope === scopeFilter; // Filter by type of scope

    return matchesSearch && matchesFilter && matchesScopeFilter;
  });

  return (
    <div className="p-8 lg:p-12 bg-white h-screen overflow-x-hidden">
      <h1 className="text-3xl font-semibold text-gray-900 mb-4 py-8 lg:mb-0">
        Equipments
      </h1>
      <div className="mb-6 flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <div className="flex gap-4 mb-4 lg:mb-0">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by equipment name..."
            className="px-4 py-2 border border-gray-300 rounded-lg text-black"
          />
          <select
            value={selectedFilter}
            onChange={handleFilter}
            className="px-4 py-2 border border-gray-300 rounded-lg text-black"
          >
            <option value="all">All Locations</option>
            <option value="Site A">Site A</option>
            <option value="Site B">Site B</option>
            <option value="Site C">Site C</option>
          </select>
          {/* Dropdown for Type of Scope filter */}
          <select
            value={scopeFilter}
            onChange={handleScopeFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-lg text-black"
          >
            <option value="all">All Types of Scope</option>
            <option value="Temperature">Temperature</option>
            <option value="Pressure">Pressure</option>
            <option value="Humidity">Humidity</option>
            {/* Add more types of scope as needed */}
          </select>
        </div>
        {/* <button
          onClick={handleAdd}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Add Equipment
        </button> */}
      </div>
      {/* Equipment List as Cards for smaller screens */}
      <div className="block lg:hidden text-black">
        {filteredEquipments.length > 0 ? (
          filteredEquipments.map((equipment) => (
            <div
              key={equipment.equipmentID}
              className="border rounded-lg p-4 mb-4 bg-white shadow"
            >
              <h2 className="text-xl font-semibold">
                {equipment.equipmentName}
              </h2>
              <p className="text-gray-600">
                Type of Scope: {equipment.typeOfScope}
              </p>
              <p className="text-gray-600">Model: {equipment.model}</p>
              <p className="text-gray-600">
                Serial Number: {equipment.serialNumber}
              </p>
              <div className="mt-2">
                <button
                  onClick={() => handleDelete(equipment.equipmentID)}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No equipment found</div>
        )}
      </div>
      {/* Table for larger screens */}
      <div className="hidden lg:block">
        {/* Container for fixed height and overflow scrolling */}
        <div className="overflow-y-auto" style={{ maxHeight: "700px" }}>
          <table className="w-full text-sm text-left text-gray-600 bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 sticky top-0 bg-gray-100 z-10"
                >
                  Equipment ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 sticky top-0 bg-gray-100 z-10"
                >
                  Equipment Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 sticky top-0 bg-gray-100 z-10"
                >
                  Type of Scope
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 sticky top-0 bg-gray-100 z-10"
                >
                  Tag ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 sticky top-0 bg-gray-100 z-10"
                >
                  Make
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 sticky top-0 bg-gray-100 z-10"
                >
                  Model
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 sticky top-0 bg-gray-100 z-10"
                >
                  Serial Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 sticky top-0 bg-gray-100 z-10"
                >
                  Range Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 sticky top-0 bg-gray-100 z-10"
                >
                  Range (Min)
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 sticky top-0 bg-gray-100 z-10"
                >
                  Range (Max)
                </th>
                <th
                  scope="col"
                  className="px-6 sticky top-0 py-3 bg-gray-100 z-10"
                >
                  Range Temp(Min)
                </th>
                <th
                  scope="col"
                  className="px-6 sticky top-0 py-3 bg-gray-100 z-10"
                >
                  Range Temp (Max)
                </th>
                <th
                  scope="col"
                  className="px-6 sticky top-0 py-3 bg-gray-100 z-10"
                >
                  Range Perc (Min)
                </th>
                <th
                  scope="col"
                  className="px-6 sticky top-0 py-3 bg-gray-100 z-10"
                >
                  Range Perc(Max)
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 sticky top-0 bg-gray-100 z-10"
                >
                  Certificate No.
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 sticky top-0 bg-gray-100 z-10"
                >
                  Traceability
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 sticky top-0 bg-gray-100 z-10"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipments.length > 0 ? (
                filteredEquipments.map((equipment) => (
                  <tr
                    key={equipment.equipmentID}
                    className="border-b border-gray-200"
                  >
                    <td className="px-6 py-4">{equipment.equipmentID}</td>
                    <td className="px-6 py-4">{equipment.equipmentName}</td>
                    <td className="px-6 py-4">{equipment.typeOfScope}</td>
                    <td className="px-6 py-4">{equipment.tagID}</td>
                    <td className="px-6 py-4">{equipment.make}</td>
                    <td className="px-6 py-4">{equipment.model}</td>
                    <td className="px-6 py-4">{equipment.serialNumber}</td>
                    <td className="px-6 py-4">{equipment.rangeType}</td>
                    <td className="px-6 py-4">{equipment.rangeMin}</td>
                    <td className="px-6 py-4">{equipment.rangeMax}</td>
                    <td className="px-6 py-4">{equipment.rangeMinTemp}</td>
                    <td className="px-6 py-4">{equipment.rangeMaxTemp}</td>
                    <td className="px-6 py-4">{equipment.rangeMinPercent}</td>
                    <td className="px-6 py-4">{equipment.rangeMinPercent}</td>
                    <td className="px-6 py-4">{equipment.certificateNo}</td>
                    <td className="px-6 py-4">{equipment.traceability}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(equipment.equipmentID)}
                        className="text-red-600 hover"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={13} className="text-center py-4 text-gray-500">
                    No equipment found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal for adding new equipment */}
      <AddEquipmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddEquipment={handleAddEquipment}
      />
    </div>
  );
};

export default EquipmentPage;
