<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

import WordpressIcon from "@/components/icons/WordpressIcon.vue";
import DeveloperIcon from "@/components/icons/DeveloperIcon.vue";
import PackageVersionIcon from "@/components/icons/PackageVersionIcon.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";

import Pagination from "@/components/Pagination.vue";

const loader = ref("");
const search = ref("");
const plugins = ref([]);
const info = ref([]);

const route = useRoute();
const router = useRouter();

watch(
  () => route.params.page,
  (value, oldValue, onInvalidate) => {
    if (value !== oldValue) {
      getPlugins();
    }
  }
);

onMounted(() => getPlugins());

// Methods
const getPlugins = async (reset = false) => {
  loader.value = true;

  if (reset) router.push({ name: "plugins", params: { route: 1 } });

  let url = `https://api.wordpress.org/plugins/info/1.2/?action=query_plugins`;

  if (search.value) {
    url += `&request[search]=${search.value}`;
  }

  if (route.params.page) {
    url += `&request[page]=${route.params.page}`;
  }

  console.log(url);

  await axios
    .get(url)
    .then((response) => {
      plugins.value = response.data.plugins;
      info.value = response.data.info;
      loader.value = false;
    })
    .catch((e) => {});
};
</script>

<template>
  <div class="w-full md:w-1/2 md:mx-auto mb-24 mt-6">
    <span class="block relative">
      <input
        v-model="search"
        @keyup.enter="getPlugins(true)"
        class="block w-full text-lg px-8 py-4 pr-12 rounded-lg shadow focus:shadow-xl focus:shadow-blue-100 border border-neutral-200 bg-white focus-within:outline-none focus:appearance-none focus:ring focus:ring-blue-500 focus:border-white"
        type="text"
        placeholder="Search for a plugin"
      />
      <span
        v-if="search"
        @click.prevent="
          search = '';
          getPlugins(true);
        "
        class="absolute h-full flex items-center top-0 right-0 mr-4 text-neutral-600 hover:text-neutral-700 hover:cursor-pointer"
        ><CloseIcon class="fill-current w-4"
      /></span>
      <span
        v-else
        @click.prevent="getPlugins(true)"
        class="absolute h-full flex items-center top-0 right-0 mr-4 text-neutral-600 hover:text-neutral-700 hover:cursor-pointer"
        ><SearchIcon class="fill-current w-4"
      /></span>
    </span>
  </div>

  <div v-if="loader" class="text-center">
    <svg
      role="status"
      class="inline mr-2 w-10 h-10 text-gray-200 animate-spin fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  </div>

  <div v-else class="">
    <div v-if="plugins.length">
      <ul
        role="list"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8 lg:gap-10"
      >
        <li
          v-for="(plugin, key) in plugins"
          :key="key"
          class="col-span-1 flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-100 transition-shadow ease-linear duration-200 divide-y divide-gray-200 border border-gray-100"
        >
          <div class="flex flex-wrap flex-1 p-8">
            <div class="w-full flex flex-wrap1 flex-row items-center space-x-5">
              <div
                class="w-20 h-20 ring-4 ring-neutral-200 overflow-hidden rounded-full"
              >
                <img
                  class="w-full object-cover"
                  :src="plugin.icons['1x']"
                  alt=""
                />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-neutral-800 line-clamp-2">
                  {{ plugin.name }}
                </h3>
                <div class="flex items-center text-xs mt-1">
                  <DeveloperIcon class="w-4 mr-2 inline-block" />
                  <a
                    :href="plugin.author_profile"
                    target="_blank"
                    class="inline-block text-neutral-500 hover:underline hover:text-blue-600 line-clamp-1"
                    ><span>
                      {{ plugin.author.replace(/<\/?[^>]+>/gi, "") }}
                    </span></a
                  >
                </div>
              </div>
            </div>
            <div class="my-4 text-sm text-neutral-500">
              {{ plugin.short_description }}
            </div>
            <div class="self-end w-full">
              <div class="mt-2 text-sm font-medium grid grid-cols-2 gap-4">
                <div
                  class="flex items-center justify-center text-orange-500 bg-neutral-100 rounded px-2 py-1"
                >
                  <span class="leading-none"
                    ><PackageVersionIcon
                      class="fill-current w-4 mr-2 inline-block"
                  /></span>
                  <span class="truncate">{{ plugin.version }}</span>
                </div>
                <div
                  class="flex items-center justify-center text-blue-500 bg-neutral-100 rounded px-2 py-1"
                >
                  <span class="leading-none"
                    ><WordpressIcon class="fill-current w-4 mr-2 inline-block"
                  /></span>
                  <span class="truncate">{{ plugin.tested }}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="-mt-px flex divide-x divide-gray-200">
              <div class="w-0 flex-1 flex">
                <a
                  :href="plugin.download_link"
                  class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-neutral-700 font-medium border border-transparent rounded-bl-lg hover:text-white hover:bg-blue-700 transition-color ease-linear duration-200"
                >
                  Download
                </a>
              </div>
              <div class="-ml-px w-0 flex-1 flex">
                <RouterLink
                  :to="{ name: 'plugin', params: { slug: plugin.slug } }"
                  class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-neutral-700 font-medium border border-transparent rounded-br-lg hover:text-white hover:bg-blue-700 transition-color ease-linear duration-200"
                  >Details</RouterLink
                >
              </div>
            </div>
          </div>
        </li>
      </ul>

      <Pagination
        :totalPages="info.pages"
        :currentPage="$route.params.page ? parseInt($route.params.page) : 1"
        :totalResults="info.results"
      />
    </div>

    <div v-else class="text-center font-bold text-neutral-400 text-lg">
      No plugins found.
    </div>
  </div>
</template>
