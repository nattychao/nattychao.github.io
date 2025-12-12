<script setup>
import HeroSection from '@/components/home/HeroSection.vue'
import SkillsSection from '@/components/home/SkillsSection.vue'
import ProjectsSection from '@/components/home/ProjectsSection.vue'
import RecentPostsSection from '@/components/home/RecentPostsSection.vue'
</script>

<template>
  <div class="space-y-0">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Skills Section -->
    <SkillsSection />

    <!-- Featured Projects -->
    <ProjectsSection />

    <!-- Recent Posts Preview -->
    <RecentPostsSection />
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
