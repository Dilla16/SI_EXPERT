import DashboardCard from "./card";
import Graph from "./graph";

function Beranda() {
  return (
    <div>
      <div className="mt-4 flex flex-col items-start">
        <DashboardCard />
        <Graph />
      </div>
    </div>
  );
}

export default Beranda;
