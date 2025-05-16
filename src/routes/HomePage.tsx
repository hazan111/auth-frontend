import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center justify-center">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 sm:text-5xl">
           <span className="text-blue-600">AUTH SYSTEMS</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 sm:text-xl">
           Kimlik doğrulama ve yetkilendirme API sistemi.
        </p>
      </header>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
           Giriş Yap
        </button>
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg shadow-md hover:bg-gray-200 transition-all"
        >
          Kayıt Ol
        </button>
      </div>

      {/* Features Section */}
      <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-5xl">
        <FeatureCard
          title="Kullanıcı Yönetimi"
          description="Etkili kullanıcı yönetimi ve izleme."
          icon="👥"
        />
        <FeatureCard
          title="Rol Tabanlı Erişim Kontrolü"
          description="Kullanıcıların erişim haklarını yönetme."
          icon="🛡️"
        />
        <FeatureCard
          title="Güvenli Kimlik Doğrulama"
          description="Güvenli kimlik doğrulama ve yetkilendirme."
          icon="🔒"
        />
      </section>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}
