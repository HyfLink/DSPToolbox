<script setup>
import { useThemePreference } from "@/themes";
import { Icon } from "@iconify/vue";

const theme = useThemePreference();
</script>

<template>
  <n-popover trigger="hover" placement="bottom">
    <!-- toggle button -->
    <template #trigger>
      <n-button circle secondary type="primary" @click="theme.toggle">
        <template #icon>
          <n-icon> <Icon :icon="theme.icon" /> </n-icon>
        </template>
      </n-button>
    </template>

    <!-- popover message -->
    <div>{{ $t(theme.message) }}</div>
  </n-popover>
</template>
