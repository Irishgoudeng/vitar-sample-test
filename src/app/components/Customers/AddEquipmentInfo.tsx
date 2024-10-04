// "use client";

// import { useState } from "react";
// // import InputField from "../common/InputField";
// import DisabledField from "../common/DisabledField"; // Assuming you have this component
// import Button from "../common/Button";
// import SelectField from "../common/SelectField"; // Assuming you have this component

// const AddEquipmentInfo: React.FC = () => {
//   // Fields for Equipment Info Tab
//   const [customerID, setCustomerID] = useState("");
//   const [siteID, setSiteID] = useState("");
//   const [equipmentID, setEquipmentID] = useState("");

//   // Autofilled fields
//   const [customerName, setCustomerName] = useState(""); // Will be autofilled
//   const [siteName, setSiteName] = useState(""); // Will be autofilled
//   const [equipmentName, setEquipmentName] = useState(""); // Will be autofilled
//   const [typeOfScope, setTypeOfScope] = useState(""); // Autofilled
//   const [description, setDescription] = useState(""); // Autofilled
//   const [tagID, setTagID] = useState(""); // Autofilled
//   const [model, setModel] = useState(""); // Autofilled
//   const [serialNumber, setSerialNumber] = useState(""); // Autofilled
//   const [type, setType] = useState(""); // Autofilled
//   const [range, setRange] = useState(""); // Autofilled
//   const [traceability, setTraceability] = useState(""); // Autofilled

//   // Function to handle customer selection and autofill
//   const handleCustomerChange = (id: string) => {
//     setCustomerID(id);
//     if (id === "CUST001") {
//       setCustomerName("Customer One");
//     } else if (id === "CUST002") {
//       setCustomerName("Customer Two");
//     }
//     // Add more customer autofill logic as needed
//   };

//   // Function to handle site selection and autofill
//   const handleSiteChange = (id: string) => {
//     setSiteID(id);
//     if (id === "SITE001") {
//       setSiteName("Main Site");
//     } else if (id === "SITE002") {
//       setSiteName("Secondary Site");
//     }
//     // Add more site autofill logic as needed
//   };

//   // Function to handle equipment selection and autofill
//   const handleEquipmentChange = (id: string) => {
//     setEquipmentID(id);
//     if (id === "EQUIP001") {
//       setEquipmentName("Equipment One");
//       setTypeOfScope("Scope Type One");
//       setDescription("Description for Equipment One");
//       setTagID("TAG001");
//       setModel("Model A");
//       setSerialNumber("SN001");
//       setType("Type A");
//       setRange("0-100");
//       setTraceability("Traceability Info A");
//     } else if (id === "EQUIP002") {
//       setEquipmentName("Equipment Two");
//       setTypeOfScope("Scope Type Two");
//       setDescription("Description for Equipment Two");
//       setTagID("TAG002");
//       setModel("Model B");
//       setSerialNumber("SN002");
//       setType("Type B");
//       setRange("100-200");
//       setTraceability("Traceability Info B");
//     }
//     // Add more equipment autofill logic as needed
//   };

//   return (
//     <div className="container mx-auto p-6">
//       {/* Equipment Info Tab */}
//       <form className="space-y-4">
//         {/* Customer Data Section */}
//         <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
//           <h3 className="text-lg font-semibold mb-2">Customer Data</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <SelectField
//               id="customer_id"
//               label="Customer ID"
//               value={customerID}
//               onChange={(e) => handleCustomerChange(e.target.value)}
//               options={["CUST001", "CUST002", "CUST003"]}
//             />
//             <DisabledField
//               id="customer_name"
//               label="Customer Name"
//               value={customerName} // This will autofill
//             />
//           </div>
//         </div>

//         {/* Site Data Section */}
//         <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
//           <h3 className="text-lg font-semibold mb-2">Site Data</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <SelectField
//               id="site_id"
//               label="Site ID"
//               value={siteID}
//               onChange={(e) => handleSiteChange(e.target.value)}
//               options={["SITE001", "SITE002", "SITE003"]}
//             />
//             <DisabledField
//               id="site_name"
//               label="Site Name"
//               value={siteName} // This will autofill
//             />
//           </div>
//         </div>

//         {/* Equipment Data Section */}
//         <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
//           <h3 className="text-lg font-semibold mb-2">Equipment Data</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <SelectField
//               id="equipment_id"
//               label="Equipment ID"
//               value={equipmentID}
//               onChange={(e) => handleEquipmentChange(e.target.value)}
//               options={["EQUIP001", "EQUIP002", "EQUIP003"]}
//             />
//             <DisabledField
//               id="equipment_name"
//               label="Equipment Name"
//               value={equipmentName} // This will autofill
//             />
//             <DisabledField
//               id="type_of_scope"
//               label="Type of Scope"
//               value={typeOfScope} // This will autofill
//             />
//             <DisabledField
//               id="description"
//               label="Description"
//               value={description} // This will autofill
//             />
//             <DisabledField
//               id="tag_id"
//               label="Tag ID"
//               value={tagID} // This will autofill
//             />
//             <DisabledField
//               id="model"
//               label="Model"
//               value={model} // This will autofill
//             />
//             <DisabledField
//               id="serial_number"
//               label="Serial Number"
//               value={serialNumber} // This will autofill
//             />
//             <DisabledField
//               id="type"
//               label="Type"
//               value={type} // This will autofill
//             />
//             <DisabledField
//               id="range"
//               label="Range"
//               value={range} // This will autofill
//             />
//             <DisabledField
//               id="traceability"
//               label="Traceability"
//               value={traceability} // This will autofill
//             />
//           </div>
//         </div>

//         {/* Submit button */}
//         <div className="flex justify-end">
//           <Button label="Save Equipment" type="submit" />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddEquipmentInfo;
