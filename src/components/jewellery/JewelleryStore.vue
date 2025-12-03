<template>
  <section class="jewellery-store bg-white py-8 md:py-16">
    <div class="max-w-[1366px] mx-auto px-6 flex flex-col md:flex-row">
      <!-- 左侧图片 -->
      <div class="w-full md:w-1/2">
        <img
          src="https://art.my-jewellery.com/transform/3fdbc4af-da89-4c61-9c33-97d85d5ecffb/boutique-amsterdam-2024_9?io=transform:fill,width:2880&format=avif"
          alt="Jewellery Boutique Interior" class="w-full h-full object-cover" />
      </div>

      <!-- 右侧文字内容 -->
      <div class="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
        <h2 class="text-xl md:text-2xl font-bold mb-3 font-futura">
          MY JEWELLERY BOUTIQUE & ATELIER
        </h2>
        <h3 class="text-lg md:text-xl font-normal mb-6 font-futura">
          STEP INTO MY WORLD
        </h3>
        <p class="text-sm md:text-base font-medium mb-2 text-gray-800">
          My Jewellery Boutiques
        </p>
        <p class="text-sm md:text-base font-normal mb-4 text-gray-800">
          Find your nearest boutique and experience our world of jewellery, gifts, fashion & inspiration.
        </p>
        <a href="#"
          class="text-sm md:text-base font-normal text-black flex items-center gap-1 hover:underline font-futura">
          Discover all boutiques
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m5 12 7 7 7-7" />
            <path d="M12 19V5" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'JewelleryStore'
}
</script>

<style scoped>
.jewellery-store {
  width: 100%;
}
</style>
