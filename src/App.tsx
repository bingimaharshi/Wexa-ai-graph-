import React, { useState } from 'react';
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Briefcase, Compass, Database, LayoutDashboard, Network, Search, UserRound } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import CareerRolesPage from './pages/CareerRolesPage';
import SkillExplorerPage from './pages/SkillExplorerPage';
import CompanyExplorerPage from './pages/CompanyExplorerPage';
import GraphExplorerPage from './pages/GraphExplorerPage';
import CareerAnalysisPage from './pages/CareerAnalysisPage';
import ProfilePage from './pages/ProfilePage';
import { initialUserProfile, type UserProfile } from './data/careerGraphData';
import { searchCatalog } from './lib/careerGraph';

function CareerLayout({ children }: { children: React.ReactNode }) {
  const [searchText, setSearchText] = useState('');
  const results = searchText.trim() ? searchCatalog(searchText) : [];

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Career Explorer', href: '/roles', icon: Briefcase },
    { label: 'Skills', href: '/skills', icon: Compass },
    { label: 'Companies', href: '/companies', icon: Database },
    { label: 'Graph Explorer', href: '/graph', icon: Network },
    { label: 'My Profile', href: '/profile', icon: UserRound },
    { label: 'Career Analysis', href: '/analyze', icon: Compass },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <NavLink to="/" className="flex items-center gap-3 text-xl font-black tracking-tight text-white">
            <span className="rounded-xl bg-cyan-500 px-2 py-1 text-sm text-slate-950">CG</span>
            CareerGraph AI
          </NavLink>

          <div className="relative hidden min-w-[300px] md:block">
            <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-300">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search anything..."
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
            </div>

            {results.length > 0 && (
              <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-20 rounded-2xl border border-slate-700 bg-slate-950 p-2 shadow-2xl">
                {results.map((item) => (
                  <button
                    key={`${item.type}-${item.value}`}
                    type="button"
                    onClick={() => setSearchText('')}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-900"
                  >
                    <span>{item.value}</span>
                    <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      {item.type}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <nav className="hidden items-center gap-3 lg:flex">
            {navItems.map(({ label, href, icon: Icon }) => (
              <NavLink
                key={href}
                to={href}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                    isActive ? 'border-cyan-500 bg-cyan-500/10 text-cyan-200' : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

function App() {
  const [profile, setProfile] = useState<UserProfile>(initialUserProfile);

  const updateSkills = (skills: string[]) => {
    setProfile((current) => ({ ...current, skills }));
  };

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0f172a',
            color: '#e2e8f0',
            borderRadius: '12px',
            padding: '12px 16px',
          },
        }}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            <CareerLayout>
              <DashboardPage profile={profile} />
            </CareerLayout>
          }
        />
        <Route
          path="/roles"
          element={
            <CareerLayout>
              <CareerRolesPage profile={profile} />
            </CareerLayout>
          }
        />
        <Route
          path="/skills"
          element={
            <CareerLayout>
              <SkillExplorerPage profile={profile} />
            </CareerLayout>
          }
        />
        <Route
          path="/companies"
          element={
            <CareerLayout>
              <CompanyExplorerPage profile={profile} />
            </CareerLayout>
          }
        />
        <Route
          path="/graph"
          element={
            <CareerLayout>
              <GraphExplorerPage />
            </CareerLayout>
          }
        />
        <Route
          path="/analyze"
          element={
            <CareerLayout>
              <CareerAnalysisPage profile={profile} onUpdateSkills={updateSkills} />
            </CareerLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <CareerLayout>
              <ProfilePage profile={profile} onUpdateProfile={setProfile} />
            </CareerLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;