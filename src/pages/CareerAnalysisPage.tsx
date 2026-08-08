import { useMemo, useState } from 'react';
import { ArrowRight, BrainCircuit, BarChart3, Target } from 'lucide-react';
import { type UserProfile } from '../data/careerGraphData';
import { calculateRoleRecommendations, getNextSkillRecommendation, getRecommendationWhy, getSkillGap, getProjectRecommendations } from '../lib/careerGraph';

type CareerAnalysisPageProps = {
  profile: UserProfile;
  onUpdateSkills: (skills: string[]) => void;
};

const availableSkills = [
  'Python', 'SQL', 'React', 'Docker', 'Git', 'JavaScript', 'TypeScript', 'Node.js', 'AWS', 'MongoDB', 'Redis', 'Kubernetes', 'FastAPI', 'System Design', 'Machine Learning'
];

export default function CareerAnalysisPage({ profile, onUpdateSkills }: CareerAnalysisPageProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(profile.skills);
  const [targetRole, setTargetRole] = useState(profile.targetRoles[0] ?? 'Backend Engineer');

  const recommendations = useMemo(() => calculateRoleRecommendations(selectedSkills), [selectedSkills]);
  const skillGap = useMemo(() => getSkillGap(targetRole, selectedSkills), [selectedSkills, targetRole]);
  const nextSkill = useMemo(() => getNextSkillRecommendation(selectedSkills, targetRole), [selectedSkills, targetRole]);
  const projectRecommendations = useMemo(() => getProjectRecommendations(targetRole), [targetRole]);
  const reasoning = useMemo(() => getRecommendationWhy(selectedSkills, targetRole), [selectedSkills, targetRole]);

  const toggleSkill = (skill: string) => {
    const next = selectedSkills.includes(skill)
      ? selectedSkills.filter((entry) => entry !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(next);
    onUpdateSkills(next);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Career analysis</p>
            <h1 className="mt-2 text-3xl font-black text-white">What can I become?</h1>
          </div>
          <select
            value={targetRole}
            onChange={(event) => setTargetRole(event.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
          >
            {['Backend Engineer', 'Full Stack Engineer', 'Cloud Engineer', 'AI Engineer', 'Software Engineer'].map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center gap-2 text-cyan-300">
            <BrainCircuit className="h-5 w-5" />
            <h2 className="text-xl font-semibold text-white">My skills</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${selectedSkills.includes(skill) ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-cyan-500'}`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center gap-2 text-cyan-300">
            <BarChart3 className="h-5 w-5" />
            <h2 className="text-xl font-semibold text-white">Role matching</h2>
          </div>
          <div className="space-y-4">
            {recommendations.slice(0, 4).map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className="text-xl font-black text-cyan-300">{item.score}%</div>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ width: `${item.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center gap-2 text-cyan-300">
            <Target className="h-5 w-5" />
            <h2 className="text-xl font-semibold text-white">Skill gap for {targetRole}</h2>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="mb-3 text-sm text-slate-400">Readiness: <span className="text-2xl font-black text-white">{skillGap.readiness}%</span></div>
            <div className="mb-4 flex items-center gap-2 text-sm text-slate-300">
              <span className="text-emerald-300">Matched:</span> {skillGap.matchedSkills.join(', ') || 'None yet'}
            </div>
            <div className="space-y-2">
              {skillGap.missingSkills.length ? (
                skillGap.missingSkills.map((skill) => (
                  <div key={skill} className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
                    {skill}
                  </div>
                ))
              ) : (
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">You already match the full role profile.</div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center gap-2 text-cyan-300">
            <ArrowRight className="h-5 w-5" />
            <h2 className="text-xl font-semibold text-white">Recommended next skill</h2>
          </div>
          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4">
            <div className="text-sm text-cyan-300">Best next move</div>
            <div className="mt-2 text-3xl font-black text-white">{nextSkill?.skill.name}</div>
            <p className="mt-3 text-slate-300">
              {nextSkill?.skill.name} is required by {nextSkill?.score ?? 0} connected role pathways and expands your opportunities across the graph.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="text-lg font-semibold text-white">Why this is recommended</div>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {reasoning.matched.map((skill) => (
                <li key={skill} className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-emerald-100">✓ {skill}</li>
              ))}
              {reasoning.missing.map((skill) => (
                <li key={skill} className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-amber-100">• {skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-5 text-xl font-semibold text-white">Suggested projects</div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {projectRecommendations.map((project) => (
            <div key={project.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="text-lg font-semibold text-white">{project.name}</div>
              <p className="mt-2 text-sm text-slate-400">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span key={tech} className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-200">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
