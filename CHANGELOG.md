# AutoReels MD 脚本增强 - 更新日志

## 🎉 新功能

### 1. 增强的 Markdown 解析器
- ✅ 支持自定义动画类型（fade/slide/zoom）
- ✅ 支持自定义颜色配置（标题颜色、副标题颜色）
- ✅ 支持场景级别的背景色配置（预留）
- ✅ 中英文配置项支持

### 2. 改进的视频组件
- ✅ 支持多种动画效果
  - `fade`: 淡入淡出（默认）
  - `slide`: 从下方滑入
  - `zoom`: 缩放效果
- ✅ 支持自定义文字颜色
- ✅ 更灵活的场景配置

### 3. 更新的转换脚本
- ✅ 支持新的配置选项解析
- ✅ 保持向后兼容
- ✅ 更好的错误处理

### 4. 完善的文档
- ✅ 更新 README.md
- ✅ 新增 Markdown 格式指南（docs/markdown-format.md）
- ✅ 新增快速参考（QUICKSTART.md）
- ✅ 新增高级示例（input/script-example-advanced.md）

## 📝 Markdown 格式示例

### 基础格式
```markdown
---
## 场景标题
场景副标题
**时长**: 10秒
---
```

### 完整格式
```markdown
---
## 场景标题
场景副标题
**时长**: 10秒
**动画**: zoom
**标题颜色**: #FFD700
**副标题颜色**: #FFA500
---
```

## 🔧 技术改进

### 文件变更
1. `src/utils/parseMarkdownScript.ts`
   - 新增 `ScriptConfig` 接口
   - 扩展 `Scene` 接口，支持更多配置
   - 增强解析逻辑

2. `src/templates/TextAnimation/Composition/MultiSceneVideo.tsx`
   - 支持动画类型切换
   - 支持自定义颜色
   - 改进动画效果

3. `scripts/convert-script.js`
   - 同步更新解析逻辑
   - 支持新配置选项

4. `README.md`
   - 更新使用说明
   - 添加配置选项文档
   - 添加使用示例

### 新增文件
- `docs/markdown-format.md` - 完整格式指南
- `QUICKSTART.md` - 快速参考
- `input/script-example-advanced.md` - 高级示例

## 🚀 使用方法

### 快速开始
```bash
# 1. 创建或编辑脚本
vim input/my-video.md

# 2. 转换脚本
node scripts/convert-script.js input/my-video.md

# 3. 预览视频
npm start
```

### 测试新功能
```bash
# 使用高级示例
node scripts/convert-script.js input/script-example-advanced.md
npm start
```

## 📊 兼容性

- ✅ 向后兼容旧的 Markdown 格式
- ✅ 向后兼容 JSON 格式
- ✅ 所有新配置项都是可选的
- ✅ 默认值保持不变

## 🎯 下一步

建议的后续改进：
1. 支持场景级别的背景配置
2. 支持更多动画类型
3. 支持字体大小配置
4. 支持图片/视频背景
5. 直接从 MD 文件渲染（跳过 JSON 转换）

## 📚 文档

- [README.md](README.md) - 项目主文档
- [QUICKSTART.md](QUICKSTART.md) - 快速参考
- [docs/markdown-format.md](docs/markdown-format.md) - 格式指南
