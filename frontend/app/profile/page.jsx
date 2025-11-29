"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context/AuthContext"
import { updateUsername, updateEmail, updatePassword, updateProfilePicture } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Loader2, Upload } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  // Profile Picture State
  const [previewUrl, setPreviewUrl] = useState(null)

  // Forms State
  const [usernameForm, setUsernameForm] = useState({ username: "", current_password: "" })
  const [emailForm, setEmailForm] = useState({ new_email: "", current_password: "" })
  const [passwordForm, setPasswordForm] = useState({ current_password: "", new_password: "" })

  useEffect(() => {
    if (user) {
      setUsernameForm(prev => ({ ...prev, username: user.username }))
      setEmailForm(prev => ({ ...prev, new_email: user.email }))
      setPreviewUrl(user.profile_picture)
    }
  }, [user])

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append("profile_picture", file)

    try {
      setIsLoading(true)
      const res = await updateProfilePicture(formData)
      setPreviewUrl(res.profile_picture)
      toast.success("Profile picture updated")
      // Ideally update global user context here
    } catch (error) {
      toast.error("Failed to update profile picture")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateUsername = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await updateUsername(usernameForm)
      toast.success("Username updated")
    } catch (error) {
      toast.error("Failed to update username")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateEmail = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await updateEmail(emailForm)
      toast.success("Email updated")
    } catch (error) {
      toast.error("Failed to update email")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await updatePassword(passwordForm)
      toast.success("Password updated")
      setPasswordForm({ current_password: "", new_password: "" })
    } catch (error) {
      toast.error("Failed to update password")
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Account Settings</h1>

      <div className="grid gap-8 md:grid-cols-[250px_1fr]">
        <Card className="glass-card h-fit">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                <AvatarImage src={previewUrl} />
                <AvatarFallback className="text-4xl">{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
                <Upload className="h-8 w-8" />
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass-card">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences" disabled>Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6 mt-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Username</CardTitle>
                  <CardDescription>Change your display name.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateUsername} className="space-y-4">
                    <div className="space-y-2">
                      <Label>New Username</Label>
                      <Input
                        value={usernameForm.username}
                        onChange={e => setUsernameForm({ ...usernameForm, username: e.target.value })}
                        className="glass-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Current Password</Label>
                      <Input
                        type="password"
                        value={usernameForm.current_password}
                        onChange={e => setUsernameForm({ ...usernameForm, current_password: e.target.value })}
                        className="glass-input"
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isLoading} className="glass-button">
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Email</CardTitle>
                  <CardDescription>Update your email address.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateEmail} className="space-y-4">
                    <div className="space-y-2">
                      <Label>New Email</Label>
                      <Input
                        type="email"
                        value={emailForm.new_email}
                        onChange={e => setEmailForm({ ...emailForm, new_email: e.target.value })}
                        className="glass-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Current Password</Label>
                      <Input
                        type="password"
                        value={emailForm.current_password}
                        onChange={e => setEmailForm({ ...emailForm, current_password: e.target.value })}
                        className="glass-input"
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isLoading} className="glass-button">
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Update Email
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your password.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Current Password</Label>
                      <Input
                        type="password"
                        value={passwordForm.current_password}
                        onChange={e => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                        className="glass-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <Input
                        type="password"
                        value={passwordForm.new_password}
                        onChange={e => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                        className="glass-input"
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isLoading} className="glass-button">
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Change Password
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
