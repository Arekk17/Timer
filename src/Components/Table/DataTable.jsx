import React, { useState, useEffect } from 'react';
import { getData } from '../../MyServices/crudServices';

const DataTable = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    ShowData();
  }, []);

  const ShowData = () => {
    getData().then((x) => {
      setRecords(x);
    });

    // console.log(records);
  };

  return (
    <>
      {records.map((record, index) => {
        return (
          <tr key={index}>
            <td>{record.taskName}</td>
            <td>{record.taskTime}</td>
            <td>{record.taskType}</td>
          </tr>
        )
      })}
    </>
  );
};

export default DataTable;
