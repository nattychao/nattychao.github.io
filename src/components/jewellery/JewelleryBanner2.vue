<template>
  <section class="jewellery-banner2 bg-white">
    <div class="relative max-w-[1366px] mx-auto">
      <!-- 横幅图片 -->
      <img
        src="https://art.my-jewellery.com/transform/2ee1b317-abff-43ed-81d7-1aa0ad2853f0/banners-advent?io=transform:crop,width:2880,height:1440&format=avif"
        alt="Jewellery Collection" class="w-full aspect-[2/1] object-cover" />

      <!-- 文字叠加 - 底部中央Shop now按钮 -->
      <div class="absolute bottom-6 left-0 right-0 flex justify-center">
        <a href="#"
          class="bg-white text-black px-8 py-3 text-center hover:opacity-90 transition-opacity font-light font-futura rounded-[4px]">
          Shop now
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'JewelleryBanner2'
}
</script>

<style scoped>
.jewellery-banner2 {
  width: 100%;
  position: relative;
}
</style>
