<template>
  <div class="manage-container">
    <AsideMenu :isOpen="isOpen" v-on:modify-is-open="setIsOpen" />
    <div class="manage-main">
      <AsideHeader :isOpen="isOpen" :toggleMenu="toggleMenu"></AsideHeader>
      <div class="manage-content">
        <div class="common-part">
          <a-breadcrumb>
            <a-breadcrumb-item>{{ viewName }}</a-breadcrumb-item>
          </a-breadcrumb>
          <h3 class="module-title">{{ $route.meta.chineseName }}</h3>
          <span class="module-desc" v-show="$route.meta.desc">
            {{ $route.meta.desc }}
          </span>
        </div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import AsideMenu from "@/components/aside/AsideMenu.vue"; // @ is an alias to /src
import AsideHeader from "@/components/aside/AsideHeader.vue";
import { Breadcrumb } from "ant-design-vue";

@Component({
  components: {
    AsideMenu,
    AsideHeader,
    "a-breadcrumb": Breadcrumb,
    "a-breadcrumb-item": Breadcrumb.Item,
  },
})
export default class Index extends Vue {
  isOpen: boolean = true;
  viewName: string = "";

  @Watch("$route", { immediate: true })
  onRouteChanged(val: any) {
    this.viewName = val.meta.title;
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  setIsOpen(val: boolean): void {
    this.isOpen = val;
  }
}
</script>

<style lang="less" scoped>
.manage-container {
  height: 100%;
  display: flex;
  background: #f0f2f5;
  .manage-main {
    width: calc(~"100% - 260px");
    height: 100%;
    .manage-content {
      height: calc(~"100% - 64px");
      .common-part {
        padding: 10px 24px;
        background: #fff;
        .module-title {
          color: rgba(0, 0, 0, 0.85);
          font-size: 16px;
          font-weight: 700;
          margin: 0;
        }
        .module-desc {
          color: rgba(0, 0, 0, 0.65);
          font-size: 14px;
          margin: 12px 0 16px;
          line-height: 14px;
        }
      }
    }
  }
}
</style>
