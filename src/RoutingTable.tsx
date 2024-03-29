import * as React from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { IsAuth, GetUser } from "./auth";

import Homepage from "./pages/Homepage";
import PlayersPage from "./pages/PlayersPage";
import PlayerPage from "./pages/PlayerPage";
import TeamsPage from "./pages/TeamsPage";
import TeamPage from "./pages/TeamPage";
import { usePageTracking } from "./reportWebVitals";
import AdminDirect from "./pages/AdminDirect";
import MatchupPage from "./pages/Matchup";
import GroupsPage from "./pages/GroupsPage";

export default function RoutingTable() {

  usePageTracking();
  return (
    <AuthProvider>
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/team"
            element={
              <RequireAuth>
                <TeamPage />
              </RequireAuth>
            }
          />
          <Route
            path="/admindirect"
            element={
              <RequireAuth>
                <AdminDirect />
              </RequireAuth>
            }
          />
          <Route path="/teams/*" element={<TeamsPage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/player/*" element={<PlayerPage />} />
          <Route path="/oauth-callback" element={<AuthCallback />} />
          <Route path="/matchup" element={<MatchupPage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}


interface AuthContextType {
  user: any;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);


  if (IsAuth() && user == null)
  {
      GetUser((user: any) => {
        setUser(user);
      });
  }

  let value = { user };

  return (
  <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  return React.useContext(AuthContext);
}



function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

function NotFound()
{
    return <div className="min-w-fit min-h-screen bg-fixed bg-gradient-to-b from-stone-100 to-stone-500 dark:from-stone-500 dark:to-stone-700 "><h3 className="font-medium text-stone-500 dark:text-stone-300">Error 404: Page not found</h3></div>;
}

function AuthCallback()
{
    return <div className="min-w-fit min-h-screen bg-fixed bg-gradient-to-b from-stone-100 to-stone-500 dark:from-stone-500 dark:to-stone-700 "><h3 className="font-medium text-stone-500 dark:text-stone-300">Loading...</h3></div>
}
