<template>
    <div class="jewellery-page">
        <!-- 顶部导航栏 -->
        <JewelleryHeader />

        <!-- 主要横幅区域 -->
        <JewelleryBanner />

        <!-- 产品展示区域 -->
        <JewelleryProducts />

        <!-- 第二个横幅区域 -->
        <JewelleryBanner2 />

        <!-- 珠宝店展示区域 -->
        <JewelleryStore />

        <!-- 社交媒体展示区域 -->
        <JewellerySocial />

        <!-- 页脚 -->
        <Footer />
    </div>
</template>

<script>
import JewelleryHeader from '@/components/jewellery/JewelleryHeader.vue'
import JewelleryBanner from '@/components/jewellery/JewelleryBanner.vue'
import JewelleryProducts from '@/components/jewellery/JewelleryProducts.vue'
import JewelleryBanner2 from '@/components/jewellery/JewelleryBanner2.vue'
import JewelleryStore from '@/components/jewellery/JewelleryStore.vue'
import JewellerySocial from '@/components/jewellery/JewellerySocial.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'JewelleryPage',
    components: {
        JewelleryHeader,
        JewelleryBanner,
        JewelleryProducts,
        JewelleryBanner2,
        JewelleryStore,
        JewellerySocial,
        Footer
    }
}
</script>

<style scoped>
.jewellery-page {
    width: 100%;
    min-height: 100vh;
    font-family: sans-serif;
}
</style>
