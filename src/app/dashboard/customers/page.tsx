"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import {
  Customer,
  CustomerEquipment,
  CustomerSite,
} from "@/app/types/Customer"; // Updated imports
import Button from "@/app/components/common/Button";
import { useRouter } from "next/navigation";

const CustomersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter] = useState("all");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Fetch customer data from Firestore
  const fetchCustomers = async () => {
    const customerCollection = collection(db, "customerInfo");
    const customerQuerySnapshot = await getDocs(customerCollection);

    const fetchedCustomers: Customer[] = await Promise.all(
      customerQuerySnapshot.docs.map(async (doc) => {
        const customerData = doc.data() as Customer;

        // Fetch equipment for each customer
        const equipmentCollection = collection(db, "customerEquipmentInfo");
        const equipmentQuery = query(
          equipmentCollection,
          where("customerID", "==", customerData.customerID)
        );
        const equipmentQuerySnapshot = await getDocs(equipmentQuery);

        const equipment: CustomerEquipment[] = equipmentQuerySnapshot.docs.map(
          (equipDoc) => equipDoc.data() as CustomerEquipment
        );

        // Fetch sites for each customer
        const siteCollection = collection(db, "customerSiteInfo");
        const siteQuery = query(
          siteCollection,
          where("customerID", "==", customerData.customerID)
        );
        const siteQuerySnapshot = await getDocs(siteQuery);

        const sites: CustomerSite[] = siteQuerySnapshot.docs.map(
          (equipDoc) => equipDoc.data() as CustomerSite
        );

        return {
          ...customerData,
          equipment,
          sites, // Add sites to the customer object
        };
      })
    );
    setCustomers(fetchedCustomers);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const router = useRouter();
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.customerName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      customer.contactPhone
        .toLowerCase()
        .includes(selectedFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredCustomers.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredCustomers.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEntriesPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEntriesPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to the first page
  };

  const handleAdd = () => {
    router.push("./customers/add");
  };

  const handleDelete = (customerID: string) => {
    console.log("Delete customer", customerID);
  };

  return (
    <div className="p-8 lg:p-12 bg-white h-screen overflow-x-hidden">
      <h1 className="text-3xl font-semibold text-gray-900 mb-4 py-8 lg:mb-0">
        Customers
      </h1>
      <div className="mb-6 flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <div className="flex gap-4 mb-4 lg:mb-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name..."
            className="px-4 py-2 border border-gray-300 rounded-lg text-black"
          />

          <select
            value={entriesPerPage}
            onChange={handleEntriesPerPageChange}
            className="px-4 py-2 border border-gray-300 rounded-lg text-black"
          >
            <option value="5">5 entries per page</option>
            <option value="10">10 entries per page</option>
            <option value="20">20 entries per page</option>
          </select>
        </div>

        <Button type="button" label="Add Customer" onClick={handleAdd} />
      </div>

      {/* Table with sticky header and fixed height */}
      <div className="relative overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-md h-[500px]">
        <table className="w-full text-sm text-left text-gray-600 bg-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3">
                Customer ID
              </th>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Sites
              </th>
              <th scope="col" className="px-6 py-3">
                Equipment
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {currentEntries.length > 0 ? (
              currentEntries.map((customer) => (
                <tr
                  key={customer.customerID}
                  className="border-b border-gray-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {customer.customerID}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {customer.customerName}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {customer.contactEmail}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {customer.contactPhone}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {customer.sites && customer.sites.length > 0 ? (
                      customer.sites.map((sites, index) => (
                        <div key={index}>
                          <p>
                            - {sites.siteID} ({sites.siteName})
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>No sites assigned</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {customer.equipment && customer.equipment.length > 0 ? (
                      customer.equipment.map((equip) => (
                        <div key={equip.equipmentID}>
                          <p>
                            - {equip.equipmentID} ({equip.equipmentName})
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>No equipment assigned</p>
                    )}
                  </td>
                  <td className="items-center justify-start">
                    {/* Three-dot menu button */}
                    <button
                      onClick={() =>
                        setDropdownOpen((prev) => ({
                          ...prev,
                          // Use customerID here for menu toggle
                          [customer.customerID]: !prev[customer.customerID],
                        }))
                      }
                      className="text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                      ⋮
                    </button>
                    {/* Dropdown Menu */}
                    {dropdownOpen[customer.customerID] && (
                      <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-2">
                        <button
                          onClick={() => {
                            handleDelete(customer.customerID);
                            setDropdownOpen((prev) => ({
                              ...prev,
                              [customer.customerID]: false,
                            }));
                          }}
                          className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-4">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-white bg-blue-600 rounded-lg ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-white bg-blue-600 rounded-lg ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
