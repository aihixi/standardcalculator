<template>
  <div id="app">
    <!-- 全局布局结构，如头部、侧边栏、内容区 -->
    <header class="page-header" style="font-size: 18px; color: #333">标准计算器</header>
    <main>
      <!-- 页面内容或 <router-view /> -->
      <router-view />
    </main>
    <footer class="page-footer" style="font-size: 18px; color: #333"></footer>
  </div>
</template>

<script lang="ts" setup>
// 这里可以写全局逻辑或引入全局组件
</script>