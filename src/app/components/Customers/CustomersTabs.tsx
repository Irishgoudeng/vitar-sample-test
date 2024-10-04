"use client";

import { useState } from "react";

interface Tab {
  label: string;
  key: string;
}

interface AddCustomerTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (key: string) => void;
  disabledTabs?: { [key: string]: boolean }; // Optional prop for disabled tabs
}

const AddCustomerTabs: React.FC<AddCustomerTabsProps> = ({
  tabs,
  activeTab,
  onTabClick,
  disabledTabs = {},
}) => {
  const [selectedTab, setSelectedTab] = useState(activeTab);

  const handleTabChange = (key: string) => {
    setSelectedTab(key);
    onTabClick(key);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKey = e.target.value;
    handleTabChange(selectedKey);
  };

  return (
    <div className="mb-4">
      {/* Dropdown for mobile view */}
      <select
        value={selectedTab}
        onChange={handleSelectChange}
        className="block w-full mb-4 text-gray-600 border border-gray-300 rounded-lg sm:hidden"
      >
        {tabs.map((tab) => (
          <option
            key={tab.key}
            value={tab.key}
            disabled={disabledTabs[tab.key]} // Disable options based on disabledTabs
          >
            {tab.label}
          </option>
        ))}
      </select>

      {/* Tab Navigation for larger screens */}
      <div className="hidden sm:flex space-x-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => !disabledTabs[tab.key] && handleTabChange(tab.key)} // Handle tab click
            className={`pb-2 px-4 ${
              activeTab === tab.key
                ? "border-b-2 border-red-600 text-red-600 font-semibold"
                : "text-gray-600"
            } ${disabledTabs[tab.key] ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={disabledTabs[tab.key]} // Disable button
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AddCustomerTabs;
