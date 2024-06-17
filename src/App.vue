<script setup lang="ts">
import { useThemePreference } from "@/themes";
import { useLocalePreference } from "./locales";

const theme = useThemePreference();
const locale = useLocalePreference();
</script>

<template>
  <n-config-provider
    :theme="theme.uiTheme"
    :theme-overrides="theme.uiThemeOverrides"
    :locale="locale.uiLocale"
    :date-locale="locale.uiDateLocale"
  >
    <n-button @click="theme.toggle" type="primary">
      <div>Hello, World!</div>
    </n-button>

    <n-button @click="locale.toggle" type="primary">
      <div>{{ $t("语言") }}</div>
    </n-button>
  </n-config-provider>
</template>
