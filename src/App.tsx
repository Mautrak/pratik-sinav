import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import Categories from "@/pages/Categories";
import QuestionSolver from "@/pages/QuestionSolver";
import Statistics from "@/pages/Statistics";
import Friends from "@/pages/Friends";
import Leaderboard from "@/pages/Leaderboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <NavigationMenu />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/question-solver" element={<QuestionSolver />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;