import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-primary text-center mb-6">
          Hezarfen'e Hoş Geldiniz
        </h1>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#0EA5E9',
                  brandAccent: '#0284C7',
                }
              }
            }
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: "E-posta",
                password_label: "Şifre",
                button_label: "Giriş Yap",
                social_provider_text: "{{provider}} ile devam et",
              },
              sign_up: {
                email_label: "E-posta",
                password_label: "Şifre",
                button_label: "Kayıt Ol",
                social_provider_text: "{{provider}} ile devam et",
              },
            }
          }}
          providers={["google"]}
        />
      </div>
    </div>
  );
};

export default Login;