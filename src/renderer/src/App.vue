<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <t-header class="app-header">
      <div class="header-content">
        <t-icon name="menu" class="menu-trigger" @click="toggleSidebar" />
        <div class="header-title">资源管理系统</div>
        <div class="header-actions">
          <t-badge :count="unreadCount" dot>
            <t-icon name="bell" class="header-icon" />
          </t-badge>
          <t-dropdown>
            <t-avatar size="small" class="user-avatar">
              <img src="E:\code\try\electron-app\build\icon.png" />
            </t-avatar>
            <template #content>
              <t-dropdown-menu>
                <t-dropdown-item>个人中心</t-dropdown-item>
                <t-dropdown-item>系统设置</t-dropdown-item>
                <t-dropdown-item>退出登录</t-dropdown-item>
              </t-dropdown-menu>
            </template>
          </t-dropdown>
        </div>
      </div>
    </t-header>

    <!-- 主内容区 -->
    <t-layout class="main-layout">
      <!-- 侧边栏 -->
      <t-aside 
        :width="sidebarWidth" 
        class="app-sidebar" 
        :collapsed="sidebarCollapsed"
        @collapsed-change="handleCollapsedChange"
      >
        <t-menu 
          theme="light" 
          :value="activeMenu" 
          :collapsed="sidebarCollapsed"
          height="100%"
          @change="handleMenuChange"
          class="sidebar-menu"
        >
          <template #logo>
            <div class="sidebar-logo">
              <img 
                :width="sidebarCollapsed ? 32 : 136" 
                class="logo-img" 
                src="E:\code\try\electron-app\build\icon.png" 
                alt="系统Logo" 
              />
            </div>
          </template>
          
          <t-menu-item value="dashboard">
            <template #icon>
              <t-icon name="dashboard" />
            </template>
            <span v-if="!sidebarCollapsed">仪表盘</span>
          </t-menu-item>
          
          <t-menu-item value="resource">
            <template #icon>
              <t-icon name="server" />
            </template>
            <span v-if="!sidebarCollapsed">资源列表</span>
          </t-menu-item>
          
          <t-menu-item value="root">
            <template #icon>
              <t-icon name="folder-open" />
            </template>
            <span v-if="!sidebarCollapsed">根目录</span>
          </t-menu-item>
          
          <t-menu-group v-if="!sidebarCollapsed" label="调度管理">
            <t-menu-item value="control-platform">
              <template #icon>
                <t-icon name="control-platform" />
              </template>
              调度平台
            </t-menu-item>
            <t-menu-item value="precise-monitor">
              <template #icon>
                <t-icon name="precise-monitor" />
              </template>
              精确监控
            </t-menu-item>
          </t-menu-group>
          
          <t-menu-item value="mail">
            <template #icon>
              <t-icon name="mail" />
            </template>
            <span v-if="!sidebarCollapsed">消息区</span>
          </t-menu-item>
          
          <t-menu-item value="user-circle">
            <template #icon>
              <t-icon name="user-circle" />
            </template>
            <span v-if="!sidebarCollapsed">个人中心</span>
          </t-menu-item>
          
          <t-menu-item value="play-circle">
            <template #icon>
              <t-icon name="play-circle" />
            </template>
            <span v-if="!sidebarCollapsed">视频区</span>
          </t-menu-item>
          
          <t-menu-item value="edit1">
            <template #icon>
              <t-icon name="edit-1" />
            </template>
            <span v-if="!sidebarCollapsed">资源编辑</span>
          </t-menu-item>
        </t-menu>
      </t-aside>

      <!-- 主内容 -->
      <t-layout class="content-layout">
        <t-content class="main-content">
          <!-- 面包屑导航 -->
          <t-breadcrumb :items="breadcrumbItems" class="page-breadcrumb" />
          
          <!-- 页面标题 -->
          <div class="page-header">
            <h1 class="page-title">{{ pageTitle }}</h1>
            <div class="page-actions">
              <t-button theme="primary" @click="handleAdd">
                <t-icon name="add" />
                <span>新增</span>
              </t-button>
            </div>
          </div>
          
          <!-- 内容区域 -->
          <div class="page-content">
            <!-- 动态内容根据选中的菜单变化 -->
            <component :is="currentComponent" />
          </div>
        </t-content>

        <!-- 页脚 -->
        <t-footer class="app-footer">
          Copyright @ 2019-{{ new Date().getFullYear() }} 资源管理系统. All Rights Reserved
        </t-footer>
      </t-layout>
    </t-layout>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 侧边栏状态
const sidebarCollapsed = ref(false);
const sidebarWidth = computed(() => sidebarCollapsed.value ? 64 : 220);

