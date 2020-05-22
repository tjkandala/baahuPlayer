import { b, machine } from "baahu";

export const CommentInput = machine<{}>({
  id: "commentInput",
  initial: "default",
  context: () => ({}),
  on: {},
  when: {
    default: {},
  },
  render: () => (
    <form>
      <p>Comment at timestamp</p>
      <input type="text" />
      <button type="submit" />
    </form>
  ),
});
