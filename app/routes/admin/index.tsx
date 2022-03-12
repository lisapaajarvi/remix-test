import { Link } from "remix";

export default function AdminIndex() {
  return (
    <p>
      <Link to="new">Skapa ett nytt inlägg</Link>
    </p>
  );
}
