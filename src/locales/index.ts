import zh from "@/locales/zh.json";
import en from "@/locales/en.json";
import { createI18n } from "vue-i18n";
import { dateEnUS, dateZhCN, enUS, zhCN } from "naive-ui";

const availableLocales: ("zh" | "en")[] = ["zh", "en"];

export const vueI18n = createI18n({
  legacy: false,
  locale: "zh",
  fallbackLocale: "zh",
  availableLocales,
  messages: { zh, en },
});

/**
 * Returns _Pinia_ store that describes application locale preference.
 *
 * - `locale`: `Ref<"zh" | "en">`
 *
 *    Current locale key (only "zh" and "en" are supported).
 *
 * - `uiLocale`: `ComputedRef<NLocale>`
 *
 *    Computed naive locale.
 *
 * - `uiDateLocale`: `ComputedRef<NDateLocale>`
 *
 *    Computed naive date locale.
 *
 * - `toggle`
 *
 *    Toggles locale and returns new locale.
 */
export const useLocalePreference = defineStore("locale-preference", () => {
  function selectLocale(locales: readonly string[]) {
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

  const uiLocale = computed(() => (locale.value == "zh" ? zhCN : enUS));
  const uiDateLocale = computed(() => (locale.value == "zh" ? dateZhCN : dateEnUS));

  const localeCycleList = useCycleList(availableLocales);
  watch(localeCycleList.state, (newLocale) => (locale.value = newLocale));

  const toggle = () => (vueI18n.global.locale.value = localeCycleList.next());

  return { locale, uiLocale, uiDateLocale, toggle };
});
