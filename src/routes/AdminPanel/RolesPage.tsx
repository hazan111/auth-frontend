import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"

const API = "http://localhost:3000"

export default function RolesPage() {
  const [roles, setRoles] = useState<any[]>([])
  const [newRole, setNewRole] = useState("")
  const navigate = useNavigate()

  const fetchRoles = async () => {
    const res = await fetch(`${API}/roles`, { credentials: "include" })
    const data = await res.json()
    setRoles(data.roles || [])
  }

  const handleCreate = async () => {
    if (!newRole.trim()) return alert("Rol adı boş olamaz")

    const res = await fetch(`${API}/roles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: newRole }),
    })

    if (res.ok) {
      setNewRole("")
      fetchRoles()
    } else {
      alert("Rol eklenemedi")
    }
  }

  const handleDelete = async (id: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Bu rolü silmek istediğine emin misin?")) return

    const res = await fetch(`${API}/roles/${id}`, {
      method: "DELETE",
      credentials: "include",
    })

    if (res.ok) {
      fetchRoles()
    } else {
      alert("Silme başarısız")
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Roller</h2>

      <div className="flex items-center gap-2 mb-6">
        <Input
          placeholder="Yeni rol adı"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleCreate}>➕ Ekle</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardHeader className="text-lg font-medium">{role.name}</CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-muted-foreground">
                {role.permissions.length === 0 ? (
                  <p className="text-sm text-gray-400">Bu rolün henüz izni yok.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((p: any) => (
                      <Badge key={p.id}>{p.name}</Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/admin/roles/${role.id}`)}
                >
                  ✏️ Düzenle
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(role.id)}
                >
                  ❌ Sil
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
