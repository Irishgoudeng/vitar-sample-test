import React from "react";

import CalibrationCards from "../components/CalibrationCards/page";
import ListPagination from "../components/ListPagination/page";

const Dashboard: React.FC = () => {
  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="px-12 py-8">
        <h1 className="text-2xl font-bold  text-black">
          Welcome Back, PXC Dev!
        </h1>
        <p className=" text-gray-500">
          Stay on top of your calibration management tasks with the latest
          updates below. Click on a section for detailed insights to ensure all
          equipment is compliant and performing at its best
        </p>
      </div>

      <div>
        <CalibrationCards />
      </div>

      <div className="">
        <ListPagination />
      </div>
    </main>
  );
};

export default Dashboard;
