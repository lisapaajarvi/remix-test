import { Link } from "remix";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Marsvinsbloggen</h1>

      <Link to="/posts">Gå till inläggen</Link>
      <br />
      <br />
      <Link to="/admin">Gå till adminsidan</Link>
    </div>
  );
}
