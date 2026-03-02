#!/usr/bin/env node

/**
 * 将 Markdown 格式的脚本转换为 JSON 格式
 * 用法: node scripts/convert-script.js input/script.md
 */

const fs = require('fs');
const path = require('path');

function parseMarkdownScript(content) {
  const result = {
    metadata: {
      template: 'TextAnimation', // default
      platform: 'TikTok',        // default
    },
    scenes: [],
  };

  // 尝试匹配 frontmatter YAML (用 --- 封闭的顶部区域)
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

  let sceneContent = content;

  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    // 从原始内容中移除 frontmatter 部分，剩下的就是场景部分
    sceneContent = content.slice(frontmatterMatch[0].length);

    // 简单解析 frontmatter (只处理 key: value)
    const lines = frontmatter.split('\n');
    for (const line of lines) {
      if (line.includes(':')) {
        const [key, ...valueParts] = line.split(':');
        const k = key.trim();
        const v = valueParts.join(':').trim().replace(/['"]/g, ''); // 移除可能的引号

        // 允许可选的主题或其他随意字段
        if (k) {
          result.metadata[k] = v;
        }
      }
    }
  }

  // 按 --- 分割剩余的场景
  const blocks = sceneContent.split(/---+/).filter(block => block.trim());

  for (const block of blocks) {
    const lines = block.trim().split('\n').filter(line => line.trim());

    let title = '';
    let subtitle = '';
    let duration = 10; // 默认10秒
    let background = undefined;
    let titleColor = undefined;
    let subtitleColor = undefined;
    let animation = undefined;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // 跳过注释和空行
      if (line.startsWith('>') || (line.startsWith('#') && !line.startsWith('##'))) {
        continue;
      }

      // 解析标题（## 开头）
      if (line.startsWith('##')) {
        title = line.replace(/^##\s*/, '').trim();
      }
      // 解析配置项
      else if (line.startsWith('**') && line.includes(':')) {
        const configMatch = line.match(/\*\*(.+?)\*\*\s*[:：]\s*(.+)/);
        if (configMatch) {
          const key = configMatch[1].trim().toLowerCase();
          const value = configMatch[2].trim();

          if (key === '时长' || key === 'duration') {
            const durationMatch = value.match(/(\d+)/);
            if (durationMatch) {
              duration = parseInt(durationMatch[1], 10);
            }
          } else if (key === '背景' || key === 'background') {
            background = value;
          } else if (key === '标题颜色' || key === 'title color') {
            titleColor = value;
          } else if (key === '副标题颜色' || key === 'subtitle color') {
            subtitleColor = value;
          } else if (key === '动画' || key === 'animation') {
            if (value === 'fade' || value === 'slide' || value === 'zoom') {
              animation = value;
            }
          }
        }
      }
      // 其他非空行作为副标题
      else if (line && !line.startsWith('**') && !line.startsWith('*') && subtitle === '') {
        subtitle = line;
      }
    }

    // 只添加有标题的场景
    if (title) {
      const scene = { title, subtitle, duration };
      if (background) scene.background = background;
      if (titleColor) scene.titleColor = titleColor;
      if (subtitleColor) scene.subtitleColor = subtitleColor;
      if (animation) scene.animation = animation;
      result.scenes.push(scene);
    }
  }

  return result;
}

// 主程序
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('用法: node scripts/convert-script.js <markdown-file>');
  console.log('示例: node scripts/convert-script.js input/script-template.md');
  process.exit(1);
}

const inputFile = args[0];

if (!fs.existsSync(inputFile)) {
  console.error(`错误: 文件不存在 ${inputFile}`);
  process.exit(1);
}

const content = fs.readFileSync(inputFile, 'utf-8');
const scriptData = parseMarkdownScript(content);

// 输出到 public/scriptData.json (为了区分以前单纯包含 scenes 数组的文件)
const outputFile = path.join(__dirname, '../public/scriptData.json');
fs.writeFileSync(outputFile, JSON.stringify(scriptData, null, 2));

console.log(`✅ 解析完成! 模板: ${scriptData.metadata.template}, 平台: ${scriptData.metadata.platform}`);
console.log(`✅ 成功转换 ${scriptData.scenes.length} 个场景`);
console.log(`📁 输出文件: ${outputFile}`);
console.log('\n场景预览:');
scriptData.scenes.forEach((scene, index) => {
  console.log(`  ${index + 1}. ${scene.title} (${scene.duration}秒)`);
});
