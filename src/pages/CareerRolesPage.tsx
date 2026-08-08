import { useMemo, useState } from 'react';
import { ArrowUpRight, Briefcase, Sparkles } from 'lucide-react';
import { type UserProfile, roles } from '../data/careerGraphData';
import { calculateRoleRecommendations, getRoleByName } from '../lib/careerGraph';

type CareerRolesPageProps = {
  profile: UserProfile;
};

export default function CareerRolesPage({ profile }: CareerRolesPageProps) {
  const [selectedRoleName, setSelectedRoleName] = useState(profile.targetRoles[0] ?? roles[0].name);

  const recommendations = useMemo(() => calculateRoleRecommendations(profile.skills), [profile.skills]);
  const selectedRole = getRoleByName(selectedRoleName) ?? roles[0];
  const score = recommendations.find((item) => item.name === selectedRole.name)?.score ?? 0;

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h1 className="text-2xl font-bold text-white">Career roles</h1>
          <p className="mt-2 text-sm text-slate-400">Explore how your skills map to the roles you can realistically target next.</p>
        </div>

        {roles.map((role) => {
          const match = recommendations.find((item) => item.name === role.name);
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => setSelectedRoleName(role.name)}
              className={`w-full rounded-2xl border p-4 text-left transition ${selectedRoleName === role.name ? 'border-cyan-500 bg-cyan-500/5' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-white">
                    <Briefcase className="h-4 w-4 text-cyan-300" />
                    <span className="font-semibold">{role.name}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{role.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-cyan-300">{match?.score ?? 0}%</div>
                  <div className="text-xs text-slate-500">match</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Role profile</p>
            <h2 className="mt-2 text-3xl font-black text-white">{selectedRole.name}</h2>
          </div>
          <div className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-200">
            {score}% fit
          </div>
        </div>

        <p className="mt-4 text-slate-300">{selectedRole.description}</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="mb-4 flex items-center gap-2 text-cyan-300">
              <Sparkles className="h-4 w-4" />
              <span className="font-semibold text-white">Required skills</span>
            </div>
            <div className="space-y-3">
              {selectedRole.requiredSkills.map((skill) => {
                const matched = profile.skills.includes(skill);
                return (
                  <div key={skill}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className={matched ? 'text-emerald-300' : 'text-slate-300'}>{skill}</span>
                      <span className="text-slate-500">{matched ? '✓' : '—'}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800">
                      <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500" style={{ width: matched ? '100%' : '35%' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="mb-4 flex items-center gap-2 text-cyan-300">
              <ArrowUpRight className="h-4 w-4" />
              <span className="font-semibold text-white">Related roles</span>
            </div>
            <div className="space-y-2">
              {selectedRole.relatedRoles.map((roleName) => (
                <button
                  key={roleName}
                  type="button"
                  onClick={() => setSelectedRoleName(roleName)}
                  className="block w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-left text-slate-200 transition hover:border-cyan-500"
                >
                  {roleName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
