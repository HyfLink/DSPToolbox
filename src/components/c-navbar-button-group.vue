<script setup>
import { useLocalePreference } from "@/locales";
import { useThemePreference } from "@/themes";
import { Icon } from "@iconify/vue";

const locale = useLocalePreference();
const theme = useThemePreference();
const repository = process.env.PACKAGE_REPOSITORY;
</script>

<template>
  <n-button-group>
    <!-- GitHub repository -->
    <n-popover>
      <template #trigger>
        <n-button circle secondary tag="a" target="_blank" :href="repository">
          <template #icon>
            <n-icon> <Icon icon="mdi:github" /></n-icon>
          </template>
        </n-button>
      </template>

      <div>{{ $t("应用程序.GitHub仓库") }}</div>
    </n-popover>

    <!-- Switch Locale -->
    <n-popover>
      <!-- toggle button -->
      <template #trigger>
        <n-button circle secondary @click="locale.toggle">
          <template #icon>
            <n-icon> <Icon :icon="locale.icon" /> </n-icon>
          </template>
        </n-button>
      </template>

      <!-- popover message -->
      <div>{{ $t(locale.message) }}</div>
    </n-popover>

    <!-- Switch Theme -->
    <n-popover>
      <!-- toggle button -->
      <template #trigger>
        <n-button circle secondary @click="theme.toggle">
          <template #icon>
            <n-icon> <Icon :icon="theme.icon" /> </n-icon>
          </template>
        </n-button>
      </template>

      <!-- popover message -->
      <div>{{ $t(theme.message) }}</div>
    </n-popover>
  </n-button-group>
</template>
