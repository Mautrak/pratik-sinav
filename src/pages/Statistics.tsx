import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface Statistic {
  subject: string;
  correct_answers: number;
  wrong_answers: number;
  total_time: number;
}

const Statistics = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("statistics")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;

      setStatistics(data || []);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      toast({
        variant: "destructive",
        title: "Hata",
        description: "İstatistikler yüklenirken bir hata oluştu.",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalStats = () => {
    return statistics.reduce(
      (acc, stat) => ({
        correct: acc.correct + (stat.correct_answers || 0),
        wrong: acc.wrong + (stat.wrong_answers || 0),
        time: acc.time + (stat.total_time || 0),
      }),
      { correct: 0, wrong: 0, time: 0 }
    );
  };

  const getAchievements = () => {
    const totals = calculateTotalStats();
    const achievements = [];

    if (totals.correct >= 100) {
      achievements.push({ title: "Yüz Çözen", description: "100 doğru cevap" });
    }
    if (totals.correct >= 50) {
      achievements.push({ title: "Elli Çözen", description: "50 doğru cevap" });
    }
    if (totals.correct >= 10) {
      achievements.push({ title: "On Çözen", description: "10 doğru cevap" });
    }

    return achievements;
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-[300px]" />
      </div>
    );
  }

  const totals = calculateTotalStats();
  const achievements = getAchievements();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">İstatistiklerim</h1>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Toplam Doğru</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {totals.correct}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Toplam Yanlış</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{totals.wrong}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Toplam Süre</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {Math.round(totals.time / 60)} dk
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performans</TabsTrigger>
          <TabsTrigger value="progress">İlerleme</TabsTrigger>
          <TabsTrigger value="achievements">Başarılar</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Ders Bazında Performans</CardTitle>
              <CardDescription>
                Her ders için doğru ve yanlış cevap dağılımı
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statistics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="correct_answers" name="Doğru" fill="#22c55e" />
                    <Bar dataKey="wrong_answers" name="Yanlış" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Zaman Bazlı İlerleme</CardTitle>
              <CardDescription>
                Doğru cevap sayısının zamana göre değişimi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={statistics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="correct_answers"
                      name="Doğru"
                      stroke="#22c55e"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Başarılar</CardTitle>
              <CardDescription>
                Kazandığınız rozetler ve başarılar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <Badge variant="secondary">{achievement.title}</Badge>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;