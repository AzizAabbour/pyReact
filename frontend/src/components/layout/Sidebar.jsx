import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Sparkles, 
  History, 
  Bookmark, 
  Settings, 
  TrendingUp, 
  LogOut, 
  FolderHeart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export function Sidebar({ collapsed, setCollapsed }) {
  const toggleSidebar = () => setCollapsed(!collapsed);

  const menuItems = [
    { name: 'Prompt Generator', path: '/generator', icon: Sparkles },
    { name: 'My Prompts', path: '/dashboard', icon: FolderHeart, end: true },
    { name: 'Favorites', path: '/dashboard/favorites', icon: Bookmark },
    { name: 'History', path: '/dashboard/history', icon: History },
    { name: 'Analytics', path: '/dashboard/analytics', icon: TrendingUp },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside 
      className={`h-[calc(100vh-4rem)] border-r border-border-color bg-bg-secondary flex flex-col justify-between transition-all duration-300 relative ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1.5 p-4 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400 border border-primary-500/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-100 dark:hover:bg-surface-850'
              }`
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="truncate">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse Toggle Trigger */}
      <div className="p-4 border-t border-border-color/50 flex items-center justify-between">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl bg-surface-100 dark:bg-surface-850 hover:bg-surface-200 dark:hover:bg-surface-800 text-text-secondary hover:text-text-primary transition-all duration-200 cursor-pointer w-full flex items-center justify-center"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : (
            <div className="flex items-center gap-2 text-xs font-semibold">
              <ChevronLeft className="w-4 h-4" />
              Collapse Sidebar
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
