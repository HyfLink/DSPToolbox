import { GlobalThemeOverrides, darkTheme } from "naive-ui";

export const lightThemeOverrides: GlobalThemeOverrides = {};

export const darkThemeOverrides: GlobalThemeOverrides = {};

/**
 * Returns _Pinia_ store that describes application theme preference.
 *
 * - `scheme`: `Ref<"light" | "dark">`
 *
 *    Current theme scheme, "light" or "dark".
 *
 * - `theme`: `ComputedRef<GlobalTheme | null>`
 *
 *    Computed naive-ui theme.
 *
 * - `themeOverrides`: `ComputedRef<GlobalThemeOverrides>`
 *
 *    Computed naive-ui theme overrides.
 *
 * - `switch` `() => ("light | "dark")`
 *
 *    Toggles theme scheme and returns new theme scheme.
 */
export const useThemePreference = defineStore("theme-Preference", () => {
  const themePreferred = usePreferredColorScheme();
  const theme: Ref<"dark" | "light"> = ref(themePreferred.value == "dark" ? "dark" : "light");

  const uiTheme = computed(() => (theme.value == "dark" ? darkTheme : null));
  const uiThemeOverrides = computed(() => (theme.value == "dark" ? darkThemeOverrides : lightThemeOverrides));

  const themeToggle = useToggle(theme, {
    truthyValue: "light",
    falsyValue: "dark",
  });

  const toggle = () => themeToggle;

  return { theme, uiTheme, uiThemeOverrides, toggle };
});
