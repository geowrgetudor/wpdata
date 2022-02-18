<script setup>
import { RouterLink, RouterView } from "vue-router";
import GitHubIcon from "@/components/icons/GitHubIcon.vue";
</script>

<template>
  <div class="relative bg-white shadow z-10">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="flex justify-between items-center py-4 md:justify-start">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <RouterLink to="/" class="font-black text-3xl logo">
            <span><span class="text-blue-600">WP</span>Data</span>
          </RouterLink>
        </div>

        <nav class="hidden md:flex space-x-10">
          <RouterLink
            to="/"
            class="text-base font-medium text-neutral-500 hover:text-neutral-800"
            >Home</RouterLink
          >
          <RouterLink
            to="/plugins"
            class="text-base font-medium text-neutral-500 hover:text-neutral-800"
            >Plugins</RouterLink
          >
          <RouterLink
            to="/themes"
            class="text-base font-medium text-neutral-500 hover:text-neutral-800"
            >Themes</RouterLink
          >
          <RouterLink
            to="/stats"
            class="text-base font-medium text-neutral-500 hover:text-neutral-800"
            >Stats</RouterLink
          >
        </nav>
        <div class="flex-1 text-right">
          <a
            href="https://github.com"
            target="_blank"
            class="inline-flex items-center bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all ease-linear duration-200 px-4 py-2 text-white rounded-full md:rounded-lg"
          >
            <GitHubIcon class="fill-current inline-block w-5 md:mr-2" />
            <span class="hidden md:inline-block">Source</span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="container mx-auto py-8">
    <RouterView />
  </div>
</template>

<style>
.router-link-active:not(.logo) {
  @apply text-neutral-800 border-b-2 border-neutral-800;
}
</style>
