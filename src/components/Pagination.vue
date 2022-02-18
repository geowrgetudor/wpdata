<script setup>
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";

import AngleLeftIcon from "@/components/icons/AngleLeftIcon.vue";
import AngleRightIcon from "@/components/icons/AngleRightIcon.vue";

const router = useRouter();

const props = defineProps({
  totalPages: Number,
  currentPage: Number,
  totalResults: Number,
});
</script>

<template>
  <div class="bg-white mt-6">
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          <span class="font-medium">{{ totalResults }}</span>
          results
        </p>
      </div>
      <div>
        <nav
          class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <a
            v-if="currentPage && currentPage !== 1"
            @click.prevent="currentPage = currentPage - 1"
            href="#"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span class="sr-only">Previous</span>
            <AngleLeftIcon class="fill-current w-4" />
          </a>

          <template v-for="(page, k) in totalPages" :key="k">
            <a
              v-if="
                Math.abs(page - currentPage) < 3 ||
                Math.abs(totalPages - page) < 3
              "
              @click.prevent="
                router.push({ name: 'plugins', params: { page } })
              "
              href="#"
              aria-current="page"
              :class="{
                'z-10 bg-indigo-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium':
                  page === currentPage,
                'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium':
                  page !== currentPage,
              }"
            >
              {{ page }}
            </a>

            <span
              v-else-if="Math.abs(page - currentPage) === 4"
              aria-current="page"
              class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              ...
            </span>
          </template>
          <a
            v-if="currentPage && currentPage !== totalPages"
            @click.prevent="currentPage = currentPage + 1"
            href="#"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span class="sr-only">Next</span>
            <AngleRightIcon class="fill-current w-4" />
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>
