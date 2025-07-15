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
              <img src="E:/code/try/electron-app/build/icon.png" />
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

    <!-- 主体布局 -->
    <t-layout class="main-layout">
      <!-- 侧边栏 -->
      <t-aside
        :width="sidebarWidth"
        :collapsed="sidebarCollapsed"
        class="app-sidebar"
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
                src="E:/code/try/electron-app/build/icon.png"
                alt="系统Logo"
              />
            </div>
          </template>

          <t-menu-item value="dashboard">
            <template #icon><t-icon name="dashboard" /></template>
            <span v-if="!sidebarCollapsed">仪表盘</span>
          </t-menu-item>

          <t-menu-item value="resource">
            <template #icon><t-icon name="server" /></template>
            <span v-if="!sidebarCollapsed">资源列表</span>
          </t-menu-item>

          <t-menu-item value="root">
            <template #icon><t-icon name="folder-open" /></template>
            <span v-if="!sidebarCollapsed">根目录</span>
          </t-menu-item>

          <t-menu-group v-if="!sidebarCollapsed" label="调度管理">
            <t-menu-item value="control-platform">
              <template #icon><t-icon name="control-platform" /></template>
              调度平台
            </t-menu-item>
            <t-menu-item value="precise-monitor">
              <template #icon><t-icon name="precise-monitor" /></template>
              精确监控
            </t-menu-item>
          </t-menu-group>

          <t-menu-item value="mail">
            <template #icon><t-icon name="mail" /></template>
            <span v-if="!sidebarCollapsed">消息区</span>
          </t-menu-item>

          <t-menu-item value="user-circle">
            <template #icon><t-icon name="user-circle" /></template>
            <span v-if="!sidebarCollapsed">个人中心</span>
          </t-menu-item>

          <t-menu-item value="play-circle">
            <template #icon><t-icon name="play-circle" /></template>
            <span v-if="!sidebarCollapsed">视频区</span>
          </t-menu-item>

          <t-menu-item value="edit1">
            <template #icon><t-icon name="edit-1" /></template>
            <span v-if="!sidebarCollapsed">资源编辑</span>
          </t-menu-item>
        </t-menu>
      </t-aside>

      <!-- 内容区域 -->
      <t-layout class="content-layout">
        <t-content class="main-content">
          <t-breadcrumb :items="breadcrumbItems" class="page-breadcrumb" />

          <div class="page-header">
            <h1 class="page-title">{{ pageTitle }}</h1>
            <div class="page-actions">
              <t-button theme="primary" @click="handleAdd">
                <t-icon name="add" /> 新增
              </t-button>
            </div>
          </div>

          <div class="page-content">
            <component :is="currentComponent" :pageTitle="pageTitle" />
          </div>
        </t-content>
        <t-footer class="app-footer">
          Copyright @ 2019-{{ new Date().getFullYear() }} 资源管理系统. All Rights Reserved
        </t-footer>
      </t-layout>
    </t-layout>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const sidebarCollapsed = ref(false);
const sidebarWidth = computed(() => (sidebarCollapsed.value ? 64 : 220));
const activeMenu = ref('dashboard');
const pageTitle = ref('仪表盘');
const breadcrumbItems = ref([{ label: '首页' }, { label: '仪表盘' }]);
const unreadCount = ref(5);

const toggleSidebar = () => (sidebarCollapsed.value = !sidebarCollapsed.value);
const handleCollapsedChange = (collapsed) => (sidebarCollapsed.value = collapsed);

const handleMenuChange = (value) => {
  activeMenu.value = value;
  const menuMap = {
    dashboard: '仪表盘',
    resource: '资源列表',
    root: '根目录',
    'control-platform': '调度平台',
    'precise-monitor': '精确监控',
    mail: '消息区',
    'user-circle': '个人中心',
    'play-circle': '视频区',
    edit1: '资源编辑'
  };
  pageTitle.value = menuMap[value] || '未知页面';
  breadcrumbItems.value = [
    { label: '首页' },
    { label: pageTitle.value }
  ];
};

const currentComponent = computed(() => {
  return {
    template: `
      <div class="dynamic-content">
        <p>当前页面：{{ pageTitle }}</p>
        <p class="content-desc">这里是{{ pageTitle }}的内容区域，您可以根据实际需求进行开发。</p>
      </div>`
  };
});

const handleAdd = () => {
  console.log('点击了新增按钮');
};
</script>

<style scoped>
/* 样式同原始代码保持一致，可根据实际需要进一步优化 */
</style>
