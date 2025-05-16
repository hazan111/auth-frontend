import React from "react"
import { useNavigate, Outlet } from "react-router-dom"
import { Button } from "../../components/ui/button"

export default function AdminLayout() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 text-zinc-100 flex flex-col gap-1 p-6 shadow-md">
        <h2 className="text-xl font-bold text-white mb-6">🛠 Admin Panel</h2>

        <NavButton label="🏠 Dashboard" onClick={() => navigate("/admin")} />
        <NavButton label="👥 Kullanıcılar" onClick={() => navigate("/admin/users")} />
        <NavButton label="🛡️ Roller" onClick={() => navigate("/admin/roles")} />
        <NavButton label="✏️ Rol Düzenle" onClick={() => navigate("/admin/roles/edit")} />
        <NavButton label="➕ Kullanıcı Ekle" onClick={() => navigate("/admin/users/create")} />
        <NavButton label="🧩 İzinler" onClick={() => navigate("/admin/permissions")} />
        <NavButton label="🧩 Profilim" onClick={() => navigate('/profile')} />

        <div className="mt-auto pt-4 border-t border-zinc-700">
          <NavButton
            label="⬅️ Siteye Dön"
            onClick={() => navigate("/")}
            className="text-red-400 hover:text-white"
          />
        </div>
      </aside>

      {/* İçerik */}
      <main className="flex-1 p-6 bg-white text-zinc-800">
        <Outlet />
      </main>
    </div>
  )
}

// 🔘 Sidebar buton bileşeni
function NavButton({
  label,
  onClick,
  className = "",
}: {
  label: string
  onClick: () => void
  className?: string
}) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`w-full justify-start text-left px-4 py-2 rounded-md transition-all duration-200 hover:bg-zinc-800 ${className}`}
    >
      {label}
    </Button>
  )
}
