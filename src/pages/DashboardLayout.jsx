import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <>
      <nav></nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}