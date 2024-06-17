import { GlobalThemeOverrides, darkTheme } from "naive-ui";

export const lightThemeOverrides: GlobalThemeOverrides = {};

export const darkThemeOverrides: GlobalThemeOverrides = {};

/**
 * Returns _Pinia_ store that describes application theme preference.
 *
 * - `theme`: Current theme scheme, "light" or "dark".
 *
 * - `icon`: Icon of the theme (`<Icon :icon="icon" />`)
 *
 * - `message`: Name of the theme.
 *
 * - `themeVariables`: Computed naive-ui theme.
 *
 * - `themeOverrides`: Computed naive-ui theme overrides.
 *
 * - `switch`: Toggles theme scheme and returns new theme scheme.
 */
export const useThemePreference = defineStore("theme-Preference", () => {
  const themePreferred = usePreferredColorScheme();
  const theme: Ref<"dark" | "light"> = ref(themePreferred.value == "dark" ? "dark" : "light");

  const toggleTheme = useToggle(theme, {
    truthyValue: "light",
    falsyValue: "dark",
  });

  return {
    theme,
    toggle: () => toggleTheme(),
    icon: computed(() => (theme.value == "dark" ? "ic:twotone-dark-mode" : "ic:twotone-light-mode")),
    message: computed(() => (theme.value == "dark" ? "应用程序.深色模式" : "应用程序.浅色模式")),
    themeVariables: computed(() => (theme.value == "dark" ? darkTheme : null)),
    themeOverrides: computed(() => (theme.value == "dark" ? darkThemeOverrides : lightThemeOverrides)),
  };
});
