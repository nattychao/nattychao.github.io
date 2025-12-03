<template>
  <section class="jewellery-products py-16">
    <div class="max-w-[1366px] mx-auto px-6">
      <!-- 产品网格 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- 产品卡片 1 -->
        <div class="product-card group">
          <div class="relative overflow-hidden">
            <img
              src="https://art.my-jewellery.com/transform/5f1767ee-e438-4feb-b4f1-6b4bb26381de/Flatlay-Sep25-52?io=transform:crop,width:2880,height:3840&format=avif"
              alt="Jewellery Product 1" class="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
            <div
              class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300">
            </div>
            <!-- 左下角文字 -->
            <div class="absolute bottom-6 left-6 text-white">
              <h3 class="text-2xl font-bold mb-2 uppercase">Jewellery</h3>
              <a href="#" class="text-sm font-medium hover:underline flex items-center gap-1">Discover more <svg
                  class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg></a>
            </div>
          </div>
        </div>

        <!-- 产品卡片 2 -->
        <div class="product-card group">
          <div class="relative overflow-hidden">
            <img
              src="https://art.my-jewellery.com/transform/7c8a4ede-6fb4-408a-a5ee-bb8149933e06/Shoot-Sep25-Amsterdam-49?io=transform:crop,width:2880,height:3840&format=avif"
              alt="Jewellery Product 2" class="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
            <div
              class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300">
            </div>
            <!-- 左下角文字 -->
            <div class="absolute bottom-6 left-6 text-white">
              <h3 class="text-2xl font-bold mb-2 uppercase">Clothing</h3>
              <a href="#" class="text-sm font-medium hover:underline flex items-center gap-1">Discover more <svg
                  class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg></a>
            </div>
          </div>
        </div>

        <!-- 产品卡片 3 -->
        <div class="product-card group">
          <div class="relative overflow-hidden">
            <img
              src="https://art.my-jewellery.com/transform/b7fdff25-fca4-485d-add9-18f9cefb753b/Shoot-Okt25-Breda-03?io=transform:crop,width:2880,height:3840&format=avif"
              alt="Jewellery Product 3" class="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
            <div
              class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300">
            </div>
            <!-- 左下角文字 -->
            <div class="absolute bottom-6 left-6 text-white">
              <h3 class="text-2xl font-bold mb-2 uppercase">Accessories</h3>
              <a href="#" class="text-sm font-medium hover:underline flex items-center gap-1">Discover more <svg
                  class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'JewelleryProducts'
}
</script>

<style scoped>
.jewellery-products {
  background-color: white;
}

.product-card {
  cursor: pointer;
}
</style>
