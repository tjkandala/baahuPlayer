import { b, mount, router, SFC, lazy } from "baahu";
import { Navbar } from "./components/Navbar";
import { Player } from "./components/Player";
import "./index.css";

/** Import Types */

import { Song } from "./mockApi";

/** Code-Splitting Routes */

const Account = lazy(() => import("./Account"));
const Home = lazy(() => import("./Home"));
const Song = lazy(() => import("./Song"));

const MyRouter = router({
  "/": () => <Home />,
  "/account": () => <Account />,
  "/:songid": () => <Song />,
});

const App: SFC = () => {
  return (
    <body>
      <Navbar />
      <MyRouter />
      <Player />
    </body>
  );
};

mount(App, document.body);
