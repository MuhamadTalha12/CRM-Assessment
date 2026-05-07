import { useEffect, useState } from "react";
import API from "../api";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import Panel from "../components/ui/Panel";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    API.get("/dashboard").then((res) => setData(res.data));
  }, []);

  return (
    <main className="app-page">
      <div className="app-main">
        <PageHeader
          kicker="Overview"
          title="Dashboard"
          subtitle="A compact view of pipeline health and overall lead performance."
        />

        <Panel>
          <div className="section-grid section-grid--three">
            <StatCard label="Total Leads" value={data.total_leads ?? 0} />
            <StatCard label="New Leads" value={data.new_leads ?? 0} />
            <StatCard label="Qualified Leads" value={data.qualified_leads ?? 0} />
            <StatCard label="Won Leads" value={data.won_leads ?? 0} />
            <StatCard label="Lost Leads" value={data.lost_leads ?? 0} />
            <StatCard label="Total Estimated Deal Value" value={data.total_estimated_deal_value ?? 0} />
            <StatCard label="Total Won Value" value={data.total_won_value ?? 0} />
          </div>
        </Panel>
      </div>
    </main>
  );
}

export default Dashboard;