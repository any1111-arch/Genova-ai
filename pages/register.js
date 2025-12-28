export default function Register() {
  return (
    <div>
      <h1>Registrace</h1>

      <form>
        <input type="email" placeholder="Email" />
        <br />
        <input type="password" placeholder="Heslo" />
        <br />
        <button type="submit">Zaregistrovat se</button>
      </form>
    </div>
  );
}

