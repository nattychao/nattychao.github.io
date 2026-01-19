<template>
  <section class="max-w-[1460px] mx-auto px-4 md:px-8 my-6 md:my-10">
    <div class="overflow-hidden">
      <!-- Main Hero Content -->
      <div class="relative overflow-hidden">
        <div
          class="px-0 md:px-0 py-16 md:py-20 lg:py-24 flex flex-col md:flex-row items-center gap-12 lg:gap-20 relative z-10">
          <!-- Text Content -->
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-3xl md:text-4xl lg:text-[56px] font-bold mb-6 text-black tracking-tight font-sans"
              style="line-height: calc(1em + 4px)">
              Wholesale Jewelry <br />
              &Fashion - Factory Direct EU & Global Shipping.
            </h1>
            <p class="text-gray-600 text-base md:text-lg mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed font-normal">
              Fast EU delivery from the Netherlands or Global shipping from ourfactories. New styles weekly. Exclusive
              B2B pricing.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                class="bg-black text-white px-8 py-3 text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-gray-800 transition-all flex items-center justify-center rounded-[2px]">
                REGISTER FOR WHOLESALE
              </button>
              <button
                class="bg-white text-black border border-black px-8 py-3 text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-gray-50 transition-all flex items-center justify-center rounded-[2px]">
                SHOP NEW ARRIVALS
              </button>
            </div>
          </div>

          <!-- Image Content -->
          <div class="flex-1 relative w-full max-w-md md:max-w-none">
            <div class="aspect-[4/3] relative z-10">
              <img src="/yehwang/hero.png" alt="Wholesale Jewelry & Fashion"
                class="w-full h-full object-cover rounded-[2px]" />
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Bar -->
      <div class="bg-[#F1E9EA] rounded-[2px]">
        <div class="px-6 md:px-12 py-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between lg:items-center gap-6 lg:gap-0">
            <div class="flex items-center justify-center md:justify-start gap-3 text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                class="flex-shrink-0">
                <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
                <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
                <circle cx="7" cy="18" r="2" />
                <path d="M15 18H9" />
                <circle cx="17" cy="18" r="2" />
              </svg>
              <span class="text-sm font-medium">EU Shipping</span>
            </div>

            <div class="hidden lg:block h-8 w-px bg-gray-300"></div>

            <div class="flex items-center justify-center md:justify-start gap-3 text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                class="flex-shrink-0">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <span class="text-sm font-medium">Global shipping</span>
            </div>

            <div class="hidden lg:block h-8 w-px bg-gray-300"></div>

            <div class="flex items-center justify-center md:justify-start gap-3 text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                class="flex-shrink-0">
                <path
                  d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
              </svg>
              <span class="text-sm font-medium">Always low wholesale prices</span>
            </div>

            <div class="hidden lg:block h-8 w-px bg-gray-300"></div>

            <div class="flex items-center justify-center md:justify-start gap-3 text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                class="flex-shrink-0">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
              <div class="flex flex-col leading-tight">
                <span class="text-sm font-medium">Responsible & sustainable sourcing</span>
                <span class="text-[10px] text-gray-500">多语言多语言多语言样式</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'WholesaleHero'
}
</script>
