import * as fs from 'fs';
import * as path from 'path';

export interface Scene {
  title: string;
  subtitle: string;
  duration: number;
  background?: string;
  titleColor?: string;
  subtitleColor?: string;
  animation?: 'fade' | 'slide' | 'zoom';
}

export interface ScriptConfig {
  defaultDuration?: number;
  defaultBackground?: string;
  defaultTitleColor?: string;
  defaultSubtitleColor?: string;
  defaultAnimation?: 'fade' | 'slide' | 'zoom';
}

/**
 * 解析 Markdown 格式的视频脚本
 *
 * 格式示例：
 * ---
 * ## 标题
 * 副标题
 * **时长**: 10秒
 * **背景**: #667eea
 * **动画**: fade
 * ---
 */
export function parseMarkdownScript(filePath: string, config?: ScriptConfig): Scene[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const scenes: Scene[] = [];

  // 默认配置
  const defaults = {
    duration: config?.defaultDuration || 10,
    background: config?.defaultBackground,
    titleColor: config?.defaultTitleColor,
    subtitleColor: config?.defaultSubtitleColor,
    animation: config?.defaultAnimation || 'fade' as const,
  };

  // 按 --- 分割场景
  const blocks = content.split(/---+/).filter(block => block.trim());

  for (const block of blocks) {
    const lines = block.trim().split('\n').filter(line => line.trim());

    let title = '';
    let subtitle = '';
    let duration = defaults.duration;
    let background = defaults.background;
    let titleColor = defaults.titleColor;
    let subtitleColor = defaults.subtitleColor;
    let animation = defaults.animation;

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
      const scene: Scene = { title, subtitle, duration };
      if (background) scene.background = background;
      if (titleColor) scene.titleColor = titleColor;
      if (subtitleColor) scene.subtitleColor = subtitleColor;
      if (animation) scene.animation = animation;
      scenes.push(scene);
    }
  }

  return scenes;
}

/**
 * 解析 JSON 格式的视频脚本（保持向后兼容）
 */
export function parseJsonScript(filePath: string): Scene[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

/**
 * 自动检测并解析脚本文件
 */
export function parseScript(filePath: string, config?: ScriptConfig): Scene[] {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.md' || ext === '.markdown') {
    return parseMarkdownScript(filePath, config);
  } else if (ext === '.json') {
    return parseJsonScript(filePath);
  } else {
    throw new Error(`Unsupported script format: ${ext}. Use .md or .json`);
  }
}
