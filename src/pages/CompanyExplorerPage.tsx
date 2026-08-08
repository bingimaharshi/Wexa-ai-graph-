import { useMemo, useState } from 'react';
import { Building2, Globe, Sparkles } from 'lucide-react';
import { companies, type UserProfile } from '../data/careerGraphData';

type CompanyExplorerPageProps = {
  profile: UserProfile;
};

export default function CompanyExplorerPage({ profile }: CompanyExplorerPageProps) {
  const [selectedCompanyName, setSelectedCompanyName] = useState('Amazon');

  const company = useMemo(() => companies.find((item) => item.name === selectedCompanyName) ?? companies[0], [selectedCompanyName]);

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-4">
        {companies.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setSelectedCompanyName(item.name)}
            className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${selectedCompanyName === item.name ? 'border-cyan-500 bg-cyan-500/5' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}
          >
            <div>
              <div className="flex items-center gap-2 text-white">
                <Building2 className="h-4 w-4 text-cyan-300" />
                <span className="font-semibold">{item.name}</span>
              </div>
              <div className="mt-1 text-xs text-slate-400">{item.industry}</div>
            </div>
            <div className="text-right text-xs text-slate-300">{item.roles.length} roles</div>
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Company explorer</p>
            <h1 className="mt-2 text-3xl font-black text-white">{company.name}</h1>
          </div>
          <div className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-200">
            {company.size}
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="mb-3 flex items-center gap-2 text-cyan-300">
              <Globe className="h-4 w-4" />
              <span className="font-semibold text-white">Roles</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {company.roles.map((role) => (
                <span key={role} className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-100">{role}</span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="mb-3 flex items-center gap-2 text-cyan-300">
              <Sparkles className="h-4 w-4" />
              <span className="font-semibold text-white">Technologies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {company.technologies.map((technology) => (
                <span key={technology} className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">{technology}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <h2 className="text-lg font-semibold text-white">Preferred skills</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {company.looksFor.map((skill) => (
              <span key={skill} className={`rounded-full px-3 py-1 text-sm ${profile.skills.includes(skill) ? 'border border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border border-slate-700 bg-slate-900 text-slate-200'}`}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
