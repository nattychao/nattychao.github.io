<template>
  <section class="py-12 bg-gray-50 border-t border-gray-100">
    <div class="max-w-[1460px] mx-auto px-4 md:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="(service, index) in services" :key="index" class="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div class="p-3 bg-gray-100 rounded-full text-black">
            <component :is="service.icon" />
          </div>
          <div>
            <h3 class="font-bold text-sm uppercase tracking-wide">{{ service.title }}</h3>
            <p class="text-xs text-gray-500">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// Simple SVG components for icons
const TruckIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><path d="M15 18H9"/><circle cx="17" cy="18" r="2"/></svg>`
}

const ShieldCheckIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>`
}

const GlobeIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`
}

const CreditCardIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`
}

export default {
  name: 'WholesaleServices',
  data() {
    return {
      services: [
        { icon: TruckIcon, title: 'Fast Shipping', description: 'Reliable delivery to your doorstep' },
        { icon: ShieldCheckIcon, title: 'Secure Payment', description: '100% secure payment processing' },
        { icon: GlobeIcon, title: 'Global Shipping', description: 'We ship to over 200 countries' },
        { icon: CreditCardIcon, title: 'Easy Returns', description: 'Hassle-free return policy' },
      ]
    }
  }
}
</script>
