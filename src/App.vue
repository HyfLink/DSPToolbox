<script setup lang="ts">
import { useThemePreference } from "@/themes";
import { useLocalePreference } from "@/locales";

const theme = useThemePreference();
const locale = useLocalePreference();
</script>

<template>
  <n-config-provider
    :theme="theme.themeVariables"
    :theme-overrides="theme.themeOverrides"
    :locale="locale.uiLocale"
    :date-locale="locale.uiDateLocale"
  >
    <n-card>
      <c-switch-theme />
      <c-switch-locale />
    </n-card>
  </n-config-provider>
</template>
