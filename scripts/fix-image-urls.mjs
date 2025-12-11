#!/usr/bin/env node

// 用于修复从GitHub下载的markdown文件中的图片URL
// 将相对路径转换为完整的GitHub Raw URL

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置参数
const config = {
  // 从markdown文件名推断出的GitHub仓库信息
  repoOwner: 'cjwirth',
  repoName: 'awesome-ios-ui',
  repoBranch: 'master', // 已经验证master分支是正确的
  
  // 相对路径前缀
  relativePrefix: '/assets/',
  
  // 要处理的目录
  postsDir: path.resolve(__dirname, '../public/posts')
};

// 生成完整的GitHub Raw URL
function generateGitHubRawUrl(imagePath) {
  // 移除相对路径前缀
  const imageName = imagePath.replace(config.relativePrefix, '');
  // 构建完整的GitHub Raw URL
  return `https://raw.githubusercontent.com/${config.repoOwner}/${config.repoName}/${config.repoBranch}/assets/${imageName}`;
}

// 处理单个markdown文件
function processMarkdownFile(filePath) {
  console.log(`处理文件: ${path.basename(filePath)}`);
  
  // 读取文件内容
  const content = fs.readFileSync(filePath, 'utf8');
  
  // 使用更简单的方法：直接替换所有相对路径的图片URL
  let newContent = content;
  let replacementCount = 0;
  
  // 查找所有以 /assets/ 开头的图片URL
  const searchStr = '<img src="/assets/';
  const searchStrLength = searchStr.length;
  
  let index = 0;
  while ((index = newContent.indexOf(searchStr, index)) !== -1) {
    // 找到完整的img标签的结束位置
    let imgTagEnd = newContent.indexOf('>', index);
    if (imgTagEnd !== -1) {
        // 提取完整的img标签
        const imageTag = newContent.substring(index, imgTagEnd + 1);
        // 提取src属性中的完整路径
        const srcMatch = imageTag.match(/src="([^"]+)"/);
        
        if (srcMatch && srcMatch[1]) {
          const fullRelativePath = srcMatch[1];
          // 移除开头的斜杠
          const relativePath = fullRelativePath.startsWith('/') ? fullRelativePath.substring(1) : fullRelativePath;
          const fullUrl = `https://raw.githubusercontent.com/${config.repoOwner}/${config.repoName}/${config.repoBranch}/${relativePath}`;
        
          // 构建新的img标签
          const newImgTag = `<img src="${fullUrl}">`;
        
          // 替换旧标签
          newContent = newContent.substring(0, index) + newImgTag + newContent.substring(imgTagEnd + 1);
        
          console.log(`  替换: ${fullRelativePath} -> ${fullUrl}`);
          replacementCount++;
        
          // 更新索引以继续查找
          index += newImgTag.length;
        } else {
          // 没有找到src属性，跳过
          index += imageTag.length;
        }
    } else {
      // 没有找到结束标签，跳过
      index += searchStrLength;
    }
  }
  
  if (replacementCount === 0) {
    console.log('  无图片URL需要替换');
    return;
  }
  
  // 保存文件
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`  文件已更新，共替换 ${replacementCount} 个图片URL`);
}

// 处理目录下所有markdown文件
function processAllMarkdownFiles() {
  console.log('开始处理markdown文件中的图片URL...');
  console.log(`配置: ${config.repoOwner}/${config.repoName} @ ${config.repoBranch}`);
  console.log(`处理目录: ${config.postsDir}`);
  console.log('='.repeat(60));
  
  // 直接处理指定的文件
  const filePath = path.join(config.postsDir, 'cjwirth-awesome-ios-ui.md');
  processMarkdownFile(filePath);
  
  console.log('='.repeat(60));
  console.log('所有文件处理完成!');
}

// 运行脚本
processAllMarkdownFiles();
