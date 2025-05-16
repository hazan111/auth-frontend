import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"

const API = "http://localhost:3000"

export default function RoleEditPage() {
  const { id } = useParams()
  const [role, setRole] = useState<any>(null)
  const [allPermissions, setAllPermissions] = useState<any[]>([])

  const fetchData = useCallback(async () => {
    const res = await fetch(`${API}/roles/${id}`, { credentials: "include" })
    const data = await res.json()
    setRole(data.role)

    const permRes = await fetch(`${API}/permissions`, { credentials: "include" })
    const permData = await permRes.json()
    setAllPermissions(permData.permissions || [])
  }, [id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleAddPermission = async (permId: number) => {
    await fetch(`${API}/roles/${id}/permissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ permissionIds: [permId] }),
    })
    fetchData()
  }

  const handleRemovePermission = async (permId: number) => {
    await fetch(`${API}/roles/${id}/permissions/${permId}`, {
      method: "DELETE",
      credentials: "include",
    })
    fetchData()
  }

  if (!role) return <p className="p-6">Yükleniyor...</p>

  const ownedIds = role.permissions.map((p: any) => p.id)
  const addable = allPermissions.filter((p) => !ownedIds.includes(p.id))

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">{role.name} Rolü</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">🎯 Sahip Olduğu İzinler:</h4>
            <div className="flex flex-wrap gap-2">
              {role.permissions.length === 0 && <p className="text-muted-foreground">Bu rol henüz bir izne sahip değil.</p>}
              {role.permissions.map((perm: any) => (
                <Badge key={perm.id} className="flex items-center gap-1">
                  {perm.name}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-5 w-5 p-0 ml-1"
                    onClick={() => handleRemovePermission(perm.id)}
                  >
                    ❌
                  </Button>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">➕ Eklenebilir İzinler:</h4>
            <div className="flex flex-wrap gap-2">
              {addable.length === 0 && <p className="text-muted-foreground">Eklenebilecek yeni izin yok.</p>}
              {addable.map((perm) => (
                <Button
                  key={perm.id}
                  size="sm"
                  variant="secondary"
                  onClick={() => handleAddPermission(perm.id)}
                >
                  {perm.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
