# 网站风险警告拦截器 Chrome 扩展 / Website Risk Warning Blocker

一个简单的 Chrome 扩展，将所有网页替换为警告页面。根据浏览器语言自动切换中英界面：
- 若检测到中文环境（中国），点击 **高级选项 → 仍要访问** 后会跳转到指定的 B 站视频（https://www.bilibili.com/video/BV1GJ411x7h7）。
- 若检测到非中文环境（非中国），点击 **Advanced Options → Still Want to Visit** 后会跳转到 YouTube Rickroll 视频（https://www.youtube.com/watch?v=dQw4w9WgXcQ）。

只有通过警告页面上的按钮进入的才不会被拦截，直接访问其他网站都会看到警告页面。

## 功能 / Features

- **全站拦截**：匹配 `<all_urls>`，所有访问的网站都会被替换为警告页面（除目标视频页外）。
- **多语言支持**：根据 `navigator.language` 自动切换中文/英文界面。
- **图标展示**：警告页面顶部显示自定义图标（`898.ico`）。
- **高级选项**：点击 “高级选项” / “Advanced Options” 展开按钮。
- **智能跳转**：
  - 中文环境 → 跳转到 B 站视频（https://www.bilibili.com/video/BV1GJ411x7h7）
  - 英文环境 → 跳转到 YouTube Rickroll（https://www.youtube.com/watch?v=dQw4w9WgXcQ）
- **防止重复注入**：内置检查避免内容脚本多次注入导致循环。

## 文件结构 / File Structure

```
warning-extension/
├─ manifest.json       # 扩展清单文件
├─ content.js          # 内容脚本，实现页面替换、多语言、图标及跳转逻辑
└─ 898.ico             # 警告页面展示的图标
```

## 安装使用（本地调试） / Installation & Usage (Local Debug)

1. **克隆或下载本仓库**  
   ```bash
   git clone https://github.com/你的用户名/website-warning-extension.git
   cd website-warning-extension
   ```

2. **打开 Chrome 扩展管理页**  
   在地址栏输入 `chrome://extensions/` 并回车。

3. **开启开发者模式**  
   页面右上角切换 “开发者模式” 为 **ON**。

4. **加载已解压的扩展程序**  
   - 点击左上角 **“加载已解压的扩展程序”**。  
   - 选择本仓库中的 `warning-extension` 文件夹。  
   - 确认后，扩展会出现在列表中并显示为 **已启用**。

5. **体验效果**  
   - 访问任意普通网站（如百度、示例站），页面会被替换为警告页面。  
   - 警告页面顶部显示图标，下方有警告文字、“高级选项"/"Advanced Options" 链接。  
   - 点击链接展开按钮后点击：
     - 若浏览器语言为中文 → 跳转到 https://www.bilibili.com/video/BV1GJ411x7h7  
     - 若浏览器语言为英文（或其他非中文） → 跳转到 https://www.youtube.com/watch?v=dQw4w9WgXcQ  
   - 直接打开目标视频页面不会被拦截，可正常观看。

## 打包分发 / Packaging for Distribution

若要将扩展打包为 `.crx` 文件分发给他人：

1. 在 `chrome://extensions/` 中确保开发者模式已开启。  
2. 点击 “打包扩展程序”。  
3. 扩展程序目录填写 `warning-extension` 的完整路径，私钥可留空（首次打包会自动生成）。  
4. 打包完成后会生成 `<extension-id>.crx` 和 `<extension-id>.pem` 两个文件。  
5. 将 `.crx` 文件通过邮件、网盘或即时通讯工具发送。  
   接收方打开 Chrome，将 `.crx` 文件直接拖入 `chrome://extensions/` 页面，或在开发者模式下选择 “加载已解压的扩展程序” → 先将 `.crx` 改名为 `.zip` 解压后选择文件夹。

## 自定义修改 / Customization

- **修改警告文字或样式**：编辑 `content.js` 中对应的 `texts` 对象或 `container.style` 等。  
- **更换图标**：替换 `warning-extension/898.ico` 为你自己的图标（建议使用 64×64 或 128×128 像素的 .ico 文件），无需修改其他代码。  
- **改变目标跳转链接**：在 `content.js` 中修改 `redirectURL` 变量的值。  
- **调整拦截范围**：若只想拦截特定站点，修改 `manifest.json` 中 `"matches": ["<all_urls>"]` 为所需的 URL 匹配模式（例如 `["*://*.example.com/*"]`）。

## 注意事项 / Notes

- 由于使用 `document.documentElement.innerHTML = '';` 完全替换了原始 DOM，某些依赖原始页面脚本的功能会被阻止。这是设计目的，以实现完整拦截。  
- 极少数网站如果采用极其严格的 CSP（内容安全策略）并禁止所有脚本注入，可能会导致内容脚本无法运行。此时可尝试将 `manifest.json` 中 `"run_at": "document_start"` 改为 `"document_idle"` 或 `"document_end"`。  
- 若在企业或学校环境中使用，可能受到组策略或安全软件限制，请咨询 IT 管理员。

## 许可证 / License

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件（如需添加）。

---  
Enjoy! If you have any questions or suggestions, feel free to open an Issue or Pull Request.