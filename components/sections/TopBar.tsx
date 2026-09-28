import SiteNav from "@/components/sections/SiteNav";

/** Fixed top bar. */
export default function TopBar() {
  return (
    <div className="fixed left-0 top-0 z-50 w-full">
      <SiteNav />
    </div>
  );
}
