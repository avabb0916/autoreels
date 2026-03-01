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

创建视频脚本 JSON 文件（参考 `input/script-template.json`）：

```json
[
  {
    "title": "主标题",
    "subtitle": "副标题",
    "duration": 10
  }
]
```

### 4. 生成视频

```bash
# 方式一：可视化预览
npm start

# 方式二：直接渲染（未来功能）
npm run workflow input/your-script.json
```

## 使用方法

### 步骤 1：创建脚本

用你喜欢的方式创建脚本：

**选项 A：用 AI 生成**
```
提示词：将以下内容转换为7个短视频场景，每个场景包含标题和副标题...
```

**选项 B：手动编写**
复制 `input/script-template.json`，修改内容

**选项 C：从长文本提炼**
用 ChatGPT/Claude 提炼关键点，整理成 JSON

### 步骤 2：生成视频

```bash
# 启动 Remotion Studio 预览
npm start

# 未来：一键生成
npm run workflow input/my-script.json
```

## 脚本格式

```json
[
  {
    "title": "场景标题",
    "subtitle": "场景副标题",
    "duration": 10
  }
]
```

- `title`: 主标题（大字体）
- `subtitle`: 副标题（小字体）
- `duration`: 场景时长（秒）

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
- [ ] 从 JSON 加载场景
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
