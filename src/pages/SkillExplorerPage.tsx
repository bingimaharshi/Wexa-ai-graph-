import { useMemo, useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { skillCatalog, type UserProfile } from '../data/careerGraphData';
import { getSkillExplorerData, getRelatedSkills } from '../lib/careerGraph';

type SkillExplorerPageProps = {
  profile: UserProfile;
};

export default function SkillExplorerPage({ profile }: SkillExplorerPageProps) {
  const [query, setQuery] = useState('');
  const [selectedSkillName, setSelectedSkillName] = useState(profile.skills[0] ?? 'Python');

  const visibleSkills = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return skillCatalog;
    return skillCatalog.filter((skill) => skill.name.toLowerCase().includes(q));
  }, [query]);

  const selectedSkillData = getSkillExplorerData(selectedSkillName) ?? getSkillExplorerData('Python');

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search skill..."
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          {visibleSkills.map((skill) => (
            <button
              key={skill.name}
              type="button"
              onClick={() => setSelectedSkillName(skill.name)}
              className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left transition ${selectedSkillName === skill.name ? 'border-cyan-500 bg-cyan-500/5' : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'}`}
            >
              <div>
                <div className="font-medium text-white">{skill.name}</div>
                <div className="text-xs text-slate-400">{skill.category}</div>
              </div>
              <div className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-300">
                {profile.skills.includes(skill.name) ? 'Owned' : 'Target'}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-6 flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-cyan-300" />
          <h1 className="text-3xl font-black text-white">{selectedSkillData?.skill.name}</h1>
        </div>

        <p className="max-w-2xl text-slate-300">{selectedSkillData?.skill.description}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <h2 className="text-lg font-semibold text-white">Required by</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {(selectedSkillData?.requiredBy ?? []).map((role) => (
                <span key={role} className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-100">
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <h2 className="text-lg font-semibold text-white">Related skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {getRelatedSkills(selectedSkillData?.skill.name ?? 'Python').map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => setSelectedSkillName(skill)}
                  className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-sm text-slate-200 hover:border-cyan-500"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <h2 className="text-lg font-semibold text-white">Commonly paired with</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {(selectedSkillData?.pairedSkills ?? []).map((skill) => (
              <span key={skill} className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
