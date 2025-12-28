import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gems, setGems] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setGems(data.gems);
      setVideoUrl("");
    } else {
      alert(data.message);
    }
  }

  async function generateVideo() {
    setLoading(true);

    const res = await fetch("/api/generate-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        prompt: "test video",
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setGems(data.remainingGems);
      setVideoUrl(data.videoUrl);
    } else {
      alert(data.message);
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Genova AI – Video Generator</h1>
      <p>Login, get gems, generate video</p>

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={login}>Login</button>

      {gems !== null && (
        <>
          <p>💎 Gems: {gems}</p>
          <button onClick={generateVideo} disabled={loading}>
            {loading ? "Generating..." : "Generate video (5 gems)"}
          </button>
        </>
      )}

      {videoUrl && (
        <p>
          🎥 Video URL:{" "}
          <a href={videoUrl} target="_blank" rel="noreferrer">
            {videoUrl}
          </a>
        </p>
      )}
    </div>
  );
}

