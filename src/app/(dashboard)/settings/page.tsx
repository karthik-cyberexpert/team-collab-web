"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

        <Tabs defaultValue="account" className="space-y-4">
            <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="display">Display</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
                <Card>
                    <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                        <CardDescription>Update your account details here.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label>Username</Label>
                                <Input defaultValue="johndoe_dev" />
                            </div>
                             <div className="space-y-2">
                                <Label>Email</Label>
                                <Input defaultValue="john@example.com" />
                            </div>
                        </div>
                        <Button>Save Changes</Button>
                    </CardContent>
                </Card>
            </TabsContent>

             <TabsContent value="profile">
                <Card>
                    <CardHeader>
                        <CardTitle>Public Profile</CardTitle>
                        <CardDescription>Manage how others see you.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Bio</Label>
                             <textarea 
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                defaultValue="Full-stack developer with a passion for building scalable web applications."
                             />
                        </div>
                        <div className="space-y-2">
                            <Label>Website</Label>
                            <Input defaultValue="https://johndoe.com" />
                        </div>
                         <Button>Update Profile</Button>
                    </CardContent>
                </Card>
            </TabsContent>
            
             <TabsContent value="notifications">
                 <Card>
                     <CardHeader>
                         <CardTitle>Notifications</CardTitle>
                     </CardHeader>
                     <CardContent>
                         <div className="space-y-4">
                             <div className="flex items-center justify-between">
                                 <Label>Email Notifications</Label>
                                 <input type="checkbox" className="toggle accent-primary" defaultChecked />
                             </div>
                              <div className="flex items-center justify-between">
                                 <Label>Push Notifications</Label>
                                 <input type="checkbox" className="toggle accent-primary" defaultChecked />
                             </div>
                         </div>
                     </CardContent>
                 </Card>
             </TabsContent>
        </Tabs>
    </div>
  )
}
