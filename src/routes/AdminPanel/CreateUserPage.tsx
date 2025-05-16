import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader } from "../../components/ui/card"
import { Label } from "../../components/ui/label"

const API = "http://localhost:3000"

export default function CreateUserPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [roleId, setRoleId] = useState<number | null>(null)
  const [roles, setRoles] = useState<any[]>([])
  const [emailVerified, setEmailVerified] = useState(true)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${API}/roles`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setRoles(data.roles || []))
  }, [])

  const handleCreate = async () => {
    if (!email || !password || !roleId) {
      setMessage("Tüm alanları doldurun")
      return
    }

    const res = await fetch(`${API}/admin/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password, roleId, emailVerified }),
    })

    const data = await res.json()

    if (!res.ok) {
      setMessage(data.message || "Kayıt başarısız")
      return
    }

    setMessage("✅ Kullanıcı başarıyla oluşturuldu")
    setEmail("")
    setPassword("")
    setRoleId(null)
    setEmailVerified(true)
    setTimeout(() => navigate("/admin/users"), 1500)
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Yeni Kullanıcı Oluştur</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              placeholder="ornek@site.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password">Şifre</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="role">Rol Seç</Label>
            <select
              id="role"
              value={roleId ?? ""}
              onChange={(e) => {
                const value = e.target.value
                setRoleId(value === "" ? null : Number(value))
              }}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="">— Rol Seç —</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="emailVerified"
              type="checkbox"
              checked={emailVerified}
              onChange={(e) => setEmailVerified(e.target.checked)}
            />
            <Label htmlFor="emailVerified">E-posta doğrulandı olarak işaretle</Label>
          </div>

          <Button onClick={handleCreate}>Kullanıcıyı Oluştur</Button>

          {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </CardContent>
      </Card>
    </div>
  )
}
