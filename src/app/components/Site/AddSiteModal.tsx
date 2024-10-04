// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useState } from "react";
// import InputField from "@/app/components/common/InputField";
// import Button from "@/app/components/common/Button";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Create a custom component to handle map clicks
// const MapClickHandler = ({
//   setCoordinates,
// }: {
//   setCoordinates: (coords: [number, number]) => void;
// }) => {
//   useMapEvents({
//     click(e) {
//       setCoordinates([e.latlng.lat, e.latlng.lng]); // Set the latitude and longitude based on click
//     },
//   });

//   return null; // This component does not render anything itself
// };

// interface AddSiteModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddSite: (site: any) => void; // Update type as needed
// }

// const AddSiteModal: React.FC<AddSiteModalProps> = ({
//   isOpen,
//   onClose,
//   onAddSite,
// }) => {
//   const [siteID, setSiteID] = useState("");
//   const [siteName, setSiteName] = useState("");
//   const [street1, setStreet1] = useState("");
//   const [street2, setStreet2] = useState("");
//   const [street3, setStreet3] = useState("");
//   const [city, setCity] = useState("");
//   const [postcode, setPostcode] = useState("");
//   const [country, setCountry] = useState("");
//   const [coordinates, setCoordinates] = useState<[number, number] | null>(null); // Coordinates for the map pin

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newSite = {
//       siteID,
//       siteName,
//       street1,
//       street2,
//       street3,
//       city,
//       postcode,
//       country,
//       coordinates, // Include the coordinates in the new site
//     };
//     onAddSite(newSite);
//     onClose(); // Close modal after adding
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ease-in-out">
//       <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl relative transform transition-transform duration-300 ease-in-out scale-100 hover:scale-105">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-600 hover:text-red-600 focus:outline-none transition duration-200"
//           aria-label="Close modal"
//         >
//           &times;
//         </button>
//         <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
//           Add Site
//         </h2>
//         <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
//           <InputField
//             id="site_id"
//             label="Site ID"
//             placeholder="Enter Site ID"
//             value={siteID}
//             onChange={(e) => setSiteID(e.target.value)}
//           />
//           <InputField
//             id="site_name"
//             label="Site Name"
//             placeholder="Enter Site Name"
//             value={siteName}
//             onChange={(e) => setSiteName(e.target.value)}
//           />
//           <InputField
//             id="street_1"
//             label="Street 1"
//             placeholder="Enter Street 1"
//             value={street1}
//             onChange={(e) => setStreet1(e.target.value)}
//           />
//           <InputField
//             id="street_2"
//             label="Street 2"
//             placeholder="Enter Street 2"
//             value={street2}
//             onChange={(e) => setStreet2(e.target.value)}
//           />
//           <InputField
//             id="street_3"
//             label="Street 3"
//             placeholder="Enter Street 3"
//             value={street3}
//             onChange={(e) => setStreet3(e.target.value)}
//           />
//           <InputField
//             id="city"
//             label="City"
//             placeholder="Enter City"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//           />
//           <InputField
//             id="postcode"
//             label="Postcode"
//             placeholder="Enter Postcode"
//             value={postcode}
//             onChange={(e) => setPostcode(e.target.value)}
//           />
//           <InputField
//             id="country"
//             label="Country"
//             placeholder="Enter Country"
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//           />

//           {/* Map for pinning the site location */}
//           <div className="col-span-2">
//             <h3 className="mb-2 text-lg font-semibold text-gray-800">
//               Select Location
//             </h3>
//             <MapContainer
//               center={[51.505, -0.09]}
//               zoom={13}
//               className="h-60 w-full"
//               scrollWheelZoom={false}
//             >
//               <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               />
//               <MapClickHandler setCoordinates={setCoordinates} />
//               {coordinates && (
//                 <Marker
//                   position={coordinates}
//                   icon={L.icon({
//                     iconUrl: "/marker-icon.png",
//                     iconSize: [25, 41],
//                   })}
//                 />
//               )}
//             </MapContainer>
//             <div className="mt-2">
//               <p className="text-sm text-gray-600">
//                 Click on the map to pin the location.
//               </p>
//             </div>
//           </div>

//           <div className="flex items-end justify-end">
//             <Button label="Submit" type="submit" />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddSiteModal;
