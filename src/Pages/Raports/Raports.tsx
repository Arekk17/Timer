import React from "react";
import RaportsComponents from "../../Components/Raports/RaportsComponents";

const Raports = () => {
  return(
    <div className="w-full md:w-3/4 lg:w-4/5 p-2 mx-auto h-screen overflow-hidden">
        <RaportsComponents refreshData={false} />
    </div>
  )
};

export default Raports;
