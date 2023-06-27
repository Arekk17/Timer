import React from "react";
import ChartComponent from "../../Components/Graph/Graph";
import DataTable from "../../Components/Table/DataTable";

const Diagram = () => {
  return (
    <div className="w-full md:w-3/4 lg:w-4/5 p-2 mx-auto  overflow-hidden">
        <ChartComponent />
        <DataTable refreshData={false} />
    </div>
  )
};

export default Diagram;
