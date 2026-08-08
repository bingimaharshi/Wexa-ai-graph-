import { useMemo, useState } from 'react';
import { Search, ZoomIn } from 'lucide-react';
import { graphConnections, graphNodes } from '../data/careerGraphData';

export default function GraphExplorerPage() {
  const [query, setQuery] = useState('');
  const [nodeType, setNodeType] = useState<'all' | 'skill' | 'role' | 'company'>('all');
  const [selectedNodeId, setSelectedNodeId] = useState('Python');

  const visibleNodes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return graphNodes.filter((node) => {
      const matchesType = nodeType === 'all' || node.type === nodeType;
      const matchesQuery = !q || node.id.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [nodeType, query]);

  const visibleNodeIds = new Set(visibleNodes.map((node) => node.id));
  const selectedNode = visibleNodes.find((node) => node.id === selectedNodeId) ?? visibleNodes[0] ?? graphNodes[0];

  const visibleConnections = graphConnections.filter(([source, target]) => visibleNodeIds.has(source) && visibleNodeIds.has(target));

  return (
    <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
              placeholder="Search nodes..."
            />
          </div>

          <select
            value={nodeType}
            onChange={(event) => setNodeType(event.target.value as 'all' | 'skill' | 'role' | 'company')}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200"
          >
            <option value="all">All nodes</option>
            <option value="skill">Skills</option>
            <option value="role">Roles</option>
            <option value="company">Companies</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
          <svg viewBox="0 0 900 520" className="h-[520px] w-full">
            {visibleConnections.map(([source, target], index) => {
              const start = visibleNodes.find((node) => node.id === source) ?? graphNodes[0];
              const end = visibleNodes.find((node) => node.id === target) ?? graphNodes[0];
              return (
                <line key={`${source}-${target}-${index}`} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="#22d3ee" strokeOpacity="0.7" strokeWidth="2" />
              );
            })}

            {visibleNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const fill = node.type === 'skill' ? '#22d3ee' : node.type === 'role' ? '#f59e0b' : '#34d399';
              return (
                <g key={node.id} onClick={() => setSelectedNodeId(node.id)} className="cursor-pointer">
                  <circle cx={node.x} cy={node.y} r={isSelected ? 26 : 22} fill={fill} opacity={isSelected ? 1 : 0.85} />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="12" fill="#0f172a" fontWeight="700">
                    {node.id.length > 10 ? `${node.id.slice(0, 10)}...` : node.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-4 flex items-center gap-2 text-cyan-300">
          <ZoomIn className="h-5 w-5" />
          <h2 className="text-xl font-semibold text-white">Selected node</h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="text-2xl font-black text-white">{selectedNode?.id}</div>
          <div className="mt-3 inline-flex rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
            {selectedNode?.type}
          </div>

          <div className="mt-6 space-y-3 text-sm text-slate-300">
            <div>
              <span className="text-slate-400">Type:</span> {selectedNode?.type}
            </div>
            <div>
              <span className="text-slate-400">Connected to:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {graphConnections
                  .filter(([source, target]) => source === selectedNode?.id || target === selectedNode?.id)
                  .map(([source, target], index) => {
                    const connection = source === selectedNode?.id ? target : source;
                    return (
                      <span key={`${connection}-${index}`} className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-100">
                        {connection}
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
