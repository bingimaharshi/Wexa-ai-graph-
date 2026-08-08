import { useState } from 'react';
import { Save, UserCircle2 } from 'lucide-react';
import { type UserProfile } from '../data/careerGraphData';

const experienceLevels = ['Student', 'Fresher', 'Junior', 'Mid-Level', 'Senior', 'Lead'];
const skillOptions = ['Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL', 'Docker', 'AWS', 'Redis', 'Kubernetes', 'Git', 'FastAPI', 'System Design'];

type ProfilePageProps = {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
};

export default function ProfilePage({ profile, onUpdateProfile }: ProfilePageProps) {
  const [form, setForm] = useState<UserProfile>(profile);

  const handleSave = () => {
    onUpdateProfile(form);
  };

  const toggleSkill = (skill: string) => {
    setForm((current) => {
      const hasSkill = current.skills.includes(skill);
      return {
        ...current,
        skills: hasSkill ? current.skills.filter((entry) => entry !== skill) : [...current.skills, skill],
      };
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-6 flex items-center gap-3">
          <UserCircle2 className="h-6 w-6 text-cyan-300" />
          <h1 className="text-3xl font-black text-white">My profile</h1>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm text-slate-400">Name</span>
            <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-slate-400">Location</span>
            <input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-slate-400">Education</span>
            <input value={form.education} onChange={(event) => setForm({ ...form, education: event.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-slate-400">Experience level</span>
            <select value={form.experienceLevel} onChange={(event) => setForm({ ...form, experienceLevel: event.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white">
              {experienceLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </label>

          <button type="button" onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
            <Save className="h-4 w-4" />
            Save profile
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-2xl font-bold text-white">Skills</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {skillOptions.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              className={`rounded-full border px-3 py-2 text-sm transition ${form.skills.includes(skill) ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-cyan-500'}`}
            >
              {skill}
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="text-lg font-semibold text-white">Current profile summary</div>
          <div className="mt-3 space-y-2 text-sm text-slate-300">
            <div><span className="text-slate-400">Name:</span> {form.name}</div>
            <div><span className="text-slate-400">Experience:</span> {form.experienceLevel}</div>
            <div><span className="text-slate-400">Location:</span> {form.location}</div>
            <div><span className="text-slate-400">Skills:</span> {form.skills.join(', ')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
