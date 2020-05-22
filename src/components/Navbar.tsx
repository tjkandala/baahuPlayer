import { b, SFC, Link } from "baahu";

export const Navbar: SFC = () => (
  <nav>
    <a>BaahuCloud</a>

    <Link to="/">
      <p>search</p>
    </Link>
    <Link to="/account">
      <p>account</p>
    </Link>

    <Link to="/song">
      <p>song</p>
    </Link>
  </nav>
);
