import { Outlet } from "@remix-run/react";
import CriticaLetterariaContentSwitcher from "../../components/CriticaLetterariaContentSwitcher";

export default function CriticaLetteraria() {
  return (
    <>
      <div className="offset-by-one" style={{ margin: "10px" }}>
        <CriticaLetterariaContentSwitcher />
      </div>
      <Outlet />
    </>
  );
}
