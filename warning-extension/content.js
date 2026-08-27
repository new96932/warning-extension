// 根据浏览器语言自动适配中英界面
const lang = (navigator.language || navigator.userLanguage).toLowerCase();
const isChinese = lang.startsWith('zh');

// 根据语言和地区设定文本和跳转链接
const texts = isChinese ? {
    warning: '此站点存在风险，360危险卫士拦截',
    advanced: '高级选项',
    continue: '仍要访问'
} : {
    warning: 'This site poses a risk, blocked by 360 Safe Guard',
    advanced: 'Advanced Options',
    continue: 'Still Want to Visit'
};

// 根据地区决定跳转目标：中国内部跳转到B站视频，否则跳转到Rickroll
const redirectURL = isChinese
    ? 'https://www.bilibili.com/video/BV1GJ411x7h7'
    : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

// 只在非目标视频页面执行拦截逻辑（保留原有的目标页面豁免）
if (!window.location.href.includes('BV1GJ411x7h7')) {
    // 防止内容脚本多次注入导致的循环
    if (document.getElementById('warning-container')) {
        // 已经存在警告容器，不再重复注入
    } else {
        // 创建警告容器
        const container = document.createElement('div');
        container.id = 'warning-container';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100vw';
        container.style.height = '100vh';
        container.style.backgroundColor = '#fff3cd';
        container.style.color = '#856404';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.fontFamily = 'Arial, sans-serif';
        container.style.zIndex = '9999';
        container.style.textAlign = 'center';
        container.style.padding = '20px';

        // 图标
        const img = document.createElement('img');
        img.src = chrome.runtime.getURL('898.ico');
        img.style.width = '64px';
        img.style.height = '64px';
        img.style.marginBottom = '16px';
        container.appendChild(img);

        // 警告消息
        const message = document.createElement('div');
        message.id = 'warning-message';
        message.style.fontSize = '24px';
        message.style.marginBottom = '20px';
        message.textContent = texts.warning;
        container.appendChild(message);

        // 高级选项
        const advanced = document.createElement('div');
        advanced.id = 'advanced-options';
        advanced.style.color = '#007bff';
        advanced.style.textDecoration = 'underline';
        advanced.style.cursor = 'pointer';
        advanced.style.fontSize = '18px';
        advanced.style.userSelect = 'none';
        advanced.textContent = texts.advanced;
        container.appendChild(advanced);

        // 按钮容器（初始隐藏）
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'continue-button-container';
        buttonContainer.style.display = 'none';
        buttonContainer.style.marginTop = '20px';
        container.appendChild(buttonContainer);

        // 仍要访问按钮
        const button = document.createElement('button');
        button.id = 'continue-button';
        button.textContent = texts.continue;
        button.style.padding = '10px 20px';
        button.style.fontSize = '16px';
        button.style.backgroundColor = '#28a745';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';
        button.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        buttonContainer.appendChild(button);

        // 替换页面内容
        document.documentElement.innerHTML = '';
        document.body.appendChild(container);

        // 高级选项点击事件
        advanced.addEventListener('click', () => {
            const isHidden = buttonContainer.style.display === 'none';
            buttonContainer.style.display = isHidden ? 'block' : 'none';
            // 可选：添加一些动画效果
        });

        // 按钮点击事件
        button.addEventListener('click', () => {
            // 重定向到根据地区决定的目标 URL
            window.location.href = redirectURL;
        });
    }
}