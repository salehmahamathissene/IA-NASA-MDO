import { useState, useEffect } from 'react';
import axios from 'axios';

interface SimulationItem {
  id: number;
  project_name: string;
  type: string;
  status: string;
}

interface DashboardStats {
  total_projects: number;
  total_simulations: number;
  aircraft_configurations: number;
  optimization_runs: number;
  ai_recommendations: number;
  digital_twins: number;
}

export default function MissionControl() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [queue, setQueue] = useState<SimulationItem[]>([]);
  const [errorLog, setErrorLog] = useState<string | null>(null);

  // Sync real-time metrics and relational tables from backend
  const fetchDashboardData = () => {
    axios.get('http://127.0.0.1:8000/api/dashboard/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error("Stats communication error", err));

    axios.get('http://127.0.0.1:8000/api/dashboard/simulations-queue')
      .then(res => setQueue(res.data))
      .catch(err => console.error("Queue communication error", err));
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Centralized action handler that completely forces the transaction to execute
  const handleWriteAction = async (actionType: string) => {
    console.log(`Executing click action for: ${actionType}`);
    try {
      setErrorLog(null);
      
      // Hit the backend directly via full URL to bypass any internal TanStack proxy issues
      await axios.post('http://127.0.0.1:8000/api/simulations/run', {
        project_id: 1,
        engineer_id: 23307
      });
      
      alert(`${actionType} processed successfully.`);
      fetchDashboardData();
    } catch (err: any) {
      console.log("Trigger intercepted successfully!", err);
      const serverMessage = err.response?.data?.detail || "Database write transaction failure.";
      setErrorLog(serverMessage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="p-6 bg-[#0b0f19] text-white min-h-screen font-sans">
      
      {/* HEADER CONTROLS */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono text-blue-500 tracking-wider font-semibold">MDO / MISSION CONTROL</span>
          <h1 className="text-2xl font-bold tracking-tight mt-0.5">Mission Control</h1>
          <p className="text-gray-400 text-xs mt-0.5">Overview of your aerospace design workspace (Reg: 23307/2023)</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sm font-medium rounded transition">
            Export
          </button>
          
          {/* CRITICAL LOCK REMOVED: Fully interactive button with absolute high pointer priority */}
          <button 
            onClick={() => handleWriteAction('New Project Creation')}
            type="button"
            style={{ pointerEvents: 'auto', opacity: 1, cursor: 'pointer' }}
            className="relative z-50 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-sm font-medium rounded transition block"
          >
            New Project
          </button>
        </div>
      </div>

      {/* PHASE VII LIVE TRIGGER ALERT BANNER */}
      {errorLog && (
        <div className="mb-6 p-4 bg-red-950/80 border border-red-700 rounded-xl text-sm text-red-200 flex items-start gap-3">
          <span className="text-lg mt-0.5">⚠️</span>
          <div>
            <strong className="text-red-400 block font-semibold">Database Trigger Intercepted (Phase VII Exception)</strong>
            <p className="mt-1 font-mono text-xs bg-black/30 p-2.5 rounded border border-red-900/50 text-red-300 leading-relaxed">
              {errorLog}
            </p>
          </div>
        </div>
      )}

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <div className="bg-[#131a2c] border border-slate-800/60 p-4 rounded-xl">
          <div className="flex justify-between items-start text-emerald-400 text-xs font-mono font-medium">
            <span>Total Projects</span>
            <span>+3 this week</span>
          </div>
          <h3 className="text-2xl font-bold mt-2">{stats ? stats.total_projects : "2"}</h3>
        </div>

        <div className="bg-[#131a2c] border border-slate-800/60 p-4 rounded-xl">
          <div className="flex justify-between items-start text-blue-400 text-xs font-mono font-medium">
            <span>Configurations</span>
            <span>+12</span>
          </div>
          <h3 className="text-2xl font-bold mt-2">{stats ? stats.aircraft_configurations : "87"}</h3>
        </div>

        <div className="bg-[#131a2c] border border-slate-800/60 p-4 rounded-xl">
          <div className="flex justify-between items-start text-purple-400 text-xs font-mono font-medium">
            <span>Optimization Runs</span>
            <span>+48</span>
          </div>
          <h3 className="text-2xl font-bold mt-2">{stats ? stats.optimization_runs : "342"}</h3>
        </div>

        <div className="bg-[#131a2c] border border-slate-800/60 p-4 rounded-xl">
          <div className="flex justify-between items-start text-yellow-400 text-xs font-mono font-medium">
            <span>CFD Simulations</span>
            <span>+9 queued</span>
          </div>
          <h3 className="text-2xl font-bold mt-2">{stats ? stats.total_simulations : "3"}</h3>
        </div>

        <div className="bg-[#131a2c] border border-slate-800/60 p-4 rounded-xl">
          <div className="flex justify-between items-start text-cyan-400 text-xs font-mono font-medium">
            <span>AI Recommendations</span>
            <span>+96</span>
          </div>
          <h3 className="text-2xl font-bold mt-2">{stats ? stats.ai_recommendations : "1,204"}</h3>
        </div>

        <div className="bg-[#131a2c] border border-slate-800/60 p-4 rounded-xl">
          <div className="flex justify-between items-start text-pink-400 text-xs font-mono font-medium">
            <span>Digital Twins</span>
            <span>2 live</span>
          </div>
          <h3 className="text-2xl font-bold mt-2">{stats ? stats.digital_twins : "6"}</h3>
        </div>
      </div>

      {/* SIMULATION QUEUE TABULATION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#131a2c] border border-slate-800/60 p-5 rounded-xl lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="text-base font-semibold tracking-tight">Simulation Queue</h4>
              <p className="text-xs text-gray-400 mt-0.5">Compute cluster · 128 vCPU available</p>
            </div>
            
            {/* SECOND INTERACTIVE ELEMENT: Guaranteed click surface */}
            <button 
              onClick={() => handleWriteAction('Simulation Pipeline Insertion')}
              type="button"
              style={{ pointerEvents: 'auto', opacity: 1, cursor: 'pointer' }}
              className="relative z-50 px-3 py-1.5 bg-[#1e293b] hover:bg-slate-700 text-xs font-medium rounded-lg transition border border-slate-700 block"
            >
              + Run New Simulation
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-gray-400 font-mono">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Project Target</th>
                  <th className="pb-3 font-medium">Method</th>
                  <th className="pb-3 font-medium text-right">Cluster Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {queue.length > 0 ? queue.map(item => (
                  <tr key={item.id} className="hover:bg-slate-800/20 transition">
                    <td className="py-3 font-mono text-blue-400 font-semibold">{item.id}</td>
                    <td className="py-3 font-medium text-slate-200">{item.project_name}</td>
                    <td className="py-3">
                      <span className="bg-slate-800/80 border border-slate-700/50 px-2 py-0.5 rounded font-mono text-[10px] text-slate-300">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span className={`inline-flex items-center gap-1.5 font-medium ${
                        item.status === 'COMPLETED' ? 'text-emerald-400' : 
                        item.status === 'RUNNING' ? 'text-yellow-400' : 'text-slate-400'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          item.status === 'COMPLETED' ? 'bg-emerald-400' : 
                          item.status === 'RUNNING' ? 'bg-yellow-400' : 'bg-slate-400'
                        }`} />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <>
                    <tr>
                      <td className="py-3 font-mono text-blue-400 font-semibold">1</td>
                      <td className="py-3 font-medium text-slate-200">GreenWing</td>
                      <td className="py-3"><span className="bg-slate-800/80 px-2 py-0.5 rounded font-mono text-[10px]">CFD</span></td>
                      <td className="py-3 text-right text-emerald-400">● COMPLETED</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-mono text-blue-400 font-semibold">2</td>
                      <td className="py-3 font-medium text-slate-200">GreenWing</td>
                      <td className="py-3"><span className="bg-slate-800/80 px-2 py-0.5 rounded font-mono text-[10px]">MDO</span></td>
                      <td className="py-3 text-right text-yellow-400">● RUNNING</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-mono text-blue-400 font-semibold">3</td>
                      <td className="py-3 font-medium text-slate-200">AeroMax</td>
                      <td className="py-3"><span className="bg-slate-800/80 px-2 py-0.5 rounded font-mono text-[10px]">STRUCTURAL</span></td>
                      <td className="py-3 text-right text-slate-400">● PENDING</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* SIDE BAR DETAILS */}
        <div className="space-y-4">
          <div className="bg-[#131a2c] border border-slate-800/60 p-5 rounded-xl">
            <h4 className="text-sm font-semibold tracking-tight mb-3 text-slate-200">Latest Activity</h4>
            <div className="space-y-3 font-sans text-xs">
              <div className="border-l-2 border-blue-500 pl-3">
                <p className="text-slate-300">N. Okafor started CFD run on Baobab-A320</p>
                <span className="text-gray-500 font-mono text-[10px]">2 min ago</span>
              </div>
              <div className="border-l-2 border-purple-500 pl-3">
                <p className="text-slate-300">AI Assistant recommended new winglet design</p>
                <span className="text-gray-500 font-mono text-[10px]">18 min ago</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}