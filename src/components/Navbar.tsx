import { b, SFC, linkTo, Link } from "baahu";

export const Navbar: SFC = () => (
  <nav>
    <a>BaahuCloud</a>
    <a onClick={() => linkTo("/")}>search</a>
    <Link to="/account">
      <p>account</p>
    </Link>

    <a onClick={() => linkTo("/song")}>song</a>
  </nav>
);
