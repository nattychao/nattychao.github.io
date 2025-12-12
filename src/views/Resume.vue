<script setup>
import { Briefcase, GraduationCap, Code, User, Mail, Github, Linkedin, Globe, BookOpen, Award, Star } from 'lucide-vue-next'

// 个人简介
const bio = "拥有6年iOS开发经验，精通Swift和Objective-C，熟悉UIKit、SwiftUI、Combine等主流框架。专注于高性能、高可用的移动应用开发，具备丰富的团队协作和项目管理经验。"

// 工作经历
const experience = [
  {
    role: '高级iOS开发工程师',
    company: '科技有限公司',
    period: '2023 - 至今',
    description: '负责公司核心iOS应用的架构设计和开发，带领3人iOS团队完成多个重要功能模块的开发。',
    achievements: [
      '重构了应用的网络层，使用Combine框架实现响应式编程，提升了网络请求效率30%',
      '优化了应用的启动时间，从4.5秒降低到1.8秒，提升用户体验',
      '实现了基于SwiftUI的全新设置界面，提高了代码复用率和维护性',
      '主导了应用从Objective-C到Swift的渐进式迁移，完成了70%代码的迁移工作',
      '引入了单元测试和UI测试，测试覆盖率从20%提升到65%'
    ],
    techStack: ['Swift', 'Objective-C', 'UIKit', 'SwiftUI', 'Combine', 'Core Data', 'RxSwift', 'Fastlane', 'Jenkins']
  },
  {
    role: 'iOS开发工程师',
    company: '互联网公司',
    period: '2020 - 2023',
    description: '参与公司电商iOS应用的开发和维护，负责商品详情、购物车、订单流程等核心模块。',
    achievements: [
      '开发了商品详情页的动态渲染引擎，支持多种商品类型的灵活展示',
      '实现了购物车的本地缓存和同步机制，提高了离线体验',
      '优化了订单提交流程，减少了用户操作步骤，提升了转化率15%',
      '修复了多个性能瓶颈，使应用在低端设备上的流畅度提升40%'
    ],
    techStack: ['Objective-C', 'Swift', 'UIKit', 'AFNetworking', 'SDWebImage', 'FMDB', 'Cocoapods']
  },
  {
    role: '初级iOS开发工程师',
    company: '软件有限公司',
    period: '2019 - 2020',
    description: '参与企业级iOS应用的开发，负责基础功能模块的实现和维护。',
    achievements: [
      '开发了用户登录注册、个人中心等基础功能',
      '参与了应用的国际化和本地化工作，支持5种语言',
      '学习并掌握了iOS开发的核心技术和最佳实践'
    ],
    techStack: ['Objective-C', 'UIKit', 'AFNetworking', 'MBProgressHUD', 'Masonry']
  }
]

// 项目经验
const projects = [
  {
    name: '电商购物APP',
    description: '一款功能完整的电商购物应用，支持商品浏览、搜索、购买、支付等核心功能。',
    techStack: ['Swift', 'UIKit', 'SwiftUI', 'Combine', 'Core Data', 'Alamofire', 'SnapKit'],
    role: '核心开发者',
    achievements: [
      '负责商品详情页、购物车、订单流程等核心模块的开发',
      '实现了基于Core Data的本地数据缓存，提高了离线体验',
      '优化了应用的性能，使启动时间降低了50%',
      '参与了应用的架构设计和技术选型'
    ]
  },
  {
    name: '新闻资讯APP',
    description: '一款个性化新闻资讯应用，支持根据用户兴趣推荐内容。',
    techStack: ['Swift', 'UIKit', 'RxSwift', 'MVVM', 'Kingfisher', 'Firebase'],
    role: '独立开发者',
    achievements: [
      '独立完成了整个应用的开发，包括UI设计、功能实现、API集成等',
      '实现了基于Firebase的用户认证和数据分析',
      '应用在App Store上线，获得了4.8/5的评分',
      '实现了夜间模式、字体大小调整等用户友好功能'
    ]
  },
  {
    name: '企业OA系统',
    description: '一款企业级办公自动化应用，支持审批、考勤、日程等功能。',
    techStack: ['Objective-C', 'UIKit', 'AFNetworking', 'FMDB', 'Masonry'],
    role: '开发者',
    achievements: [
      '负责审批流程模块的开发，支持多种审批类型',
      '实现了基于FMDB的本地数据存储',
      '参与了应用的安全加固，防止数据泄露'
    ]
  }
]

