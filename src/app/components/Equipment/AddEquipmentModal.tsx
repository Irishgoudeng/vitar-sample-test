/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState } from "react";
import InputField from "@/app/components/common/InputField";
import SelectField from "@/app/components/common/SelectField";
import Button from "@/app/components/common/Button";
import { db } from "@/app/firebase/config"; // Ensure this import is correct
import { setDoc, doc } from "firebase/firestore"; // Import Firestore methods
import Swal from "sweetalert2"; // Optional for success/error alerts

interface AddEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEquipment: (equipment: any) => void; // Update type as needed
}

// Define a type for the range options keys
type RangeType = "typeA" | "typeB" | "typeC"; // Extend this as needed

const rangeOptions: Record<RangeType, { min: number; max: number }> = {
  typeA: { min: 0, max: 100 },
  typeB: { min: 50, max: 200 },
  typeC: { min: 100, max: 300 },
};

const scopeOptions = [
  { value: "Temperature & Humidity", label: "Temperature & Humidity" },
  { value: "Electrical", label: "Electrical" },
  { value: "Dimensional", label: "Dimensional" },
  { value: "Mechanical", label: "Mechanical" },
  { value: "Pressure", label: "Pressure" },
  { value: "Volume", label: "Volume" },
  { value: "Flow", label: "Flow" },
];

const AddEquipmentModal: React.FC<AddEquipmentModalProps> = ({
  isOpen,
  onClose,
  onAddEquipment,
}) => {
  const [activeTab, setActiveTab] = useState(0); // State to track active tab
  const [equipmentID, setEquipmentID] = useState("");
  const [equipmentName, setEquipmentName] = useState("");
  const [typeOfScope, setTypeOfScope] = useState("");
  const [description, setDescription] = useState("");
  const [tagID, setTagID] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [type, setType] = useState("");
  const [rangeType, setRangeType] = useState<RangeType | "">("");
  const [rangeMin, setRangeMin] = useState("");
  const [rangeMax, setRangeMax] = useState("");
  const [traceability, setTraceability] = useState("");

  const handleRangeTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value as RangeType;
    setRangeType(selectedType);

    // Autofill min and max based on selected range type
    if (rangeOptions[selectedType]) {
      setRangeMin(rangeOptions[selectedType].min.toString());
      setRangeMax(rangeOptions[selectedType].max.toString());
    } else {
      setRangeMin("");
      setRangeMax("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construct the new equipment object
    const newEquipment = {
      equipmentID,
      equipmentName,
      typeOfScope,
      description,
      tagID,
      make,
      model,
      serialNumber,
      type,
      rangeType,
      rangeMin,
      rangeMax,
      traceability,
    };

    try {
      // Add the new equipment to the Firestore collection with equipmentID as the document ID
      const equipmentDocRef = doc(db, "equipment", equipmentID);
      await setDoc(equipmentDocRef, newEquipment);
      console.log("New equipment added successfully:", newEquipment);

      // Display a success alert using SweetAlert2 (optional)
      await Swal.fire({
        title: "Success!",
        text: "New equipment added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Call the onAddEquipment callback
      onAddEquipment(newEquipment);

      // Close the modal after submission
      onClose();
    } catch (error) {
      console.error("Error adding equipment to Firestore:", error);

      // Display an error alert using SweetAlert2 (optional)
      await Swal.fire({
        title: "Error!",
        text: "There was an error adding the equipment. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <>
            <InputField
              id="equipment_id"
              label="Equipment ID"
              placeholder="Enter Equipment ID"
              value={equipmentID}
              onChange={(e) => setEquipmentID(e.target.value)}
            />
            <InputField
              id="equipment_name"
              label="Equipment Name"
              placeholder="Enter Equipment Name"
              value={equipmentName}
              onChange={(e) => setEquipmentName(e.target.value)}
            />
            <SelectField
              id="type_of_scope"
              label="Type of Scope"
              value={typeOfScope}
              onChange={(e) => setTypeOfScope(e.target.value)}
              options={scopeOptions}
            />
            <InputField
              id="description"
              label="Description"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </>
        );
      case 1:
        return (
          <>
            <InputField
              id="tag_id"
              label="Tag ID"
              placeholder="Enter Tag ID"
              value={tagID}
              onChange={(e) => setTagID(e.target.value)}
            />
            <InputField
              id="make"
              label="Make"
              placeholder="Enter Make"
              value={make}
              onChange={(e) => setMake(e.target.value)}
            />
            <InputField
              id="model"
              label="Model"
              placeholder="Enter Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
            <InputField
              id="serial_number"
              label="Serial Number"
              placeholder="Enter Serial Number"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
            />
            <InputField
              id="type"
              label="Type"
              placeholder="Enter Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <div className="col-span-2">
              <label
                htmlFor="range_type"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Range Type
              </label>
              <select
                id="range_type"
                value={rangeType}
                onChange={handleRangeTypeChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
              >
                <option value="">Select Range Type</option>
                {Object.keys(rangeOptions).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <InputField
              id="range_min"
              label="Range (Min)"
              placeholder="Min Range"
              value={rangeMin}
              onChange={(e) => setRangeMin(e.target.value)}
            />
            <InputField
              id="range_max"
              label="Range (Max)"
              placeholder="Max Range"
              value={rangeMax}
              onChange={(e) => setRangeMax(e.target.value)}
            />
          </>
        );
      case 2:
        return (
          <>
            <InputField
              id="certificate_no"
              label="Certificate No."
              placeholder="Enter Certificate No."
              value={traceability}
              onChange={(e) => setTraceability(e.target.value)}
            />
            <InputField
              id="traceability"
              label="Traceability"
              placeholder="Enter Traceability"
              value={traceability}
              onChange={(e) => setTraceability(e.target.value)}
            />
          </>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg xl:max-w-5xl relative transform transition-transform duration-300 ease-in-out">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600 focus:outline-none transition duration-200"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Add Equipment
        </h2>
        <div className="mb-4">
          <button
            className={`mr-2 px-4 py-2 rounded ${
              activeTab === 0 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveTab(0)}
          >
            Tab 1
          </button>
          <button
            className={`mr-2 px-4 py-2 rounded ${
              activeTab === 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveTab(1)}
          >
            Tab 2
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 2 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveTab(2)}
          >
            Tab 3
          </button>
        </div>
        <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
          {renderTabContent()}
          <div className="flex items-end justify-end col-span-2">
            <Button label="Submit" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEquipmentModal;
