import React from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader } from "../../components/ui/card"
import { Button } from "../../components/ui/button"

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-zinc-800">🎛️ Admin Panel</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card
          onClick={() => navigate("/admin/users")}
          className="hover:shadow-lg transition-all duration-200 cursor-pointer rounded-xl"
        >
          <CardHeader className="text-lg font-semibold text-zinc-800">
            👥 Kullanıcıları Yönet
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Kullanıcıları görüntüle, rollerini güncelle veya sil.
          </CardContent>
        </Card>

        <Card
          onClick={() => navigate("/admin/roles")}
          className="hover:shadow-lg transition-all duration-200 cursor-pointer rounded-xl"
        >
          <CardHeader className="text-lg font-semibold text-zinc-800">
            🛡️ Roller & Yetkiler
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Yeni rol oluştur, izinleri düzenle, sistem yönetimini yap.
          </CardContent>
        </Card>
      </div>

      <div className="pt-4">
        <Button variant="secondary" onClick={() => navigate("/")}>
          ⬅️ Siteye Dön
        </Button>
      </div>
    </div>
  )
}
