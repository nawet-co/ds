import { useMediaQuery } from "usehooks-ts";

const MOBILE_BREAKPOINT = 768;

const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

/**
 * Matches viewports narrower than the mobile breakpoint.
 *
 * `initializeWithValue: false` keeps server output and the first client render
 * in agreement (no hydration mismatch). The hook then resolves the real value
 * in a layout effect, so mobile never flashes the desktop layout first.
 */
export function useIsMobile(): boolean {
  return useMediaQuery(MOBILE_QUERY, { initializeWithValue: false });
}
