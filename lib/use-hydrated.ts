import { useEffect, useState } from "react";

/**
 * False during the server render and the first browser render, true after.
 * The cart and wishlist are saved in localStorage, which the server can't see,
 * so anything that depends on them waits for this to avoid hydration errors.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
