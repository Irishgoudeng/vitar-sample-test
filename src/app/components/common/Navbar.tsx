"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import profilePic from "../../../../public/assets/prof-pic.png"; // Replace with the path to your profile picture
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  // Close the dropdown if the user clicks outside
  const handleClickOutside = (e: MouseEvent) => {
    // Check if the clicked element is outside the dropdown and profile image
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to close the dropdown menu
  const closeDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav className="bg-red-500 p-4 justify-end items-center hidden lg:flex relative">
      {/* Profile Picture */}
      <div className="relative text-black">
        <Image
          src={profilePic}
          alt="Profile Picture"
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
          onClick={toggleProfileDropdown}
        />

        {/* Dropdown Menu */}
        {isProfileDropdownOpen && (
          <div
            ref={dropdownRef} // Attach the ref to the dropdown
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg"
          >
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link
                  href="/dashboard/settings"
                  className="block"
                  onClick={closeDropdown}
                >
                  Profile Settings
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link href="/login" className="block" onClick={closeDropdown}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
