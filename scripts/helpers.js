/**
 * Returns true only for users with the full GAMEMASTER role.
 * Assistant GMs are configured individually via the player visibility form.
 * @returns {boolean}
 */
export const isFullGM = () => game.user.hasRole("GAMEMASTER");

/**
 * True when running on Foundry v14 or newer. Hide UI supports v13 and v14; a few
 * options (Scene Levels, Placeables tab) only exist in the v14 UI, and v13 needs a
 * small compatibility stylesheet (styles/v13-compat.css, gated on the body class
 * set in hide-ui.js).
 * @returns {boolean}
 */
export const isV14OrLater = () => game.release.generation >= 14;

/**
 * Coerces a stored visibility value into a canonical mode.
 * Auto-hide-capable fields used to be plain booleans; legacy configs (localStorage
 * and world settings) still hold `true`/`false`, so reads must normalize:
 * `true` → "hide", `false`/`undefined` → "off", and any existing string is passed through.
 * @param {boolean|string|undefined} value - The raw stored value.
 * @returns {"off"|"hide"|"autohide"} The normalized visibility mode.
 */
export const normalizeMode = (value) =>
   value === true ? "hide" : typeof value === "string" ? value : "off";

/**
 * Expands a stored visibility value into per-option booleans for the segmented
 * radio control in the config templates. Exactly one flag is true.
 * @param {boolean|string|undefined} value - The raw stored value.
 * @returns {{off: boolean, hide: boolean, autohide: boolean}}
 */
export const modeFlags = (value) => {
   const mode = normalizeMode(value);
   return { off: mode === "off", hide: mode === "hide", autohide: mode === "autohide" };
};
