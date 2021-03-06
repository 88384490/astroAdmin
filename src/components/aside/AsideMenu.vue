<template>
  <div class="aside-menu" :class="isOpen ? '' : 'small'">
    <h1 class="title">
      <img class="title-img" :src="logoHalf" alt="logo" />
    </h1>
    <Menu
      :defaultSelectedKeys="current"
      :openKeys.sync="openKeys"
      mode="inline"
      theme="dark"
      :inlineCollapsed="!isOpen"
    >
      <sub-menu v-for="item in menus" :key="item.key">
        <span slot="title">
          <a-icon v-if="item.icon" :type="item.icon" />
          <span>{{ item.title }}</span>
        </span>
        <template v-if="item.children && item.children.length">
          <template v-for="subItem in item.children">
            <sub-menu
              v-if="(subItem.children&&subItem.children.length)"
              :key="subItem.key"
            >
              <span slot="title">
                <a-icon v-if="subItem.icon" :type="subItem.icon" />
                <span>{{ subItem.title }}</span>
              </span>
              <menu-item
                v-for="lastItem in subItem.children"
                @click="selectMenu(lastItem)"
                :key="lastItem.key"
              >
                <a-icon v-if="lastItem.icon" :type="lastItem.icon" />
                {{ lastItem.title }}
              </menu-item>
            </sub-menu>
            <menu-item v-else @click="selectMenu(subItem)" :key="subItem.key">
              <a-icon v-if="subItem.icon" :type="subItem.icon" />
              {{ subItem.title }}
            </menu-item>
          </template>
        </template>
      </sub-menu>
      <!--      <MenuGroup v-for="item in menu" :key="item.key" :menuInfo="item" />-->
    </Menu>
  </div>
</template>

<script lang="ts">
import { Menu, Icon } from "ant-design-vue";
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { debounce, getArrByActive, initMenus } from "@/utils/index.ts";
import children from "@/router/children";
import { setMenu } from "@/utils/sessionStore";

interface MenuObj {
  title: string;
  key: string;
  icon?: string;
  children?: MenuObj[];
}

@Component({
  components: {
    Menu,
    // MenuGroup
    "a-icon": Icon,
    MenuItem: Menu.Item,
    SubMenu: Menu.SubMenu,
  },
})
export default class AsideMenu extends Vue {
  @Prop() private isOpen!: boolean;

  logoHalf: string = require("assets/avatar.svg");
  current: string[] = ["info"];
  openKeys: string[] = ["info"];
  isCollapse: boolean = false; // 菜单是否收缩，和页面大小与头部手动设置联合产生作用
  menu: MenuObj[] = [];
  menus: object[] = initMenus(children); // 读取children子路由初始化侧边栏菜单

  @Watch("$route", { immediate: true })
  onRouteChanged(val: any) {
    if (this.$route.path) {
      let arr = getArrByActive(
        this.menus,
        this.$route.path.split("/").pop() || "",
        "key"
      );
      if (arr && arr.length) {
        this.current = [];
        this.openKeys = [];
        arr.forEach((item, index) => {
          if (index === arr.length - 1) {
            this.current.push(item);
          } else {
            this.openKeys.push(item);
          }
        });
      }
    }
  }

  @Emit()
  modifyIsOpen(val: boolean): boolean {
    return val;
  }
  created() {
    this.createMenu();
  }
  mounted() {
    this.setCollapse();
    window.onresize = debounce(this.setCollapse, 50);
  }

  createMenu() {
    this.menus = initMenus(children);
  }

  setCollapse() {
    // 手动触发时不管window大小按照手动意愿展示，所以没有监听isOpen状态
    // 在变化窗体的时候如果手动设置和窗口展示不一致，修改状态
    this.modifyIsOpen(window.innerWidth > 900);
  }

  selectMenu(item: MenuObj): void {
    let arr = getArrByActive(this.menus, item.key, "key");
    if (arr && arr.length) {
      this.$router.push("/" + arr.join("/"));
    } else {
      // 特殊情况的处理
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.aside-menu {
  z-index: 9;
  flex: 0 0 256px;
  background: #001529;
  transition: all 0.5s ease;
  box-shadow: rgba(0, 21, 41, 0.35) 2px 0px 6px;
  .title {
    text-align: center;
    .title-img {
      width: 150px;
      height: 60px;
      margin: 10px 0;
      transition: all 0.5s ease;
    }
  }
  &.small {
    flex: 0 0 80px;
    width: 80px;
    .title-img {
      width: 60px !important;
      height: 60px !important;
      border-radius: 50%;
    }
    .ant-menu-submenu-title .anticon {
      font-size: 20px;
      color: #fff;
    }
  }
}
// @media screen and (max-width: 900px) {
//   .aside-menu{
//   }
// }
</style>
