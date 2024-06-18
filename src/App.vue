<script setup lang="ts">
import { useLocalePreference } from "@/locales";
import { useThemePreference } from "@/themes";

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
      <c-navbar-button-group />
    </n-card>
  </n-config-provider>
</template>
