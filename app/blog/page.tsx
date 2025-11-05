"use client";
import Blog from "../legacy-pages/Blog";
import WaitlistSection from "../../components/legacy/WaitlistSection";
import SiteFooter from "../../components/legacy/SiteFooter";

export default function BlogPage() {
  return (
    <>
      <Blog />
      <WaitlistSection />
      <SiteFooter />
    </>
  );
}
