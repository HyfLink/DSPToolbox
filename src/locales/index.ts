import localeJsonZH from "@/locales/zh.json";
import localeJsonEN from "@/locales/en.json";
import { createI18n } from "vue-i18n";
import { NDateLocale, NLocale, dateEnUS, dateZhCN, enUS, zhCN } from "naive-ui";

/**
 * Only supports Chinese (Simplified) and English.
 */
export type LocaleKey = "zh" | "en";

/**
 * Defines master scheme from `zh`.
 */
export type LocaleScheme = typeof localeJsonZH;

const defaultLocale: LocaleKey = "zh";
const availableLocales: LocaleKey[] = ["zh", "en"];

export const vueI18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: "zh",
  availableLocales,
  messages: {
    zh: localeJsonZH,
    en: localeJsonEN,
  },
});

export type UseLocalePreferenceStore = {
  // Current locale key (only "zh" and "en" are supported).
  locale: Ref<LocaleKey>;
  // Toggles locale and returns new locale.
  toggle: () => LocaleKey;
  // Computed icon of the locale.
  icon: ComputedRef<string>;
  // Computed name of the locale.
  message: ComputedRef<string>;
  // Computed naive locale.
  uiLocale: ComputedRef<NLocale>;
  // Computed naive date locale.
  uiDateLocale: ComputedRef<NDateLocale>;
};

/**
 * Returns _Pinia_ store that describes application locale preference.
 */
export const useLocalePreference = defineStore<string, UseLocalePreferenceStore>("preference-locale", () => {
  const cycleList = useCycleList<LocaleKey>(availableLocales, {
    initialValue: defaultLocale,
  });

  return {
    locale: cycleList.state,
    toggle: () => (vueI18n.global.locale.value = cycleList.next()),
    icon: computed(() => "mdi:language"),
    message: computed(() => "语言"),
    uiLocale: computed(() => (cycleList.state.value === "zh" ? zhCN : enUS)),
    uiDateLocale: computed(() => (cycleList.state.value === "zh" ? dateZhCN : dateEnUS)),
  };
});