// 技能分类
const skills = {
  '编程语言': ['Swift', 'Objective-C', 'C++', 'Python'],
  '开发框架': ['UIKit', 'SwiftUI', 'Combine', 'Core Data', 'RxSwift', 'Alamofire', 'SnapKit'],
  '工具和技术': ['Xcode', 'Git', 'Cocoapods', 'Fastlane', 'Jenkins', 'Firebase', 'App Store Connect'],
  '设计模式': ['MVC', 'MVVM', 'VIPER', 'Singleton', 'Delegate', 'Observer'],
  '其他': ['iOS SDK', 'RESTful API', 'JSON', 'XML', 'Unit Testing', 'UI Testing', '性能优化', '内存管理']
}

// 教育背景
const education = [
  {
    degree: '计算机科学与技术 学士',
    school: '科技大学',
    period: '2015 - 2019',
    gpa: '3.8/4.0',
    honors: ['优秀毕业生', '校级奖学金', '计算机协会会长']
  }
]

// 证书和认证
const certifications = [
  {
    name: 'Apple Developer Program',
    issuer: 'Apple',
    period: '2019 - 至今'
  },
  {
    name: 'iOS Developer Certificate',
    issuer: 'Coursera',
    period: '2020'
  },
  {
    name: 'Swift Programming Language',
    issuer: 'Apple',
    period: '2021'
  }
]

