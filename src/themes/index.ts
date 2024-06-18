import { GlobalTheme, GlobalThemeOverrides, darkTheme } from "naive-ui";

export const lightThemeOverrides: GlobalThemeOverrides = {};

export const darkThemeOverrides: GlobalThemeOverrides = {};

export type ThemeScheme = "dark" | "light";

const defaultThemeScheme: ThemeScheme = "light";
const availableThemeSchemes: ThemeScheme[] = ["light", "dark"];

export type UseThemePreferenceStore = {
  // Current theme scheme, "light" or "dark".
  theme: Ref<ThemeScheme>;
  // Toggles theme scheme and returns new theme scheme.
  toggle: () => ThemeScheme;
  // Computed icon of the theme.
  icon: ComputedRef<string>;
  // Computed name of the theme.
  message: ComputedRef<string>;
  // Computed naive-ui theme.
  themeVariables: ComputedRef<GlobalTheme | null>;
  // Computed naive-ui theme overrides.
  themeOverrides: ComputedRef<GlobalThemeOverrides>;
};

/**
 * Returns _Pinia_ store that describes application theme preference.
 */
export const useThemePreference = defineStore<string, UseThemePreferenceStore>("preference-theme", () => {
  const cycleList = useCycleList<ThemeScheme>(availableThemeSchemes, {
    initialValue: defaultThemeScheme,
  });

  return {
    theme: cycleList.state,
    toggle: () => cycleList.next(),
    icon: computed(() => (cycleList.state.value === "dark" ? "ic:twotone-dark-mode" : "ic:twotone-light-mode")),
    message: computed(() => (cycleList.state.value === "dark" ? "应用程序.深色模式" : "应用程序.浅色模式")),
    themeVariables: computed(() => (cycleList.state.value === "dark" ? darkTheme : null)),
    themeOverrides: computed(() => (cycleList.state.value === "dark" ? darkThemeOverrides : lightThemeOverrides)),
  };
});
