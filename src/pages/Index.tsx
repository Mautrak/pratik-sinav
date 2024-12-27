import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BookOpen, Trophy, Users, Brain } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-primary-light" />,
      title: "Gerçek YKS Soruları",
      description: "Yapay zeka ile özelleştirilmiş gerçek YKS soruları ile pratik yapın",
      onClick: () => navigate("/question-solver")
    },
    {
      icon: <Trophy className="w-8 h-8 text-primary-light" />,
      title: "Arkadaşlarınla Yarış",
      description: "Arkadaşlarınla aynı anda soru çöz, rekabet et",
      onClick: () => navigate("/challenges")
    },
    {
      icon: <Users className="w-8 h-8 text-primary-light" />,
      title: "Sosyal Öğrenme",
      description: "Lider tablosunda yerini al, başarılarını paylaş",
      onClick: () => navigate("/social")
    },
    {
      icon: <Brain className="w-8 h-8 text-primary-light" />,
      title: "Kişisel Gelişim",
      description: "Konu bazlı ilerleme takibi ile güçlü ve zayıf yönlerini gör",
      onClick: () => navigate("/progress")
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="container px-4 py-16 mx-auto text-center">
        <h1 className="text-4xl font-bold text-primary mb-6 animate-fade-in">
          YKS Hazırlığında Yeni Nesil Yaklaşım
        </h1>
        <p className="text-xl text-gray-600 mb-8 animate-fade-in">
          Yapay zeka destekli soru havuzu ve sosyal öğrenme platformu
        </p>
        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate("/register")}
          >
            Hemen Başla
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            onClick={() => navigate("/login")}
          >
            Giriş Yap
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={feature.onClick}
            >
              <div className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="mt-4 text-xl font-semibold text-primary">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container px-4 py-16 mx-auto text-center">
        <h2 className="text-3xl font-bold text-primary mb-6">
          YKS Başarın İçin İlk Adımı At!
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Hemen üye ol ve öğrenme yolculuğuna başla.
        </p>
        <Button
          size="lg"
          className="bg-success hover:bg-success/90"
          onClick={() => navigate("/register")}
        >
          Ücretsiz Üye Ol
        </Button>
      </div>
    </div>
  );
};

export default Index;
