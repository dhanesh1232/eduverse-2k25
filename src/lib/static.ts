import {
  BarChart2,
  CalendarCheck,
  LayoutDashboard,
  Megaphone,
  NotebookIcon,
  Settings,
  Users2,
} from "lucide-react";
export const adminLinks = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Users", url: "/admin/users", icon: Users2 },
  { title: "Classes / Courses", url: "/admin/classes", icon: NotebookIcon },
  { title: "Attendance", url: "/admin/attendance", icon: CalendarCheck },
  { title: "Announcements", url: "/admin/announcements", icon: Megaphone },
  { title: "Reports", url: "/admin/reports", icon: BarChart2 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export const teacherLinks = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "My Classes", url: "/teacher/classes", icon: NotebookIcon },
  { title: "Attendance", url: "/teacher/attendance", icon: CalendarCheck },
  { title: "Assignments", url: "/teacher/assignments", icon: NotebookIcon },
  { title: "Exams", url: "/teacher/exams", icon: BarChart2 },
  { title: "Notices", url: "/teacher/notices", icon: Megaphone },
  { title: "Profile", url: "/teacher/profile", icon: Settings },
];

export const studentLinks = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "My Courses", url: "/student/courses", icon: NotebookIcon },
  { title: "Assignments", url: "/student/assignments", icon: NotebookIcon },
  { title: "Exams & Results", url: "/student/exams", icon: BarChart2 },
  { title: "Attendance", url: "/student/attendance", icon: CalendarCheck },
  { title: "Notices", url: "/student/notices", icon: Megaphone },
  { title: "Profile", url: "/student/profile", icon: Settings },
];

export const parentLinks = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Attendance", url: "/parent/attendance", icon: CalendarCheck },
  { title: "Performance", url: "/parent/performance", icon: BarChart2 },
  { title: "Assignments", url: "/parent/assignments", icon: NotebookIcon },
  { title: "Notices", url: "/parent/notices", icon: Megaphone },
  { title: "Profile", url: "/parent/profile", icon: Settings },
];
