# AutoReels 🎬

自动化短视频生成系统 - 基于 Remotion 和 AI 技术

## 功能特性

- 📝 **智能脚本生成**: 将长文本自动提炼成短视频脚本
- 🎙️ **AI 语音合成**: 集成 ElevenLabs，支持声音克隆
- 🎨 **可定制模板**: 灵活的视频模板系统
- 🌍 **多语言支持**: 支持中英文视频生成
- ⚡ **一键生成**: 自动化工作流，从素材到成品

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并填入你的 API 密钥：

```bash
cp .env.example .env
```

编辑 `.env` 文件，添加你的 ElevenLabs API 密钥。

### 3. 启动预览

```bash
npm start
```

浏览器会自动打开 Remotion Studio，你可以实时预览和编辑视频。

## 使用方法

### 方式一：可视化编辑

1. 运行 `npm start` 启动 Remotion Studio
2. 在浏览器中实时预览和调整视频
3. 修改 `src/templates/TextAnimation/` 中的内容

### 方式二：自动化工作流

1. 将长文本素材放到 `input/` 目录
2. 运行完整工作流：

```bash
npm run workflow input/your-content.txt
```

这将自动完成：
- 提炼视频脚本
- 生成 AI 配音
- 渲染视频
- 输出到 `output/` 目录

### 方式三：分步执行

```bash
# 1. 生成配音
npm run voice

# 2. 渲染视频
npm run render
```

## 项目结构

```
autoreels/
├── config/              # 配置文件
│   ├── video.json      # 视频参数
│   └── elevenlabs.json # 语音配置
├── scripts/            # 自动化脚本
├── src/
│   ├── templates/      # 视频模板
│   ├── services/       # API 服务
│   └── types/          # 类型定义
├── input/              # 输入素材
├── output/             # 输出视频
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

编辑 `src/templates/TextAnimation/index.tsx` 中的 `scenes` 数组：

```typescript
const scenes = [
  {title: '标题', subtitle: '副标题', start: 0, end: 300},
  // 添加更多场景...
];
```

## 技术栈

- **视频引擎**: [Remotion](https://www.remotion.dev/)
- **语音合成**: [ElevenLabs](https://elevenlabs.io/)
- **开发语言**: TypeScript + React
- **构建工具**: Node.js

## 路线图

- [x] 基础视频生成
- [x] 音频集成
- [ ] AI 脚本生成（OpenAI/Claude）
- [ ] 多语言支持
- [ ] 平台发布工具（小红书、YouTube 等）
- [ ] 更多视频模板

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！

---

Made with ❤️ using Remotion
