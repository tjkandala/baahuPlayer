import { SFC, b, emit } from "baahu";
import { FeaturedSongs } from "./FeaturedSongs";
import "./home.css";

const Home: SFC = () => (
  <div>
    <button onClick={() => emit({ type: "TOGGLE" })}>toggle</button>
    <h2>Welcome to BaahuCloud!</h2>
    <FeaturedSongs />
    <p>Royalty Free Music</p>
  </div>
);

export default Home;
