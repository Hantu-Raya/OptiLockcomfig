import { createRoot } from "react-dom/client";
import DeadlockAppInner from "./DeadlockAppInner";

export function mountDeadlockApp(el: HTMLElement) {
  const root = createRoot(el);
  root.render(<DeadlockAppInner />);
  return root;
}

export default DeadlockAppInner;