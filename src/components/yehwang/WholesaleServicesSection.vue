<template>
  <section class="py-12 px-4 md:px-8 max-w-[1460px] mx-auto">
    <!-- Title -->
    <h2 class="text-xl md:text-2xl font-bold uppercase tracking-wide text-gray-900 mb-6">
      WHOLESALE SERVICES
    </h2>

    <!-- Grid Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Top Left - Private Label Service -->
      <div class="relative overflow-hidden rounded-[4px] group cursor-pointer" style="aspect-ratio: 722/380">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80"
          alt="Private Label Service"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/30"></div>
        <div class="absolute bottom-6 left-6">
          <h3 class="text-white text-sm font-bold uppercase mb-3 leading-tight">
            PRIVATE LABEL<br />SERVICE.
          </h3>
          <a
            href="#"
            class="inline-flex rounded-[4px] items-center gap-2 bg-white text-black text-[11px] font-bold uppercase tracking-wide py-2 px-4 hover:bg-gray-100 transition-colors"
          >
            DETAILS <span>›</span>
          </a>
        </div>
      </div>

      <!-- Top Right - Customized Dropshipping Service -->
      <div class="relative overflow-hidden rounded-[4px] group cursor-pointer" style="aspect-ratio: 722/380">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80"
          alt="Customized Dropshipping Service"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/30"></div>
        <div class="absolute bottom-6 left-6">
          <h3 class="text-white text-sm font-bold uppercase mb-3 leading-tight">
            CUSTOMIZED DROPSHIPPING<br />SERVICE.
          </h3>
          <a
            href="#"
            class="inline-flex rounded-[4px] items-center gap-2 bg-white text-black text-[11px] font-bold uppercase tracking-wide py-2 px-4 hover:bg-gray-100 transition-colors"
          >
            DETAILS <span>›</span>
          </a>
        </div>
      </div>

      <!-- Bottom Items - Only show when NOT logged in -->
      <template v-if="!isLoggedIn">
        <!-- Bottom Left - Large Image -->
        <div class="relative overflow-hidden rounded-[4px] mt-4" style="width: calc(100% + 60px); aspect-ratio: 780/300">
          <img
            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80"
            alt="Responsible & Transparent"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Bottom Right - Text Content -->
        <div class="bg-white rounded-[4px] pl-[0px] pr-[18px] pt-[18px] pb-[8px] flex flex-col justify-between mt-8" style="margin-left: 60px">
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              Responsible & Transparent
            </h3>
            <p class="text-sm text-gray-700 leading-relaxed mb-6">
              We prioritize recycled materials where possible, responsibleproduction partners, and durable designs. Share Yehwang'ssustainability story here with concretedetails, certifications,and audits.
            </p>
          </div>
          <div class="flex flex-wrap gap-3">
            <button class="px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-full" style="border: 1px solid #D8D8D8">
              Recycled brass
            </button>
            <button class="px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-full" style="border: 1px solid #D8D8D8">
              Nickel safe plating
            </button>
            <button class="px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-full" style="border: 1px solid #D8D8D8">
              BSCI factories
            </button>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: 'WholesaleServicesSection',
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false
    }
  }
}
</script>
