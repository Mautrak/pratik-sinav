import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Question {
  id: number;
  text: string;
  image?: string;
  options: string[];
  correctAnswer: number;
  difficulty: number;
  subject: string;
  topic: string;
  source: string;
}

// Örnek soru verisi
const sampleQuestion: Question = {
  id: 1,
  text: "Bir sayının 3 katının 2 fazlası 14 ise, bu sayı kaçtır?",
  options: ["4", "5", "6", "7"],
  correctAnswer: 0,
  difficulty: 3.5,
  subject: "Matematik",
  topic: "Denklemler",
  source: "YKS 2022 TYT"
};

const QuestionSolver = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());

  const updateStatistics = async (isCorrect: boolean, timeTaken: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Önce mevcut istatistikleri kontrol et
      const { data: existingStats } = await supabase
        .from("statistics")
        .select("*")
        .eq("user_id", user.id)
        .eq("subject", sampleQuestion.subject)
        .single();

      if (existingStats) {
        // Mevcut istatistikleri güncelle
        await supabase
          .from("statistics")
          .update({
            correct_answers: isCorrect
              ? existingStats.correct_answers + 1
              : existingStats.correct_answers,
            wrong_answers: isCorrect
              ? existingStats.wrong_answers
              : existingStats.wrong_answers + 1,
            total_time: existingStats.total_time + timeTaken,
          })
          .eq("id", existingStats.id);
      } else {
        // Yeni istatistik kaydı oluştur
        await supabase.from("statistics").insert({
          user_id: user.id,
          subject: sampleQuestion.subject,
          correct_answers: isCorrect ? 1 : 0,
          wrong_answers: isCorrect ? 0 : 1,
          total_time: timeTaken,
        });
      }
    } catch (error) {
      console.error("Error updating statistics:", error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      toast({
        title: "Uyarı",
        description: "Lütfen bir cevap seçiniz.",
        variant: "destructive",
      });
      return;
    }

    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    setTimeSpent(timeTaken);
    setIsAnswered(true);

    const isCorrect = parseInt(selectedAnswer) === sampleQuestion.correctAnswer;
    
    await updateStatistics(isCorrect, timeTaken);
    
    toast({
      title: isCorrect ? "Doğru!" : "Yanlış!",
      description: isCorrect 
        ? `Tebrikler! Soruyu ${timeTaken} saniyede çözdünüz.`
        : "Üzülme, bir sonraki soruda başaracaksın!",
      variant: isCorrect ? "default" : "destructive",
    });
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            {sampleQuestion.subject} / {sampleQuestion.topic}
          </div>
          <div className="text-sm text-gray-600">
            Zorluk: {sampleQuestion.difficulty}/10
          </div>
        </div>

        <div className="mb-6">
          <p className="text-lg mb-4">{sampleQuestion.text}</p>
          {sampleQuestion.image && (
            <img 
              src={sampleQuestion.image} 
              alt="Soru görseli" 
              className="max-w-full h-auto mb-4 rounded-lg"
            />
          )}
        </div>

        <RadioGroup
          value={selectedAnswer}
          onValueChange={setSelectedAnswer}
          className="space-y-4"
          disabled={isAnswered}
        >
          {sampleQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 p-3 rounded-lg border ${
                isAnswered
                  ? index === sampleQuestion.correctAnswer
                    ? "bg-success/10 border-success"
                    : parseInt(selectedAnswer) === index
                    ? "bg-destructive/10 border-destructive"
                    : "border-gray-200"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <label
                htmlFor={`option-${index}`}
                className="flex-grow cursor-pointer text-base"
              >
                {option}
              </label>
            </div>
          ))}
        </RadioGroup>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Kaynak: {sampleQuestion.source}
          </div>
          {!isAnswered ? (
            <Button onClick={handleSubmit} disabled={!selectedAnswer}>
              Cevabı Kontrol Et
            </Button>
          ) : (
            <Button variant="outline" onClick={() => window.location.reload()}>
              Sonraki Soru
            </Button>
          )}
        </div>

        {isAnswered && (
          <div className="mt-4 text-sm text-gray-600">
            Çözüm süresi: {timeSpent} saniye
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionSolver;