import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

const rootEl = document.getElementById("root")!;

// Prerendered pages (scripts/prerender.mjs) ship static HTML inside #root so
// crawlers and link-preview bots see real content. We intentionally use
// createRoot (not hydrateRoot): the app isn't built for strict SSR hydration,
// so hydrating throws mismatch errors (React #418/#423) on animated/dynamic
// subtrees. createRoot cleanly replaces the prerendered markup on mount — the
// static HTML has already done its SEO job by the time JS runs.
rootEl.replaceChildren();
createRoot(rootEl).render(<App />);
