<template>
  <div class="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 pt-20 pb-12 sm:py-16 md:py-20">
    <!-- 个人信息卡片 -->
    <div class="bg-white mx-4 rounded-3xl shadow-sm p-6 sm:p-8 mb-8">
      <!-- 头像 -->
      <div class="flex justify-center mb-6">
        <div
          class="w-32 h-32 rounded-full p-1 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 animate-gradient">
          <img
            src="https://avatars.githubusercontent.com/u/26376013?s=4000&u=0de45a7006d3bcded69f813ba870dceaf9ccf870&v=4"
            alt="Profile picture" class="w-full h-full rounded-full object-cover bg-white border-4 border-white">
        </div>
      </div>

      <!-- 用户名和用户 -->
      <div class="text-center mb-4">
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">Song Chao</h1>
        <p class="text-theme-600 font-medium">nattychaoo@gmail.com</p>
      </div>

      <!-- 统计数据 -->
      <div class="flex justify-center space-x-6 sm:space-x-10 mb-6">
        <div class="text-center">
          <p class="text-xl sm:text-2xl font-bold text-slate-900">250</p>
          <p class="text-sm text-slate-600">Posts</p>
        </div>
        <div class="text-center">
          <p class="text-xl sm:text-2xl font-bold text-slate-900">15.2K</p>
          <p class="text-sm text-slate-600">Followers</p>
        </div>
        <div class="text-center">
          <p class="text-xl sm:text-2xl font-bold text-slate-900">800</p>
          <p class="text-sm text-slate-600">Following</p>
        </div>
      </div>

      <!-- 个人简介 -->
      <div class="text-center mb-8">
        <p class="text-slate-700">Traveler | Creator | Coffee Lover ☕</p>
      </div>

      <!-- 编辑资料按钮 -->
      <div class="flex justify-center">
        <router-link to="/resume"
          class="px-8 py-3 rounded-full bg-theme-600 text-white font-medium hover:bg-theme-700 transition-colors duration-200 flex items-center justify-center gap-2">
          查看简历
          <ArrowRight class="w-4 h-4 sm:w-5 sm:h-5" />
        </router-link>
      </div>
    </div>

    <!-- 标签页导航 -->
    <div class="bg-slate-50 px-4 sticky top-[64px] z-10">
      <div class="bg-white rounded-3xl shadow-sm p-1 mb-8 relative">
        <!-- 动态背景 -->
        <div class="absolute inset-1 rounded-2xl bg-theme-600 transition-all duration-300 ease-in-out" :style="{
          width: 'calc(33.333% - 4px)',
          transform: activeTab === 'photos' ? 'translateX(0)' :
            activeTab === 'saved' ? 'translateX(100%)' : 'translateX(200%)'
        }"></div>
        <!-- 标签按钮 -->
        <div class="flex justify-around relative z-10">
          <button class="flex-1 py-3 text-center text-sm font-medium rounded-2xl transition-colors duration-200"
            :class="activeTab === 'photos' ? 'text-white' : 'text-slate-700 hover:text-theme-600'"
            @click="activeTab = 'photos'">
            My Photos
          </button>
          <button class="flex-1 py-3 text-center text-sm font-medium rounded-2xl transition-colors duration-200"
            :class="activeTab === 'saved' ? 'text-white' : 'text-slate-700 hover:text-theme-600'"
            @click="activeTab = 'saved'">
            Saved Posts
          </button>
          <button class="flex-1 py-3 text-center text-sm font-medium rounded-2xl transition-colors duration-200"
            :class="activeTab === 'badges' ? 'text-white' : 'text-slate-700 hover:text-theme-600'"
            @click="activeTab = 'badges'">
            Badges
          </button>
        </div>
      </div>
    </div>
    <!-- 标签页内容 -->
    <div class="px-4">
      <!-- 精美的空白页面 -->
      <!-- 我的照片 - 有数据时显示卡片，无数据时显示空白页 -->
      <div v-if="activeTab === 'photos'" key="photos">
        <template v-if="collections.length > 0">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CollectionCard v-for="(collection, index) in collections" :key="index" :collection="collection" />
          </div>
        </template>
        <template v-else>
          <div class="min-h-[400px] flex flex-col items-center justify-center py-12">
            <div class="w-24 h-24 mb-6 bg-theme-100 rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-12 h-12 text-theme-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                </path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-slate-800 mb-2">我的照片</h3>
            <p class="text-slate-500 text-center max-w-md mb-8">
              这里是您的照片收藏夹，您可以将喜欢的照片保存在不同的收藏夹中，方便随时查看。
            </p>
            <button
              class="px-6 py-3 bg-theme-600 text-white font-medium rounded-full shadow-md hover:shadow-lg hover:bg-theme-700 transition-all duration-300">
              创建收藏夹
            </button>
          </div>
        </template>
      </div>

      <!-- 收藏的帖子 - 有数据时显示卡片，无数据时显示空白页 -->
      <div v-else-if="activeTab === 'saved'" key="saved">
        <template v-if="collections.slice(0, 0).length > 0">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CollectionCard v-for="(collection, index) in collections.slice(0, 0)" :key="index"
              :collection="collection" />
          </div>
        </template>
        <template v-else>
          <div class="min-h-[400px] flex flex-col items-center justify-center py-12">
            <div class="w-24 h-24 mb-6 bg-purple-100 rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-slate-800 mb-2">收藏的帖子</h3>
            <p class="text-slate-500 text-center max-w-md mb-8">
              您还没有收藏任何帖子，浏览时点击收藏按钮可以将喜欢的内容保存到这里。
            </p>
            <button
              class="px-6 py-3 bg-purple-600 text-white font-medium rounded-full shadow-md hover:shadow-lg hover:bg-purple-700 transition-all duration-300">
              浏览内容
            </button>
          </div>
        </template>
      </div>

      <!-- 徽章 - 有数据时显示卡片，无数据时显示空白页 -->
      <div v-else-if="activeTab === 'badges'" key="badges">
        <template v-if="collections.slice(0, 0).length > 0">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CollectionCard v-for="(collection, index) in collections.slice(0, 0)" :key="index"
              :collection="collection" />
          </div>
        </template>
        <template v-else>
          <div class="min-h-[400px] flex flex-col items-center justify-center py-12">
            <div class="w-24 h-24 mb-6 bg-amber-100 rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z">
                </path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-slate-800 mb-2">徽章</h3>
            <p class="text-slate-500 text-center max-w-md mb-8">
              完成任务和成就可以获得徽章，展示您的专业技能和贡献。
            </p>
            <button
              class="px-6 py-3 bg-amber-600 text-white font-medium rounded-full shadow-md hover:shadow-lg hover:bg-amber-700 transition-all duration-300">
              查看任务
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import CollectionCard from '../components/CollectionCard.vue'

// 活动标签页
const activeTab = ref('photos')

// 收藏夹数据
const collections = ref([
  {
    title: 'City Landscapes',
    photos: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80'
    ]
  },
  {
    title: 'Beach Vacations',
    photos: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80'
    ]
  },
  {
    title: 'Mountain Adventures',
    photos: [
      'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80'
    ]
  },
  {
    title: 'Food Experiences',
    photos: [
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80'
    ]
  },
  {
    title: 'Forest Walks',
    photos: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80'
    ]
  },
  {
    title: 'Architecture',
    photos: [
      'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80'
    ]
  },
  {
    title: 'Sunset Views',
    photos: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80'
    ]
  },
  {
    title: 'Urban Life',
    photos: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80'
    ]
  },
  {
    title: 'Nature Beauty',
    photos: [
      'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80'
    ]
  },
  {
    title: 'Travel Memories',
    photos: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80'
    ]
  }
])
</script>

<script>
export default {
  name: 'Profile'
}
</script>

<style scoped>
.tab-enter-active,
.tab-leave-active {
  transition: opacity 0.3s;
}

.tab-enter-from,
.tab-leave-to {
  opacity: 0;
}
</style>

<style>
/* 渐变动画 */
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradientAnimation 4s ease infinite;
}
</style>
