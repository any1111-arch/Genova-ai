export default function Dashboard() {
  // Načtení emailu uloženého v localStorage
  let email = "";
  if (typeof window !== "undefined") {
    email = localStorage.getItem("userEmail") || "neznámý uživatel";
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontFamily: "sans-serif"
    }}>
      <h1>Vítej na Dashboardu 👋</h1>
      <p>Přihlášený uživatel: <b>{email}</b></p>
    </div>
  );
}

