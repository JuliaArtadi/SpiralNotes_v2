import "@/app/ui/global.css";
import SideNav from "@/app/ui/dashboard/sidenav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Spiral Notes",
    default: "Spiral Notes",
  },
  description: "Twój księżycowy notatnik",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
