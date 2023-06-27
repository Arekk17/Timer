import React, { useEffect, useState } from "react";
import TaskTimer from "../../Components/Timer/Timer";
import DataTable from "../../Components/Table/DataTable";


const Home = () => {
    const [refreshData, setRefreshData] = useState(false);
    
    const handleDataRefresh = () => {
      setRefreshData(!refreshData);
    };
    
    useEffect(() => {
      handleDataRefresh();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return(
    <div className="w-full md:w-3/4 lg:w-4/5 p-2 mx-auto h-screen overflow-hidden">
        <TaskTimer handleDataRefresh={handleDataRefresh}/>
        <DataTable refreshData={refreshData} />
    </div>
  )
};

export default Home;
