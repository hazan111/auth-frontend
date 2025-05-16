import React, { useEffect, useState } from "react"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Card, CardHeader, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"

const API = "http://localhost:3000"

interface Permission {
  id: number
  name: string
}

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [newPermission, setNewPermission] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const fetchPermissions = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/permissions`, { credentials: "include" })
      const data = await res.json()
      setPermissions(data.permissions || [])
    } catch (err) {
      console.error("İzinler alınamadı", err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!newPermission.trim()) return setMessage("İzin adı boş olamaz")

    const res = await fetch(`${API}/permissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: newPermission }),
    })

    const data = await res.json()

    if (res.ok) {
      setNewPermission("")
      setMessage("✅ İzin eklendi")
      fetchPermissions()
    } else {
      setMessage(data.message || "İzin eklenemedi")
    }
  }

  const handleDelete = async (id: number) => {
    const onay = window.confirm("Bu izni silmek istiyor musun?")
    if (!onay) return

    const res = await fetch(`${API}/permissions/${id}`, {
      method: "DELETE",
      credentials: "include",
    })

    if (res.ok) {
      setMessage("✅ Silindi")
      fetchPermissions()
    } else {
      setMessage("❌ Silme başarısız")
    }
  }

  useEffect(() => {
    fetchPermissions()
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <h2 className="text-xl font-bold text-zinc-800">🧩 İzin Yönetimi</h2>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex gap-3 items-center">
            <Input
              placeholder="Yeni izin adı (örnek: edit_user)"
              value={newPermission}
              onChange={(e) => setNewPermission(e.target.value)}
              className="max-w-sm"
            />
            <Button onClick={handleCreate}>➕ Ekle</Button>
          </div>

          {message && (
            <p className="text-sm text-muted-foreground transition">{message}</p>
          )}

          <div className="flex flex-wrap gap-3 mt-4">
            {loading ? (
              <p className="text-sm text-muted-foreground">Yükleniyor...</p>
            ) : permissions.length === 0 ? (
              <p className="text-sm text-muted-foreground">Henüz hiç izin tanımlanmamış.</p>
            ) : (
              permissions.map((perm) => (
                <Badge
                  key={perm.id}
                  className="rounded-full px-3 py-1 flex items-center gap-2 transition-all hover:scale-[1.03] hover:bg-zinc-200"
                >
                  {perm.name}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-4 w-4 text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(perm.id)}
                  >
                    ❌
                  </Button>
                </Badge>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
