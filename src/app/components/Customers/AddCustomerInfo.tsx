"use client";

import { useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";

interface AddCustomerInfoProps {
  onNext: () => void; // Callback when moving to the next step
}

const AddCustomerInfo: React.FC<AddCustomerInfoProps> = ({ onNext }) => {
  const [customerID, setCustomerID] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [tinNo, setTinNo] = useState("");
  const [brnNo, setBrnNo] = useState("");
  const [industry, setIndustry] = useState("");
  const [status, setStatus] = useState("active");

  const [contactFirstName, setContactFirstName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you might want to do some validation before calling onNext
    onNext(); // Call onNext to go to the next step
  };

  return (
    <div className="container mx-auto p-6">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="customer_id"
            label="Customer ID"
            placeholder="Enter Customer ID"
            value={customerID}
            onChange={(e) => setCustomerID(e.target.value)}
          />
          <InputField
            id="customer_name"
            label="Customer Name"
            placeholder="Enter Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <InputField
            id="tin_no"
            label="TIN No."
            placeholder="Enter TIN Number"
            value={tinNo}
            onChange={(e) => setTinNo(e.target.value)}
          />
          <InputField
            id="brn_no"
            label="BRN No."
            placeholder="Enter BRN Number"
            value={brnNo}
            onChange={(e) => setBrnNo(e.target.value)}
          />
          <InputField
            id="industry"
            label="Industry"
            placeholder="Enter Industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
          <div className="space-y-2">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="contact_first_name"
            label="Contact First Name"
            placeholder="Enter Contact First Name"
            value={contactFirstName}
            onChange={(e) => setContactFirstName(e.target.value)}
          />
          <InputField
            id="contact_last_name"
            label="Contact Last Name"
            placeholder="Enter Contact Last Name"
            value={contactLastName}
            onChange={(e) => setContactLastName(e.target.value)}
          />
          <InputField
            id="contact_phone"
            label="Contact Phone"
            placeholder="Enter Contact Phone Number"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
          />
          <InputField
            id="contact_email"
            label="Contact Email"
            placeholder="Enter Contact Email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>

        <Button label="Next" type="submit" />
      </form>
    </div>
  );
};

export default AddCustomerInfo;
