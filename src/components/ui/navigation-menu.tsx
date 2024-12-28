import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Users,
  Trophy,
  LogOut,
  UserCircle,
  BookOpen,
  Home,
} from "lucide-react";

export function NavigationMenu() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-bold">
              YKS Hazırlık
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Ana Sayfa
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/categories">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Dersler
                </Link>
              </Button>
              {user && (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/statistics">
                      <BarChart className="h-4 w-4 mr-2" />
                      İstatistikler
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/friends">
                      <Users className="h-4 w-4 mr-2" />
                      Arkadaşlar
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/leaderboard">
                      <Trophy className="h-4 w-4 mr-2" />
                      Liderlik
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/profile">
                    <UserCircle className="h-4 w-4 mr-2" />
                    Profil
                  </Link>
                </Button>
                <Button variant="ghost" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Çıkış
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link to="/login">Giriş Yap</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}