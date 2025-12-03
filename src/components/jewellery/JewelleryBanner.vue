<template>
  <section class="jewellery-banner bg-white">
    <div class="relative max-w-[1366px] mx-auto">
      <!-- 横幅图片 -->
      <img
        src="https://art.my-jewellery.com/transform/78666544-157a-4822-8817-9e9b40039772/BANNER-HOME-DESKTOP-gifting?io=transform:crop,width:2880,height:1440&format=avif"
        alt="Jewellery Collection" class="w-full aspect-[2/1] object-cover" />

      <!-- 文字叠加 - 左下方 -->
      <div class="absolute bottom-6 left-4 md:left-8">
        <h2 class="text-[24px] font-bold text-white uppercase mb-0 font-futura">THE GIFTSHOP</h2>
        <a href="#" class="text-white font-light flex items-center gap-2 font-futura">
          Shop now
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'JewelleryBanner'
}
</script>

<style scoped>
.jewellery-banner {
  width: 100%;
  position: relative;
}
</style>
