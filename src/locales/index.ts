import localeJsonZH from "@/locales/zh.json";
import localeJsonEN from "@/locales/en.json";
import { createI18n } from "vue-i18n";
import { dateEnUS, dateZhCN, enUS, zhCN } from "naive-ui";

/**
 * Only supports Chinese (Simplified) and English.
 */
export type LocaleKey = "zh" | "en";

/**
 * Defines master scheme from `zh`.
 */
export type LocaleScheme = typeof localeJsonZH;

const availableLocales: LocaleKey[] = ["zh", "en"];

export const vueI18n = createI18n<[LocaleScheme], LocaleKey>({
  legacy: false,
  locale: "zh",
  fallbackLocale: "zh",
  availableLocales,
  messages: {
    zh: localeJsonZH,
    en: localeJsonEN,
  },
});

/**
 * Returns _Pinia_ store that describes application locale preference.
 *
 * - `locale`:  Current locale key (only "zh" and "en" are supported).
 *
 * - `icon`: Icon of the locale (`<Icon :icon="icon" />`)
 *
 * - `message`: Name of the locale.
 *
 * - `uiLocale`:  Computed naive locale.
 *
 * - `uiDateLocale` Computed naive date locale.
 *
 * - `toggle` Toggles locale and returns new locale.
 */
export const useLocalePreference = defineStore("locale-preference", () => {
  function selectLocale(locales: readonly string[]): LocaleKey {
    for (const locale of locales) {
      for (const availableLocale of availableLocales) {
        if (locale.indexOf(availableLocale) >= 0) {
          return availableLocale;
        }
      }
    }

    return availableLocales[0];
  }

  const localePreferred = usePreferredLanguages();
  const locale = ref(selectLocale(localePreferred.value));
  const localeCycleList = useCycleList(availableLocales);

  watch(localeCycleList.state, (newLocale) => (locale.value = newLocale));

  return {
    locale,
    toggle: () => (vueI18n.global.locale = localeCycleList.next()),
    icon: computed(() => "mdi:language"),
    message: computed(() => "语言"),
    uiLocale: computed(() => (locale.value == "zh" ? zhCN : enUS)),
    uiDateLocale: computed(() => (locale.value == "zh" ? dateZhCN : dateEnUS)),
  };
});
