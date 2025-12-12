<script setup>
import { ref } from 'vue'
import { Mail, Phone, MapPin, Clock, Github, Linkedin, Send } from 'lucide-vue-next'
import { useToast } from '@/composables/useToast.js'

const { showToast } = useToast()

// 表单数据
const formData = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
})

// 表单验证
const formErrors = ref({})

// 表单提交状态
const isSubmitting = ref(false)

// 验证表单
const validateForm = () => {
    const errors = {}

    if (!formData.value.name.trim()) {
        errors.name = '请输入您的姓名'
    }

    if (!formData.value.email.trim()) {
        errors.email = '请输入您的邮箱'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
        errors.email = '请输入有效的邮箱地址'
    }

    if (!formData.value.subject.trim()) {
        errors.subject = '请输入主题'
    }

    if (!formData.value.message.trim()) {
        errors.message = '请输入留言内容'
    }

    formErrors.value = errors
    return Object.keys(errors).length === 0
}

// 提交表单
const submitForm = () => {
    if (!validateForm()) return

    isSubmitting.value = true

    // 构建表单数据为message字符串，确保每项表单数据和留言内容中的换行都能被正确显示
    const message = `
**联系宋朝**

姓名：${formData.value.name}\n\n邮箱：${formData.value.email}\n\n主题：${formData.value.subject}\n\n留言内容：\n${formData.value.message}
    `.trim()

    // 构建请求参数
    const pars = {
        msgtype: 'markdown',
        markdown: {
            title: 'YEHWANG意见反馈',
            text: message
        }
    }

    // 根据环境选择不同的接口URL
    // 开发环境使用Vite代理，生产环境直接调用钉钉接口
    const apiUrl = import.meta.env.DEV
        ? '/api/dingtalk?access_token=181aa4e0625b37819a04749f196c539335d4ebb3a3bc028e93380bc6c303d5ca'
        : 'https://oapi.dingtalk.com/robot/send?access_token=181aa4e0625b37819a04749f196c539335d4ebb3a3bc028e93380bc6c303d5ca'

    // 发送请求到钉钉机器人接口
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pars)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('网络请求失败')
            }
            return response.json()
        })
        .then(data => {
            isSubmitting.value = false
            if (data.errcode === 0) {
                showToast('留言已发送，我会尽快回复您！', 'success')
                // 重置表单
                formData.value = {
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                }
                formErrors.value = {}
            } else {
                showToast('留言发送失败，请稍后重试！', 'error')
                console.error('发送失败：', data.errmsg)
            }
        })
        .catch(error => {
            isSubmitting.value = false
            showToast('留言发送失败，请检查网络连接！', 'error')
            console.error('请求错误：', error)
        })
}
</script>

