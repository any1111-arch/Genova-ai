export default function Login() {
  return (
    <div>
      <h1>Přihlášení</h1>

      <form>
        <input type="email" placeholder="Email" />
        <br />
        <input type="password" placeholder="Heslo" />
        <br />
        <button type="submit">Přihlásit se</button>
      </form>
    </div>
  );
}
