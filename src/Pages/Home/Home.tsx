import React, { useEffect, useState, useCallback } from "react";
import TaskTimer from "../../Components/Timer/Timer";
import DataTable from "../../Components/Table/DataTable";

const Home = () => {
  const [refreshData, setRefreshData] = useState(false);

  const handleDataRefresh = useCallback(() => {
    setRefreshData((prevRefreshData) => !prevRefreshData);
  }, []);

  useEffect(() => {
    handleDataRefresh();
  }, [handleDataRefresh]);

  return (
    <div className="w-full md:w-3/4 lg:w-4/5 p-2 mx-auto h-screen overflow-hidden">
      <TaskTimer handleDataRefresh={handleDataRefresh} />
      <DataTable refreshData={refreshData} />
    </div>
  );
};

export default Home;