<template>
    <div class="space-y-0">
        <!-- Hero Section -->
        <section
            class="relative flex items-center justify-center overflow-hidden h-[max(calc(40vh),_320px)] md:h-[max(calc(60vh),_500px)]">
            <div class="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Contact Background" class="w-full h-full object-cover" />
                <div
                    class="absolute inset-0 bg-gradient-to-b from-theme-900/80 to-theme-900/60 backdrop-blur-sm z-10 pointer-events-none">
                </div>
            </div>

            <div class="px-4 sm:px-6 lg:px-8 relative z-20 w-full max-w-5xl mx-auto text-center">
                <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-theme-300 to-purple-300">
                        联系我
                    </span>
                </h1>
                <p class="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                    有任何问题或合作意向，欢迎随时联系我
                </p>
            </div>
        </section>

        <!-- Main Content -->
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <!-- 联系信息 -->
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 h-full">
                        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-6">联系方式</h2>

                        <div class="space-y-6">
                            <!-- 邮箱 -->
                            <div class="flex items-start gap-4">
                                <div
                                    class="w-10 h-10 rounded-lg bg-theme-100 flex items-center justify-center flex-shrink-0">
                                    <Mail class="w-5 h-5 text-theme-600" />
                                </div>
                                <div>
                                    <h3 class="text-sm font-medium text-slate-500 mb-1">邮箱</h3>
                                    <a href="mailto:nattychaoo@gmail.com"
                                        class="text-slate-900 hover:text-theme-600 transition-colors">
                                        nattychaoo@gmail.com
                                    </a>
                                </div>
                            </div>

                            <!-- 社交媒体 -->
                            <div>
                                <h3 class="text-sm font-medium text-slate-500 mb-3">社交媒体</h3>
                                <div class="flex gap-3">
                                    <a href="https://github.com/nattychao" target="_blank" rel="noopener noreferrer"
                                        class="w-10 h-10 rounded-lg bg-theme-100 flex items-center justify-center hover:bg-theme-200 transition-colors">
                                        <Github class="w-5 h-5 text-theme-600" />
                                    </a>
                                    <a href="https://linkedin.com/in/nattychao" target="_blank"
                                        rel="noopener noreferrer"
                                        class="w-10 h-10 rounded-lg bg-theme-100 flex items-center justify-center hover:bg-theme-200 transition-colors">
                                        <Linkedin class="w-5 h-5 text-theme-600" />
                                    </a>
                                </div>
                            </div>

                            <!-- 工作时间 -->
                            <div>
                                <h3 class="text-sm font-medium text-slate-500 mb-3">工作时间</h3>
                                <div class="space-y-2">
                                    <div class="flex justify-between">
                                        <span class="text-slate-600">周一至周五</span>
                                        <span class="text-slate-900 font-medium">9:00 - 18:00</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-slate-600">周六</span>
                                        <span class="text-slate-900 font-medium">10:00 - 16:00</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-slate-600">周日</span>
                                        <span class="text-slate-900 font-medium">休息</span>
                                    </div>
                                </div>
                            </div>

                            <!-- 地理位置 -->
                            <div>
                                <h3 class="text-sm font-medium text-slate-500 mb-3">地理位置</h3>
                                <div class="flex items-start gap-4">
                                    <div
                                        class="w-10 h-10 rounded-lg bg-theme-100 flex items-center justify-center flex-shrink-0">
                                        <MapPin class="w-5 h-5 text-theme-600" />
                                    </div>
                                    <div>
                                        <p class="text-slate-900">上海市浦东新区</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 联系表单 -->
                <div class="lg:col-span-3">
                    <div class="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
                        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-6">发送留言</h2>

                        <form @submit.prevent="submitForm">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                                <!-- 姓名 -->
                                <div>
                                    <label for="name"
                                        class="block text-sm font-medium text-slate-700 mb-1.5">您的姓名</label>
                                    <input type="text" id="name" v-model="formData.name"
                                        class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-theme-400 focus:border-transparent transition-all"
                                        placeholder="请输入您的姓名" />
                                    <p v-if="formErrors.name" class="text-red-500 text-xs mt-1">{{ formErrors.name }}
                                    </p>
                                </div>

                                <!-- 邮箱 -->
                                <div>
                                    <label for="email"
                                        class="block text-sm font-medium text-slate-700 mb-1.5">您的邮箱</label>
                                    <input type="email" id="email" v-model="formData.email"
                                        class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-theme-400 focus:border-transparent transition-all"
                                        placeholder="请输入您的邮箱" />
                                    <p v-if="formErrors.email" class="text-red-500 text-xs mt-1">{{ formErrors.email }}
                                    </p>
                                </div>
                            </div>

                            <!-- 主题 -->
                            <div class="mb-4 sm:mb-5">
                                <label for="subject" class="block text-sm font-medium text-slate-700 mb-1.5">主题</label>
                                <input type="text" id="subject" v-model="formData.subject"
                                    class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-theme-400 focus:border-transparent transition-all"
                                    placeholder="请输入留言主题" />
                                <p v-if="formErrors.subject" class="text-red-500 text-xs mt-1">{{ formErrors.subject }}
                                </p>
                            </div>

                            <!-- 留言内容 -->
                            <div class="mb-5 sm:mb-6">
                                <label for="message"
                                    class="block text-sm font-medium text-slate-700 mb-1.5">留言内容</label>
                                <textarea id="message" v-model="formData.message" rows="5"
                                    class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-theme-400 focus:border-transparent transition-all resize-none"
                                    placeholder="请输入您的留言内容"></textarea>
                                <p v-if="formErrors.message" class="text-red-500 text-xs mt-1">{{ formErrors.message }}
                                </p>
                            </div>

                            <!-- 提交按钮 -->
                            <button type="submit" :disabled="isSubmitting"
                                class="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-theme-600 text-white rounded-full font-bold hover:bg-theme-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                <span v-if="!isSubmitting">发送留言</span>
                                <span v-else>发送中...</span>
                                <Send class="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Contact'
}
</script>
