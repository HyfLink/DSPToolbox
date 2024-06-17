<script setup>
import { useLocalePreference } from "@/locales";
import { Icon } from "@iconify/vue";

const locale = useLocalePreference();
</script>

<template>
  <n-popover trigger="hover" placement="bottom">
    <!-- toggle button -->
    <template #trigger>
      <n-button circle secondary type="primary" @click="locale.toggle">
        <template #icon>
          <n-icon> <Icon :icon="locale.icon" /> </n-icon>
        </template>
      </n-button>
    </template>

    <!-- popover message -->
    <div>{{ $t(locale.message) }}</div>
  </n-popover>
</template>
