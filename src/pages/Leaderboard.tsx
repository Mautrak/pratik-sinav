import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Medal } from "lucide-react";

interface Profile {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
}

interface StatisticsRow {
  correct_answers: number | null;
  wrong_answers: number | null;
  profile: Profile;
}

interface LeaderboardEntry {
  profile: Profile;
  correct_answers: number;
  total_questions: number;
  accuracy: number;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from("statistics")
        .select(`
          correct_answers,
          wrong_answers,
          profile:profiles(
            username,
            full_name,
            avatar_url
          )
        `)
        .order("correct_answers", { ascending: false })
        .limit(10);

      if (error) throw error;

      // Type assertion for the data array
      const typedData = (data || []) as StatisticsRow[];

      // Process the data with proper typing
      const processedEntries = Object.values(
        typedData.reduce<Record<string, LeaderboardEntry>>((acc, curr) => {
          const username = curr.profile.username || "";
          if (!acc[username]) {
            acc[username] = {
              profile: curr.profile,
              correct_answers: 0,
              total_questions: 0,
              accuracy: 0,
            };
          }
          acc[username].correct_answers += curr.correct_answers || 0;
          acc[username].total_questions +=
            (curr.correct_answers || 0) + (curr.wrong_answers || 0);
          acc[username].accuracy =
            acc[username].total_questions > 0
              ? (acc[username].correct_answers / acc[username].total_questions) *
                100
              : 0;
          return acc;
        }, {})
      );

      setLeaderboard(
        processedEntries.sort((a, b) => b.correct_answers - a.correct_answers)
      );
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalColor = (index: number) => {
    switch (index) {
      case 0:
        return "text-yellow-500";
      case 1:
        return "text-gray-400";
      case 2:
        return "text-amber-600";
      default:
        return "text-gray-300";
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Liderlik Tablosu</CardTitle>
          <CardDescription>En başarılı öğrenciler</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Kullanıcı</TableHead>
                <TableHead>Doğru Sayısı</TableHead>
                <TableHead>Başarı Oranı</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((entry, index) => (
                <TableRow key={entry.profile.username}>
                  <TableCell>
                    {index < 3 ? (
                      <Medal className={`h-5 w-5 ${getMedalColor(index)}`} />
                    ) : (
                      index + 1
                    )}
                  </TableCell>
                  <TableCell className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={entry.profile.avatar_url || undefined} />
                      <AvatarFallback>
                        {entry.profile.username?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{entry.profile.username}</p>
                      <p className="text-sm text-muted-foreground">
                        {entry.profile.full_name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{entry.correct_answers}</TableCell>
                  <TableCell>{entry.accuracy.toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;