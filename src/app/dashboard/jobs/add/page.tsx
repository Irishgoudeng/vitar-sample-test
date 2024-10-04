"use client";

import { useState } from "react";
import Button from "../../../components/common/Button";
import InputField from "@/app/components/common/InputField";
import DisabledField from "@/app/components/common/DisabledField";

const AddJobPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("summary");

  // State management for input fields
  const [customerName, setCustomerName] = useState("");
  const [contactName, setContactName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const equipmentOptions = [
    { id: "1", name: "Thermometer" },
    { id: "2", name: "Heat Gun" },
    { id: "3", name: "Thermal Camera" },
    { id: "4", name: "Temperature Sensor" },
  ];

  return (
    <div className="p-4 xl:p-12 bg-white min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">Add Job</h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-8 border-b">
        {["summary", "location", "scheduling"].map((tab) => (
          <span
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer px-4 py-2 border-b-2 ${
              activeTab === tab
                ? "border-red-600 text-red-600 font-semibold"
                : "border-transparent text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </span>
        ))}
      </div>

      <form className="space-y-6 text-black bg-gray-200 p-8 m-4">
        {activeTab === "summary" && (
          <div>
            <h2 className="text-2xl font-bold mb-4 xl:mb-6">Job Summary</h2>

            {/* Search Customer Name Input */}
            <InputField
              id="customer_name"
              label="Search Customer Name"
              placeholder="ex. 1001-250"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <hr className="my-4" />
            <h2 className="text-xl font-bold xl:mt-8 xl:mb-4">
              Primary Contact
            </h2>
            <p className="mb-4 text-xs xl:text-sm">
              Details about the customer
            </p>

            {/* Contact Details Inputs */}
            <InputField
              id="contact_name"
              label="Contact Name"
              placeholder="Contact Name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />

            <div className="grid grid-cols-3 gap-4 xl:gap-6 mb-6">
              <InputField
                id="first_name"
                label="First Name"
                placeholder="ex. Contact Details"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <InputField
                id="middle_name"
                label="Middle Name"
                placeholder="ex. Contact Details"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
              <InputField
                id="last_name"
                label="Last Name"
                placeholder="ex. Contact Details"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 xl:gap-6 mb-6">
              <InputField
                id="phone_number"
                label="Phone Number"
                placeholder="ex. Contact Details"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <InputField
                id="mobile_phone"
                label="Mobile Phone"
                placeholder="ex. Contact Details"
                value={mobilePhone}
                onChange={(e) => setMobilePhone(e.target.value)}
              />
              <InputField
                id="email_address"
                label="Email Address"
                placeholder="ex. Contact Details"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>

            <hr className="my-6" />
            <div className="mb-6">
              <label
                htmlFor="equipment"
                className="block mb-2 text-sm font-bold text-gray-900"
              >
                Select Equipment
              </label>
              <select
                id="equipment"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                multiple
                required
              >
                {equipmentOptions.map((equipment) => (
                  <option key={equipment.id} value={equipment.id}>
                    {equipment.name}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Hold down Ctrl (Windows) or Command (Mac) to select multiple
                options.
              </p>
            </div>
          </div>
        )}

        {activeTab === "location" && (
          <div>
            <h2 className="text-2xl font-bold mt-8 mb-4">Job Location</h2>
            <p className="mb-4">Details about Job Location</p>

            <InputField
              id="location_id"
              label="Location ID"
              placeholder=""
              value=""
              onChange={() => {}}
            />

            <div className="grid grid-cols-3 gap-4 xl:gap-6 mb-6">
              <DisabledField
                id="location_name"
                label="Location Name"
                placeholder="ex. "
                value="Auto-filled"
              />
              <DisabledField
                id="street_no"
                label="Street No."
                placeholder=""
                value="Auto-filled"
              />
              <DisabledField
                id="street_address"
                label="Street Address"
                placeholder=""
                value="Auto-filled"
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <DisabledField
                id="block_no"
                label="Block"
                placeholder="ex. "
                value="Auto-filled"
              />
              <DisabledField
                id="building_no"
                label="Building No."
                placeholder="ex. "
                value="Auto-filled"
              />
            </div>

            <div className="grid grid-col-2 xl:grid-cols-4 gap-6 mb-6">
              <DisabledField
                id="country"
                label="Country"
                placeholder="ex. "
                value="Auto-filled"
              />
              <DisabledField
                id="state_province"
                label="State/Province"
                placeholder="ex. "
                value="Auto-filled"
              />
              <DisabledField
                id="city"
                label="City"
                placeholder="ex. "
                value="Auto-filled"
              />
              <DisabledField
                id="zip_postal"
                label="Zip/Postal Code"
                placeholder="ex. "
                value="Auto-filled"
              />
            </div>
          </div>
        )}

        {activeTab === "scheduling" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Job Scheduling</h2>

            {/* Start Date and Time */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6 xl:w-1/2">
              <div>
                <label
                  htmlFor="start_date"
                  className="block mb-2 text-sm font-bold text-gray-900"
                >
                  Start Date and Time
                </label>
                <input
                  type="datetime-local"
                  id="start_date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>

              {/* End Date and Time */}
              <div>
                <label
                  htmlFor="end_date"
                  className="block mb-2 text-sm font-bold text-gray-900"
                >
                  End Date and Time
                </label>
                <input
                  type="datetime-local"
                  id="end_date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
            </div>

            <div className="xl:w-1/6 w-1/2 mb-4">
              {/* Estimated Time */}
              <DisabledField
                id="estimated_time"
                label="Estimated Time (Hours)"
                placeholder="e.g., 3 hours"
                value="Auto-filled"
              />
            </div>
            {/* Job Priority */}
            <div className="mb-6">
              <label
                htmlFor="priority"
                className="block mb-2 text-sm font-bold text-gray-900"
              >
                Job Priority
              </label>
              <select
                id="priority"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              >
                <option value="">Select Priority</option>
                <option value="high">High</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end items-end">
          <div className="xl:w-1/6 w-full">
            <Button
              label={
                activeTab === "summary" || activeTab === "location"
                  ? "Next"
                  : "Schedule Job"
              }
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddJobPage;
