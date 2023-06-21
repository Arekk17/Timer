import { Record } from './DataTable';
interface SingleRecordProps {
  record: Record;
}

const SingleRecord: React.FC<SingleRecordProps> = ({ record }) => {  
  console.log(Number (record.taskTime))
  const category = () => {
    switch(record.taskType) {
      case "sport":   return <td className='p-2 border-b-2 border-l-2 border-solid border-black bg-red-600'>{record.taskType}</td>;
      case "praca":    return <td className='p-2 border-b-2 border-l-2 border-solid border-black bg-blue-600'>{record.taskType}</td>;
      case "czytanie":  return <td className='p-2 border-b-2 border-l-2 border-solid border-black bg-green-600'>{record.taskType}</td>;
      default:      return <td className='p-2 border-b-2 border-l-2 border-solid border-black bg-white-600'>{record.taskType}</td>
    }
  }
  return (
    <>      
      <td className='p-2 border-b-2 border-l-2 border-solid border-black'>{record.taskName}</td>    
      {Number (record.taskTime) <= 60 ? <td className='p-2 border-b-2 border-l-2 border-solid border-black'>{record.taskTime}</td> :<td> syf</td>}        
      { category() }
      <td className='p-2 border-b-2 border-l-2 border-solid border-black '>{record.startTime}</td>
      <td className='p-2 border-b-2 border-l-2 border-r-2 border-solid border-black '>{record.endTime}</td>
    </>
  );
};

export default SingleRecord;