"use client";

import React, { useState, useRef, useEffect } from "react";
import { Site } from "@/app/types/Site"; // Define the Site type
// import AddSiteModal from "@/app/components/Site/AddSiteModal";
import { db } from "@/app/firebase/config"; // Import your Firebase config
import { collection, getDocs } from "firebase/firestore";

const SitePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sites, setSites] = useState<Site[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>(
    {}
  );
  // const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust the number of items per page
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Fetch sites from Firestore
  useEffect(() => {
    const fetchSites = async () => {
      const siteCollectionRef = collection(db, "site");
      const siteSnapshot = await getDocs(siteCollectionRef);
      const siteList: Site[] = siteSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Site[];
      setSites(siteList);
    };

    fetchSites();
  }, []);

  const handleAdd = () => {
    // setIsModalOpen(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // const handleAddSite = (newSite: Site) => {
  //   setSites((prev) => [...prev, newSite]); // Add new site to the list
  // };

  const filteredSites = sites.filter((site) => {
    const matchesSearch = site.siteName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      site.city.toLowerCase().includes(selectedFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredSites.length / itemsPerPage);
  const indexOfLastSite = currentPage * itemsPerPage;
  const indexOfFirstSite = indexOfLastSite - itemsPerPage;
  const currentSites = filteredSites.slice(indexOfFirstSite, indexOfLastSite);

  const toggleDropdown = (siteId: string) => {
    // Ensure this doesn't reference window directly
    setDropdownOpen((prev) => ({
      ...prev,
      [siteId]: !prev[siteId],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (typeof window !== "undefined") {
        for (const id in dropdownRefs.current) {
          if (
            dropdownRefs.current[id] &&
            dropdownOpen[id] &&
            !dropdownRefs.current[id]?.contains(event.target as Node)
          ) {
            setDropdownOpen((prev) => ({ ...prev, [id]: false }));
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="p-8 lg:p-12 bg-white h-screen overflow-hidden">
      <h1 className="text-3xl font-semibold text-gray-900 mb-4 py-8 lg:mb-0">
        Sites
      </h1>
      <div className="mb-6 flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <div className="flex gap-4 mb-4 lg:mb-0">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by site name..."
            className="px-4 py-2 border border-gray-300 rounded-lg text-black"
          />
          <select
            value={selectedFilter}
            onChange={handleFilter}
            className="px-4 py-2 border border-gray-300 rounded-lg text-black"
          >
            <option value="all">All Cities</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Add Site
        </button>
      </div>

      {/* Table for larger screens */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600 bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Site ID
              </th>
              <th scope="col" className="px-6 py-3">
                Site Name
              </th>
              <th scope="col" className="px-6 py-3">
                Street 1
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
              <th scope="col" className="px-6 py-3">
                Postcode
              </th>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentSites.length > 0 ? (
              currentSites.map((site) => (
                <tr key={site.siteID} className="border-b">
                  <td className="px-6 py-4">{site.siteID}</td>
                  <td className="px-6 py-4">{site.siteName}</td>
                  <td className="px-6 py-4">{site.street1}</td>
                  <td className="px-6 py-4">{site.city}</td>
                  <td className="px-6 py-4">{site.postCode}</td>
                  <td className="px-6 py-4">{site.country}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <button
                        onClick={() => toggleDropdown(site.siteID)}
                        className="text-gray-500 hover:underline"
                      >
                        &#x2022;&#x2022;&#x2022; {/* Three dots */}
                      </button>
                      <div
                        ref={(el) => {
                          if (el) {
                            dropdownRefs.current[site.siteID] = el;
                          } else {
                            delete dropdownRefs.current[site.siteID];
                          }
                        }}
                        className={`absolute right-0 w-48 bg-white border border-gray-200 rounded shadow-lg ${
                          dropdownOpen[site.siteID] ? "block" : "hidden"
                        } z-10`}
                        style={{
                          top: "100%", // Position it directly below the button
                          marginTop: "0.25rem", // Add a small gap from the button
                        }}
                      >
                        {/* Add Delete button functionality if needed */}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No sites found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-black hover:bg-gray-100"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg text-black hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>

      {/* <AddSiteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddSite={handleAddSite}
      /> */}
    </div>
  );
};

export default SitePage;