// 菜单状态
const activeMenu = ref('dashboard');
const pageTitle = ref('仪表盘');
const breadcrumbItems = ref([{ label: '首页' }, { label: '仪表盘' }]);

// 未读消息数量
const unreadCount = ref(5);

// 切换侧边栏
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

// 处理侧边栏折叠状态变化
const handleCollapsedChange = (collapsed) => {
  sidebarCollapsed.value = collapsed;
};

// 处理菜单变化
const handleMenuChange = (value) => {
  activeMenu.value = value;
  
  // 更新页面标题和面包屑
  const menuMap = {
    'dashboard': '仪表盘',
    'resource': '资源列表',
    'root': '根目录',
    'control-platform': '调度平台',
    'precise-monitor': '精确监控',
    'mail': '消息区',
    'user-circle': '个人中心',
    'play-circle': '视频区',
    'edit1': '资源编辑'
  };
  
  pageTitle.value = menuMap[value] || '未知页面';
  breadcrumbItems.value = [
    { label: '首页' }, 
    { label: pageTitle.value }
  ];
};

// 动态组件映射
const currentComponent = computed(() => {
  // 在实际应用中，这里应该导入并返回对应的组件
  // 这里为了演示使用简单的文本组件
  return {
    template: `<div class="dynamic-content">
      <p>当前页面：{{ pageTitle }}</p>
      <p class="content-desc">这里是{{ pageTitle }}的内容区域，您可以根据实际需求进行开发。</p>
      <div class="button-demo">
        <t-space direction="vertical" size="large">
          <t-space>
            <t-button theme="default">填充按钮</t-button>
            <t-button variant="outline" theme="default">描边按钮</t-button>
            <t-button variant="dashed" theme="default">虚框按钮</t-button>
            <t-button variant="text" theme="default">文字按钮</t-button>
          </t-space>
          <t-space>
            <t-button theme="primary">填充按钮</t-button>
            <t-button variant="outline" theme="primary">描边按钮</t-button>
            <t-button variant="dashed" theme="primary">虚框按钮</t-button>
            <t-button variant="text" theme="primary">文字按钮</t-button>
          </t-space>
          <t-space>
            <t-button theme="danger">填充按钮</t-button>
            <t-button variant="outline" theme="danger">描边按钮</t-button>
            <t-button variant="dashed" theme="danger">虚框按钮</t-button>
            <t-button variant="text" theme="danger">文字按钮</t-button>
          </t-space>
          <t-space>
            <t-button theme="warning">填充按钮</t-button>
            <t-button variant="outline" theme="warning">描边按钮</t-button>
            <t-button variant="dashed" theme="warning">虚框按钮</t-button>
            <t-button variant="text" theme="warning">文字按钮</t-button>
          </t-space>
          <t-space>
            <t-button theme="success">填充按钮</t-button>
            <t-button variant="outline" theme="success">描边按钮</t-button>
            <t-button variant="dashed" theme="success">虚框按钮</t-button>
            <t-button variant="text" theme="success">文字按钮</t-button>
          </t-space>
        </t-space>
      </div>
    </div>`,
    props: ['pageTitle']
  };
});

// 新增按钮处理
const handleAdd = () => {
  // 实际应用中这里会打开新增表单或弹窗
  console.log('点击了新增按钮');
};
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
}

.app-header {
  height: 64px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 10;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
}

.menu-trigger {
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.menu-trigger:hover {
  color: #165DFF;
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: #1D2129;
  margin-left: 16px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.header-icon:hover {
  color: #165DFF;
}

.user-avatar {
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.user-avatar:hover {
  border-color: #165DFF;
}

.main-layout {
  flex: 1;
  display: flex;
  height: calc(100vh - 64px);
}

.app-sidebar {
  background-color: #fff;
  box-shadow: 1px 0 2px rgba(0, 0, 0, 0.05);
  transition: width 0.3s;
  z-index: 5;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  border-bottom: 1px solid #f2f3f5;
}

.logo-img {
  transition: all 0.3s;
}

.sidebar-menu {
  border-right: none !important;
}

.content-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.page-breadcrumb {
  margin-bottom: 16px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e6eb;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #1D2129;
  margin: 0;
}

.page-actions {
  display: flex;
  gap: 8px;
}

.page-content {
  background-color: #fff;
  padding: 24px;
  border-radius: 4px;
  min-height: calc(100% - 120px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.dynamic-content {
  padding: 20px;
}

.content-desc {
  color: #86909C;
  margin-bottom: 24px;
}

.button-demo {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.app-footer {
  text-align: center;
  padding: 16px;
  color: #86909C;
  font-size: 14px;
  border-top: 1px solid #e5e6eb;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .header-title {
    display: none;
  }
  
  .app-sidebar {
    position: absolute;
    height: calc(100vh - 64px);
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .page-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
