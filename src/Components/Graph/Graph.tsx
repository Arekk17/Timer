import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { getData } from "../../MyServices/crudServices";

interface Data {
  taskType: string;
  taskTime: number;
}

const ChartComponent: React.FC = () => {
  const [chartData, setChartData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData: { [field: string]: any; }[] = await getData();
        const processedData: Data[] = processData(fetchedData);
        setChartData(processedData);
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych:", error);
      }
    };

    fetchData();
  }, []);

  const processData = (data: { [field: string]: any; }[]): Data[] => {
    const groupedData: { [taskType: string]: number } = data.reduce((result, item) => {
      const { taskType, taskTime } = item;
      if (result[taskType]) {
        result[taskType] += taskTime;
      } else {
        result[taskType] = taskTime;
      }
      return result;
    }, {});

    return Object.entries(groupedData).map(([taskType, taskTime]) => ({
      taskType,
      taskTime,
    }));
  };

  return (
    <div className="w-full flex justify-center">
      <div className="overflow-x-auto mt-8">
      <BarChart width={900}height={400} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="taskType" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="taskTime" fill="#576fcd" />
        </BarChart>
      </div>
    </div>
  );
};

export default ChartComponent;
