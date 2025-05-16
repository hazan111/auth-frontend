import React, { useEffect, useState } from "react"
import { Button } from "../../components/ui/button"
import { Edit, Trash, MailCheck, Undo2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "../../components/ui/card"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "../../components/ui/table"

const API = "http://localhost:3000"

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [roles, setRoles] = useState<any[]>([])
  const [selectedRoles, setSelectedRoles] = useState<{ [userId: number]: number }>({})
  const [filter, setFilter] = useState<"all" | "active" | "deleted">("active")

  const fetchData = async () => {
    const res = await fetch(`${API}/admin/users`, { credentials: "include" })
    const data = await res.json()
    setUsers(data.users || [])

    const roleRes = await fetch(`${API}/roles`, { credentials: "include" })
    const roleData = await roleRes.json()
    setRoles(roleData.roles || [])
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filteredUsers = users.filter((u) => {
    if (filter === "all") return true
    if (filter === "active") return !u.deletedAt
    if (filter === "deleted") return !!u.deletedAt
    return true // fallback olarak true döndür
  })


  const updateUserRole = async (userId: number) => {
    const roleId = selectedRoles[userId]
    if (!roleId) return alert("Lütfen bir rol seçin.")
    const res = await fetch(`${API}/admin/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ roleId }),
    })
    res.ok ? fetchData() : alert("Rol güncellenemedi")
  }

  const verifyEmail = async (userId: number) => {
    const res = await fetch(`${API}/admin/users/${userId}/verify`, {
      method: "PUT",
      credentials: "include",
    })
    res.ok ? fetchData() : alert("Doğrulama başarısız")
  }

  const deleteUser = async (userId: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Bu kullanıcıyı silmek istiyor musun?")) return
    const res = await fetch(`${API}/admin/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
    })
    res.ok ? fetchData() : alert("Silme başarısız")
  }

  const restoreUser = async (userId: number) => {
    const res = await fetch(`${API}/admin/users/${userId}/restore`, {
      method: "PUT",
      credentials: "include",
    })
    res.ok ? fetchData() : alert("Geri alma başarısız")
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Kullanıcılar</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "all" | "active" | "deleted")}
            className="w-60 border px-3 py-2 rounded text-sm"
          >
            <option value="active">Aktif Kullanıcılar</option>
            <option value="deleted">Silinmiş Kullanıcılar</option>
            <option value="all">Tüm Kullanıcılar</option>
          </select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>E-posta</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Doğrulama</TableHead>
                <TableHead>Silinme</TableHead>
                <TableHead>İşlem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role?.name}</TableCell>
                  <TableCell>{u.emailVerified ? "✅" : "❌"}</TableCell>
                  <TableCell>{u.deletedAt ? "🗑️" : "—"}</TableCell>
                  <TableCell className="flex flex-wrap gap-2">
                    <select
                      className="border rounded px-2 py-1 text-sm"
                      value={selectedRoles[u.id] ?? ""}
                      onChange={(e) =>
                        setSelectedRoles({ ...selectedRoles, [u.id]: Number(e.target.value) })
                      }
                    >
                      <option value="">Rol Seç</option>
                      {roles.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>

                    <Button size="sm" variant="outline" onClick={() => updateUserRole(u.id)}>
                      <Edit className="w-4 h-4 mr-1" /> Güncelle
                    </Button>

                    <Button size="sm" variant="secondary" onClick={() => verifyEmail(u.id)}>
                      <MailCheck className="w-4 h-4 mr-1" /> Doğrula
                    </Button>

                    {u.deletedAt ? (
                      <Button size="sm" variant="default" onClick={() => restoreUser(u.id)}>
                        <Undo2 className="w-4 h-4 mr-1" /> Geri Al
                      </Button>
                    ) : (
                      <Button size="sm" variant="destructive" onClick={() => deleteUser(u.id)}>
                        <Trash className="w-4 h-4 mr-1" /> Sil
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
