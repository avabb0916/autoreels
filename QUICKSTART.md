# AutoReels 快速参考

## 🚀 快速开始

```bash
# 1. 创建脚本
vim input/my-video.md

# 2. 转换脚本
node scripts/convert-script.js input/my-video.md

# 3. 预览视频
npm start
```

## 📝 Markdown 格式

```markdown
---
## 场景标题
场景副标题
**时长**: 10秒
**动画**: fade
**标题颜色**: #FFFFFF
---
```

## 🎨 动画类型

- `fade` - 淡入淡出（默认）
- `slide` - 从下滑入
- `zoom` - 缩放效果

## 🎯 配置选项

| 选项 | 说明 | 示例 |
|------|------|------|
| `**时长**` | 场景时长（秒） | `10秒` 或 `10` |
| `**动画**` | 动画类型 | `fade`/`slide`/`zoom` |
| `**标题颜色**` | 标题颜色 | `#FFD700` |
| `**副标题颜色**` | 副标题颜色 | `#FFA500` |

## 📂 项目结构

```
autoreels/
├── input/              # 输入脚本（.md 或 .json）
├── public/             # 生成的 scenes.json
├── scripts/            # 转换脚本
└── src/
    ├── templates/      # 视频模板
    └── utils/          # 工具函数
```

## 💡 示例

### 基础示例
```markdown
---
## 欢迎
我的第一个视频
**时长**: 5秒
---
```

### 高级示例
```markdown
---
## 彩色标题
使用自定义颜色和动画
**时长**: 8秒
**动画**: zoom
**标题颜色**: #FFD700
**副标题颜色**: #FFA500
---
```

## 🔧 常用命令

```bash
# 转换脚本
node scripts/convert-script.js input/script.md

# 启动预览
npm start

# 查看帮助
node scripts/convert-script.js
```

## 📚 更多文档

- [完整格式指南](docs/markdown-format.md)
- [README](README.md)
