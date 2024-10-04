"use client";

import { useState } from "react";
import DisabledField from "../common/DisabledField";
import SelectField from "../common/SelectField";
import Button from "../common/Button";

interface SiteInfoProps {
  onNext: () => void; // Callback when the next button is clicked
}

const SiteInfo: React.FC<SiteInfoProps> = ({ onNext }) => {
  const [customerID, setCustomerID] = useState("");
  const [siteID, setSiteID] = useState("");

  // Autofilled fields
  const [siteName, setSiteName] = useState("Auto-filled Site Name");
  const [street1, setStreet1] = useState("Auto-filled Street 1");
  const [street2, setStreet2] = useState("Auto-filled Street 2");
  const [street3, setStreet3] = useState("Auto-filled Street 3");
  const [city, setCity] = useState("Auto-filled City");
  const [postcode, setPostcode] = useState("Auto-filled Postcode");
  const [country, setCountry] = useState("Auto-filled Country");
  const [latitude, setLatitude] = useState("Auto-filled Latitude");
  const [longitude, setLongitude] = useState("Auto-filled Longitude");

  // Function to autofill fields based on Site ID selection
  const handleSiteChange = (siteID: string) => {
    setSiteID(siteID);
    if (siteID === "SITE001") {
      setSiteName("Main Site");
      setStreet1("123 First Street");
      setStreet2("Suite 200");
      setStreet3("");
      setCity("New York");
      setPostcode("10001");
      setCountry("USA");
      setLatitude("40.7128");
      setLongitude("-74.0060");
    } else if (siteID === "SITE002") {
      setSiteName("Secondary Site");
      setStreet1("456 Second Street");
      setStreet2("");
      setStreet3("");
      setCity("Los Angeles");
      setPostcode("90001");
      setCountry("USA");
      setLatitude("34.0522");
      setLongitude("-118.2437");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(); // Call the next step callback
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Use a grid layout for compact field arrangement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          id="customer_id"
          label="Customer ID"
          value={customerID}
          onChange={(e) => setCustomerID(e.target.value)}
          options={["CUST001", "CUST002", "CUST003"].map((id) => ({
            value: id,
            label: id,
          }))} // Adjust to proper format
        />

        <DisabledField
          id="customer_name"
          label="Customer Name"
          value="Auto-filled Customer Name"
        />

        <SelectField
          id="site_id"
          label="Site ID"
          value={siteID}
          onChange={(e) => handleSiteChange(e.target.value)}
          options={["SITE001", "SITE002", "SITE003"].map((id) => ({
            value: id,
            label: id,
          }))} // Adjust to proper format
        />

        <DisabledField id="site_name" label="Site Name" value={siteName} />
      </div>

      {/* Group address fields together */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DisabledField id="street_1" label="Street 1" value={street1} />
        <DisabledField id="street_2" label="Street 2" value={street2} />
        <DisabledField id="street_3" label="Street 3" value={street3} />
      </div>

      {/* Group city, postcode, and country */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DisabledField id="city" label="City" value={city} />
        <DisabledField id="postcode" label="Postcode" value={postcode} />
        <DisabledField id="country" label="Country" value={country} />
      </div>

      {/* Group latitude and longitude */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DisabledField id="latitude" label="Latitude" value={latitude} />
        <DisabledField id="longitude" label="Longitude" value={longitude} />
      </div>

      <Button label="Next" type="submit" />
    </form>
  );
};

export default SiteInfo;