// 技术博客和开源贡献
const contributions = [
  {
    type: '技术博客',
    name: 'iOS开发笔记',
    url: 'https://blog.example.com',
    description: '分享iOS开发经验和技术文章，累计访问量超过10万'
  },
  {
    type: '开源项目',
    name: 'SwiftJSONParser',
    url: 'https://github.com/example/SwiftJSONParser',
    description: '一个轻量级的JSON解析库，获得了500+ stars'
  },
  {
    type: '技术分享',
    name: 'SwiftUI在实际项目中的应用',
    event: 'iOS开发者大会',
    period: '2023'
  }
]
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20"
    :style="{ paddingTop: 'calc(64px + var(--safe-area-inset-top, 0px) + 2rem)' }">
    <!-- Header -->
    <div
      class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-slate-100 mb-6 sm:mb-8 md:mb-12 flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8">
      <div class="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
        <img
          src="https://avatars.githubusercontent.com/u/26376013?s=4000&u=0de45a7006d3bcded69f813ba870dceaf9ccf870&v=4"
          alt="Natty Chao" class="w-full h-full object-cover">
      </div>
      <div class="text-center md:text-left flex-grow">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-1.5 sm:mb-2">Natty Chao</h1>
        <p class="text-base sm:text-lg md:text-xl text-theme-600 font-medium mb-3 sm:mb-4">高级iOS开发工程师</p>
        <p class="text-slate-600 text-sm sm:text-base mb-3 sm:mb-4">拥有6年iOS开发经验，精通Swift和Objective-C，专注于高性能、高可用的移动应用开发
        </p>
        <div
          class="flex flex-col sm:flex-row sm:flex-wrap justify-center md:justify-start gap-2 sm:gap-3 md:gap-4 text-slate-600 text-xs sm:text-sm md:text-base">
          <a href="mailto:nattychaoo@gmail.com"
            class="flex items-center gap-1.5 sm:gap-2 md:hover:text-theme-600 transition-colors">
            <Mail class="w-3.5 h-3.5 sm:w-4 sm:h-4" /> nattychaoo@gmail.com
          </a>
          <a href="https://github.com/nattychao" target="_blank"
            class="flex items-center gap-1.5 sm:gap-2 md:hover:text-theme-600 transition-colors">
            <Github class="w-3.5 h-3.5 sm:w-4 sm:h-4" /> nattychao
          </a>
          <a href="https://linkedin.com/in/nattychao" target="_blank"
            class="flex items-center gap-1.5 sm:gap-2 md:hover:text-theme-600 transition-colors">
            <Linkedin class="w-3.5 h-3.5 sm:w-4 sm:h-4" /> nattychao
          </a>
          <a href="https://nattychao.github.io" target="_blank"
            class="flex items-center gap-1.5 sm:gap-2 md:hover:text-theme-600 transition-colors">
            <Globe class="w-3.5 h-3.5 sm:w-4 sm:h-4" /> nattychao.github.io
          </a>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
      <!-- Main Content -->
      <div class="md:col-span-2 space-y-8 sm:space-y-10 md:space-y-12">
        <!-- Experience -->
        <section>
          <h2
            class="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <div class="p-1.5 sm:p-2 bg-theme-100 rounded-lg text-theme-600">
              <Briefcase class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            工作经历
          </h2>
          <div class="space-y-6 sm:space-y-8">
            <div v-for="(job, index) in experience" :key="index"
              class="relative pl-6 sm:pl-8 border-l-2 border-slate-200 last:border-0 pb-6 sm:pb-8 last:pb-0">
              <div
                class="absolute -left-[7px] sm:-left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white border-2 border-theme-600">
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-slate-900">{{ job.role }}</h3>
              <div class="text-theme-600 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">{{ job.company }} •
                {{ job.period }}
              </div>
              <p class="text-slate-600 text-sm sm:text-base mb-3 sm:mb-4">{{ job.description }}</p>

              <!-- Achievements -->
              <div class="mb-3 sm:mb-4">
                <ul class="space-y-1.5 sm:space-y-2">
                  <li v-for="(achievement, achIndex) in job.achievements" :key="achIndex"
                    class="text-slate-600 text-sm sm:text-base flex items-start gap-2">
                    <span class="text-theme-600 mt-1.5 sm:mt-2 flex-shrink-0">•</span>
                    <span>{{ achievement }}</span>
                  </li>
                </ul>
              </div>

              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-1.5 sm:gap-2">
                <span v-for="(tech, techIndex) in job.techStack" :key="techIndex"
                  class="px-2 sm:px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- Projects -->
        <section>
          <h2
            class="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <div class="p-1.5 sm:p-2 bg-purple-100 rounded-lg text-purple-600">
              <Code class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            项目经验
          </h2>
          <div class="space-y-6 sm:space-y-8">
            <div v-for="(project, index) in projects" :key="index"
              class="relative pl-6 sm:pl-8 border-l-2 border-purple-200 last:border-0 pb-6 sm:pb-8 last:pb-0">
              <div
                class="absolute -left-[7px] sm:-left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white border-2 border-purple-600">
              </div>
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-1">
                <h3 class="text-lg sm:text-xl font-bold text-slate-900">{{ project.name }}</h3>
                <span class="text-purple-600 text-xs sm:text-sm font-medium px-2 py-1 bg-purple-50 rounded-full">
                  {{ project.role }}
                </span>
              </div>
              <p class="text-slate-600 text-sm sm:text-base mb-3 sm:mb-4">{{ project.description }}</p>

              <!-- Achievements -->
              <div class="mb-3 sm:mb-4">
                <ul class="space-y-1.5 sm:space-y-2">
                  <li v-for="(achievement, achIndex) in project.achievements" :key="achIndex"
                    class="text-slate-600 text-sm sm:text-base flex items-start gap-2">
                    <span class="text-purple-600 mt-1.5 sm:mt-2 flex-shrink-0">•</span>
                    <span>{{ achievement }}</span>
                  </li>
                </ul>
              </div>

              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-1.5 sm:gap-2">
                <span v-for="(tech, techIndex) in project.techStack" :key="techIndex"
                  class="px-2 sm:px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- Contributions -->
        <section>
          <h2
            class="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <div class="p-1.5 sm:p-2 bg-green-100 rounded-lg text-green-600">
              <BookOpen class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            技术贡献
          </h2>
          <div class="space-y-6 sm:space-y-8">
            <div v-for="(contribution, index) in contributions" :key="index"
              class="relative pl-6 sm:pl-8 border-l-2 border-green-200 last:border-0 pb-6 sm:pb-8 last:pb-0">
              <div
                class="absolute -left-[7px] sm:-left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white border-2 border-green-600">
              </div>
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-1">
                <h3 class="text-lg sm:text-xl font-bold text-slate-900">{{ contribution.name }}</h3>
                <span class="text-green-600 text-xs sm:text-sm font-medium px-2 py-1 bg-green-50 rounded-full">
                  {{ contribution.type }}
                </span>
              </div>
              <p class="text-slate-600 text-sm sm:text-base mb-3 sm:mb-4">{{ contribution.description }}</p>

              <!-- Additional Info -->
              <div v-if="contribution.url" class="mb-2 sm:mb-3">
                <a :href="contribution.url" target="_blank"
                  class="text-theme-600 md:hover:underline text-sm sm:text-base flex items-center gap-1.5">
                  <Globe class="w-3.5 h-3.5" /> {{ contribution.url }}
                </a>
              </div>

              <div v-if="contribution.event" class="text-slate-500 text-xs sm:text-sm">
                {{ contribution.event }} • {{ contribution.period }}
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Sidebar -->
      <div class="space-y-8 sm:space-y-10 md:space-y-12">
        <!-- Skills -->
        <section>
          <h2 class="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2">
            <User class="w-4 h-4 sm:w-5 sm:h-5 text-theme-600" /> 技能
          </h2>

          <div class="space-y-3 sm:space-y-4">
            <div v-for="(skillList, category) in skills" :key="category">
              <h3 class="text-sm sm:text-base font-medium text-slate-800 mb-2">{{ category }}</h3>
              <div class="flex flex-wrap gap-1.5 sm:gap-2">
                <span v-for="skill in skillList" :key="skill"
                  class="px-2 sm:px-3 py-1 bg-theme-50 text-theme-700 rounded-lg text-xs sm:text-sm font-medium">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- Education -->
        <section>
          <h2 class="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2">
            <GraduationCap class="w-4 h-4 sm:w-5 sm:h-5 text-theme-600" /> 教育背景
          </h2>
          <div v-for="(edu, index) in education" :key="index" class="mb-4 sm:mb-5">
            <h3 class="font-bold text-slate-900 text-sm sm:text-base">{{ edu.school }}</h3>
            <div class="text-slate-600 text-xs sm:text-sm">{{ edu.degree }}</div>
            <div class="text-slate-400 text-xs sm:text-sm mb-2 sm:mb-3">{{ edu.period }} • GPA: {{ edu.gpa }}</div>

            <!-- Honors -->
            <div class="space-y-1">
              <div v-for="(honor, honorIndex) in edu.honors" :key="honorIndex"
                class="text-slate-600 text-xs sm:text-sm flex items-center gap-1.5">
                <Award class="w-3 h-3 text-amber-500 flex-shrink-0" />
                <span>{{ honor }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Certifications -->
        <section>
          <h2 class="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2">
            <Star class="w-4 h-4 sm:w-5 sm:h-5 text-theme-600" /> 证书和认证
          </h2>
          <div class="space-y-3 sm:space-y-4">
            <div v-for="(cert, index) in certifications" :key="index" class="flex flex-col">
              <h3 class="font-medium text-slate-800 text-sm sm:text-base">{{ cert.name }}</h3>
              <div class="text-slate-500 text-xs sm:text-sm">{{ cert.issuer }} • {{ cert.period }}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Resume'
}
</script>
