# AutoReels 🎬

自动化短视频生成引擎 - 将脚本转换为精美视频

## 核心理念

**AutoReels 不生成内容，只生成视频。**

- 你用任何工具（ChatGPT、Claude、手动编写）创建脚本
- AutoReels 将脚本转换为带配音的视频
- 专注做好一件事：脚本 → 视频

## 功能特性

- 🎙️ **AI 语音合成**: 集成 ElevenLabs，支持声音克隆
- 🎨 **可定制模板**: 灵活的视频模板系统
- 🌍 **多语言支持**: 支持中英文视频生成
- ⚡ **一键生成**: 从脚本到成品视频

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量（可选）

如果需要使用 ElevenLabs 生成配音：

```bash
cp .env.example .env
# 编辑 .env 添加 ELEVENLABS_API_KEY
```

### 3. 准备脚本

创建视频脚本文件，支持两种格式：

**方式 A：Markdown 格式（推荐）**

创建 `.md` 文件（参考 `input/script-template.md`）：

```markdown
---
## 场景标题
场景副标题
**时长**: 10秒
**动画**: fade
---
```

**支持的配置选项**：
- `**时长**` / `**Duration**`: 场景时长（秒）
- `**动画**` / `**Animation**`: 动画类型（fade/slide/zoom）
- `**标题颜色**` / `**Title Color**`: 标题文字颜色（CSS 颜色值）
- `**副标题颜色**` / `**Subtitle Color**`: 副标题文字颜色（CSS 颜色值）
- `**背景**` / `**Background**`: 场景背景色（CSS 颜色值）

**方式 B：JSON 格式**

创建 `.json` 文件（参考 `input/script-template.json`）：

```json
[
  {
    "title": "主标题",
    "subtitle": "副标题",
    "duration": 10,
    "animation": "fade",
    "titleColor": "#FFFFFF",
    "subtitleColor": "rgba(255, 255, 255, 0.85)"
  }
]
```

### 4. 生成视频

```bash
# 1. 转换脚本（如果使用 Markdown 格式）
node scripts/convert-script.js input/script-template.md

# 2. 启动可视化预览
npm start

# 3. 在浏览器中预览视频
# Remotion Studio 会自动打开，你可以实时预览和调整视频
```

## 使用示例

### 示例 1：基础视频脚本

创建 `input/my-video.md`：

```markdown
---
## 欢迎
这是我的第一个视频
**时长**: 5秒
---

## 第二个场景
添加更多内容
**时长**: 8秒
---
```

转换并预览：
```bash
node scripts/convert-script.js input/my-video.md
npm start
```

### 示例 2：使用自定义动画

```markdown
---
## 标题场景
使用缩放动画
**时长**: 6秒
**动画**: zoom
---

## 内容场景
使用滑动动画
**时长**: 10秒
**动画**: slide
---
```

### 示例 3：自定义颜色

```markdown
---
## 彩色标题
这个场景使用金色标题
**时长**: 8秒
**标题颜色**: #FFD700
**副标题颜色**: #FFA500
**动画**: fade
---
```

## 使用方法

### 快速开始

1. **创建脚本**：编写 Markdown 或 JSON 格式的视频脚本
2. **转换脚本**：`node scripts/convert-script.js input/your-script.md`
3. **预览视频**：`npm start` 启动 Remotion Studio
4. **调整优化**：在 Studio 中实时预览和调整
5. **渲染输出**：使用 Remotion 渲染最终视频

### 创建脚本的方式

### 创建脚本的方式

**选项 A：用 AI 生成**
```
提示词：将以下内容转换为7个短视频场景，每个场景包含标题和副标题，
使用 Markdown 格式，每个场景用 --- 分隔...
```

**选项 B：手动编写**
复制 `input/script-template.md`，修改内容

**选项 C：从长文本提炼**
用 ChatGPT/Claude 提炼关键点，整理成 Markdown 格式

## 脚本格式

### 基础格式

```json
[
  {
    "title": "场景标题",
    "subtitle": "场景副标题",
    "duration": 10
  }
]
```

### 完整格式（支持所有选项）

```json
[
  {
    "title": "场景标题",
    "subtitle": "场景副标题",
    "duration": 10,
    "animation": "fade",
    "titleColor": "#FFFFFF",
    "subtitleColor": "rgba(255, 255, 255, 0.85)",
    "background": "#667eea"
  }
]
```

**字段说明**：
- `title`: 主标题（大字体）- 必填
- `subtitle`: 副标题（小字体）- 必填
- `duration`: 场景时长（秒）- 必填
- `animation`: 动画类型（fade/slide/zoom）- 可选，默认 fade
- `titleColor`: 标题颜色 - 可选，默认白色
- `subtitleColor`: 副标题颜色 - 可选，默认半透明白色
- `background`: 场景背景色 - 可选，使用视频默认背景

## 项目结构

```
autoreels/
├── config/              # 配置文件
│   ├── video.json      # 视频参数
│   └── elevenlabs.json # 语音配置
├── input/              # 输入脚本
│   └── script-template.json
├── output/             # 输出视频
├── src/
│   ├── templates/      # 视频模板
│   └── services/       # API 服务
└── public/             # 静态资源
```

## 配置说明

### 视频参数 (`config/video.json`)

```json
{
  "width": 1080,
  "height": 1920,
  "fps": 30,
  "durationInFrames": 3600
}
```

### ElevenLabs 配置 (`config/elevenlabs.json`)

```json
{
  "model": "eleven_multilingual_v2",
  "voice_settings": {
    "stability": 0.5,
    "similarity_boost": 0.75
  }
}
```

## 开发指南

### 创建新模板

1. 在 `src/templates/` 创建新目录
2. 实现模板组件
3. 在 `src/Root.tsx` 注册模板

### 自定义场景

编辑模板文件，从 JSON 加载场景数据。

## 技术栈

- **视频引擎**: [Remotion](https://www.remotion.dev/)
- **语音合成**: [ElevenLabs](https://elevenlabs.io/)
- **开发语言**: TypeScript + React

## 工作流示例

```bash
# 1. 用 ChatGPT 生成脚本
"请将这篇文章转换为7个短视频场景..."

# 2. 保存为 input/my-video.json

# 3. 生成视频
npm start  # 预览
npm run workflow input/my-video.json  # 渲染（未来）
```

## 路线图

- [x] 基础视频生成
- [x] 音频集成
- [x] 从 JSON 加载场景
- [x] Markdown 脚本支持
- [x] 自定义动画类型（fade/slide/zoom）
- [x] 自定义颜色配置
- [ ] ElevenLabs 语音生成
- [ ] 一键渲染工作流
- [ ] 更多视频模板
- [ ] 平台发布工具

## 为什么不集成脚本生成？

1. **更简单**: 不需要管理多个 API 密钥
2. **更灵活**: 用任何工具生成脚本（ChatGPT、Claude、手动）
3. **更专注**: AutoReels 专注于视频生成，做好一件事

## 许可证

MIT

---

Made with ❤️ using Remotion
