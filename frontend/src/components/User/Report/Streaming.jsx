
const StreamingTime = ({ reportData }) => {
    return (
      <div className="h-100  flex justify-center items-center flex-col">
        <h2 className="text-xl font-bold">Your Streaming Time</h2>
        <p>
          This month, you listened for a total of{" "}
          {reportData.map((report) => Math.floor((report?.timeSpent/60)/1000)).join(", ")} minutes.
        </p>
      </div>
    );
  };
  
  export default StreamingTime;
  