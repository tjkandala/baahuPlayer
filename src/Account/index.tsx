import { machine, b } from "baahu";

const Account = machine<{}>({
  id: "account",
  initial: "unauthorized",
  context: () => ({}),
  when: {
    unauthorized: {},
    authorized: {},
  },
  render: () => (
    <div>
      <h2>account</h2>
      <form>
        <input type="text" />
        <input type="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  ),
});

export default Account;
