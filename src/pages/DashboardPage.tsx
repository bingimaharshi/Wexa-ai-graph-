import { ArrowRight, Briefcase, Gauge, Sparkles, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type UserProfile } from '../data/careerGraphData';
import { calculateRoleRecommendations, getNextSkillRecommendation, getUserReadinessSummary } from '../lib/careerGraph';

const statCards = [
  { label: 'Skills', value: '12' },
  { label: 'Projects', value: '4' },
  { label: 'Target Roles', value: '3' },
];

type DashboardPageProps = {
  profile: UserProfile;
};

export default function DashboardPage({ profile }: DashboardPageProps) {
  const recommendations = calculateRoleRecommendations(profile.skills).slice(0, 4);
  const readiness = getUserReadinessSummary(profile);
  const nextSkill = getNextSkillRecommendation(profile.skills, profile.targetRoles[0]);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 p-8 shadow-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Career dashboard</p>
            <h1 className="mt-3 text-4xl font-black text-white">Hello, {profile.name}</h1>
            <p className="mt-3 max-w-xl text-slate-300">
              Your connected career graph shows where your current strengths align and what skills unlock the next role.
            </p>
          </div>
          <Link to="/analyze" className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
            Analyze my profile
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="text-sm text-slate-400">{card.label}</div>
            <div className="mt-3 text-3xl font-black text-white">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center gap-3">
            <Gauge className="h-5 w-5 text-cyan-300" />
            <h2 className="text-xl font-semibold text-white">Career readiness</h2>
          </div>

          <div className="space-y-5">
            {readiness.map((item) => (
              <div key={item.name}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>{item.name}</span>
                  <span>{item.score}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-800">
                  <div className="h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${item.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-cyan-300" />
            <h2 className="text-xl font-semibold text-white">Recommended next skill</h2>
          </div>
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">
            <div className="text-sm text-cyan-300">Top recommendation</div>
            <div className="mt-2 text-3xl font-black text-white">{nextSkill?.skill.name}</div>
            <p className="mt-3 text-sm text-slate-300">
              This skill connects to your strongest career paths and unlocks additional role opportunities based on your current graph profile.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center gap-3">
            <Target className="h-5 w-5 text-cyan-300" />
            <h2 className="text-xl font-semibold text-white">Best matching roles</h2>
          </div>
          <div className="space-y-4">
            {recommendations.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-white">{item.name}</div>
                    <div className="text-xs text-slate-400">{item.matchedSkills.length} matching skills</div>
                  </div>
                  <div className="text-2xl font-black text-cyan-300">{item.score}%</div>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ width: `${item.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-cyan-300" />
            <h2 className="text-xl font-semibold text-white">Career path</h2>
          </div>
          <div className="space-y-3">
            {['Frontend Engineer', 'Full Stack Engineer', 'Backend Engineer', 'AI Engineer'].map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/10 text-sm font-semibold text-cyan-300">
                  {index + 1}
                </div>
                <div className="flex-1 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-white">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
