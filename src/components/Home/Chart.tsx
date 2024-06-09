import chartPng from '../../assets/Chart.png';
const Chart = () => {
  return (
    <div className="border-2 mr-2 rounded-lg p-2">
      <img
        src={chartPng}
        alt="chart"
        className="w-[100%] h-[100%] object-cover object-center cursor-pointer"
      />
    </div>
  );
};

export default Chart;
