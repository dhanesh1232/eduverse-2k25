"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/* ───────────────────────────
   PAGE
─────────────────────────── */

export default function SettingsPage() {
  return (
    <section className="space-y-4">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage institution identity and administrative preferences
        </p>
      </div>

      {/* INSTITUTION DETAILS */}
      <Card>
        <CardHeader>
          <CardTitle>Institution Details</CardTitle>
          <CardDescription>
            Basic identity of the school or college
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Institution Name</Label>
            <Input defaultValue="EduVerse Public School" />
          </div>

          <div className="space-y-1.5">
            <Label>Institution Code</Label>
            <Input defaultValue="EDU-2025" disabled />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label>Logo</Label>
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback>EV</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                Upload Logo
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Recommended size: 256×256 PNG or SVG
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ACADEMIC YEAR */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Year</CardTitle>
          <CardDescription>Define the active academic session</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Start Year</Label>
            <Input defaultValue="2025" />
          </div>

          <div className="space-y-1.5">
            <Label>End Year</Label>
            <Input defaultValue="2026" />
          </div>

          <div className="sm:col-span-2">
            <p className="text-xs text-muted-foreground">
              This academic year will apply to attendance, exams, and reports.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ADMIN PROFILE */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Profile</CardTitle>
          <CardDescription>
            Primary administrator account details
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Admin Name</Label>
            <Input defaultValue="Suresh Kumar" />
          </div>

          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input defaultValue="admin@eduverse.edu" />
          </div>

          <div className="space-y-1.5">
            <Label>Phone</Label>
            <Input defaultValue="9876543210" />
          </div>

          <div className="space-y-1.5">
            <Label>Password</Label>
            <Input type="password" value="********" disabled />
          </div>
        </CardContent>
      </Card>

      {/* ACTIONS */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </section>
  );
}
