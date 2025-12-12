<template>
  <div class="bg-white rounded-xl shadow-sm p-3">
    <!-- 收藏夹标题和统计 -->
    <div class="flex justify-between items-center mb-4">
      <div>
        <h3 class="text-base md:text-lg font-semibold text-slate-900 line-clamp-1 md:line-clamp-2">
          {{ collection.title }}
        </h3>
        <p class="text-xs md:text-sm text-slate-500">{{ collection.photos.length }} photos</p>
      </div>
      <div class="hidden md:block text-sm text-theme-600 font-medium">View All</div>
    </div>

    <!-- 图片网格 -->
    <div class="relative aspect-square rounded-2xl overflow-hidden">
      <!-- 1张图片 -->
      <div v-if="collection.photos.length === 1" class="w-full h-full">
        <img :src="collection.photos[0]" alt="Collection photo" class="w-full h-full object-cover">
      </div>

      <!-- 2张图片 -->
      <div v-else-if="collection.photos.length === 2" class="grid grid-cols-2 gap-1 w-full h-full">
        <img :src="collection.photos[0]" alt="Collection photo" class="w-full h-full object-cover">
        <img :src="collection.photos[1]" alt="Collection photo" class="w-full h-full object-cover">
      </div>

      <!-- 3张图片 -->
      <div v-else-if="collection.photos.length === 3" class="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full">
        <img :src="collection.photos[0]" alt="Collection photo"
          class="col-span-1 row-span-2 w-full h-full object-cover">
        <img :src="collection.photos[1]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[2]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
      </div>

      <!-- 4张图片 -->
      <div v-else-if="collection.photos.length === 4" class="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full">
        <img :src="collection.photos[0]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[1]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[2]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[3]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
      </div>

      <!-- 5张图片 -->
      <div v-else-if="collection.photos.length === 5" class="grid grid-cols-6 grid-rows-2 gap-1 w-full h-full">
        <img :src="collection.photos[0]" alt="Collection photo"
          class="col-span-3 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[1]" alt="Collection photo"
          class="col-span-3 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[2]" alt="Collection photo"
          class="col-span-2 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[3]" alt="Collection photo"
          class="col-span-2 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[4]" alt="Collection photo"
          class="col-span-2 row-span-1 w-full h-full object-cover">
      </div>

      <!-- 6张图片 -->
      <div v-else-if="collection.photos.length === 6" class="grid grid-cols-3 grid-rows-2 gap-1 w-full h-full">
        <img :src="collection.photos[0]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[1]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[2]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[3]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[4]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[5]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
      </div>

      <!-- 7张图片 -->
      <div v-else-if="collection.photos.length === 7" class="grid grid-cols-3 grid-rows-3 gap-1 w-full h-full">
        <img :src="collection.photos[0]" alt="Collection photo"
          class="col-span-2 row-span-2 w-full h-full object-cover">
        <img :src="collection.photos[1]" alt="Collection photo"
          class="col-span-1 row-span-2 w-full h-full object-cover">
        <img :src="collection.photos[2]" alt="Collection photo"
          class="col-span-1 row-span-2 w-full h-full object-cover">
        <img :src="collection.photos[3]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[4]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[5]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[6]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
      </div>

      <!-- 8张图片 -->
      <div v-else-if="collection.photos.length === 8" class="grid grid-cols-3 grid-rows-3 gap-1 w-full h-full">
        <img :src="collection.photos[0]" alt="Collection photo"
          class="col-span-2 row-span-2 w-full h-full object-cover">
        <img :src="collection.photos[1]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[2]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[3]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[4]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[5]" alt="Collection photo"
          class="col-span-1 row-span-2 w-full h-full object-cover">
        <img :src="collection.photos[6]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[7]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
      </div>

      <!-- 9张及以上图片 -->
      <div v-else class="grid grid-cols-3 grid-rows-3 gap-1 w-full h-full">
        <img :src="collection.photos[0]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[1]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[2]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[3]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[4]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[5]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[6]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <img :src="collection.photos[7]" alt="Collection photo"
          class="col-span-1 row-span-1 w-full h-full object-cover">
        <div class="col-span-1 row-span-1 w-full h-full relative">
          <img :src="collection.photos[8]" alt="Collection photo"
            class="col-span-1 row-span-1 w-full h-full object-cover">
          <div v-if="collection.photos.length > 9"
            class="absolute inset-0 bg-black/25 flex items-center justify-center">
            <span class="text-white text-lg font-bold">+{{ collection.photos.length - 9 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 定义组件属性
const props = defineProps({
  collection: {
    type: Object,
    required: true,
    default: () => ({
      title: 'New Collection',
      photos: []
    })
  }
})
</script>
