<script lang="ts" setup>
</script>

<template>
  <t-layout>
    <t-aside>
      <t-menu theme="light" value="dashboard" style="margin-right: 50px" height="550px">
        <template #logo>
          <img width="136" class="logo" src="E:\code\try\electron-app\resources\icon.png" />
        </template>
        <t-menu-item value="dashboard">
          <template #icon>
            <t-icon name="dashboard" />
          </template>
          仪表盘
        </t-menu-item>
        <t-menu-item value="resource">
          <template #icon>
            <t-icon name="server" />
          </template>
          资源列表
        </t-menu-item>
        <t-menu-item value="root">
          <template #icon>
            <t-icon name="root-list" />
          </template>
          根目录
        </t-menu-item>
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
          调度平台
        </t-menu-item>
        <t-menu-item value="mail">
          <template #icon>
            <t-icon name="mail" />
          </template>
          消息区
        </t-menu-item>
        <t-menu-item value="user-circle">
          <template #icon>
            <t-icon name="user-circle" />
          </template>
          个人中心
        </t-menu-item>
        <t-menu-item value="play-circle">
          <template #icon>
            <t-icon name="play-circle" />
          </template>
          视频区
        </t-menu-item>
        <t-menu-item value="edit1">
          <template #icon>
            <t-icon name="edit-1" />
          </template>
          资源编辑
        </t-menu-item>
      </t-menu>
    </t-aside>
    <t-layout>
      <t-content>
        <div>Content</div>
      </t-content>
      <t-footer>Copyright @ 2019-{{ new Date().getFullYear() }} Tencent. All Rights Reserved</t-footer>
    </t-layout>
  </t-layout>
  <t-space direction="vertical">
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
</template>

<style scoped>

</style>
