<template>
  <div class="theme-container" :class="pageClasses" @touchstart="onTouchStart" @touchend="onTouchEnd">
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <Sidebar v-if="$router.currentRoute.path !== '/'" :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <Home v-if="$page.frontmatter.home" />

    <Page v-else :sidebar-items="sidebarItems" :page-sidebar-items="pageSidebarItems">
      <template #top>
        <slot name="page-top" />

      </template>
      <template #bottom>
        <slot name="page-bottom" />
        <!-- <Footer /> -->
      </template>
    </Page>

    <!-- <PageSidebar v-if="shouldShowPageSidebar" :page-sidebar-items="pageSidebarItems" :sidebar-items="sidebarItems">
      <slot name="page-sidebar-top" #top />
      <slot name="page-sidebar-bottom" #bottom />
    </PageSidebar> -->

    <div id="fps"></div>
  </div>
</template>

<script>
import Home from '@theme/components/Home.vue'
import Navbar from '@theme/components/Navbar.vue'
import Page from '@theme/components/Page.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import PageSidebar from '@theme/components/ExtraSidebar.vue'
import Footer from "@theme/components/Footer.vue";
import { resolveSidebarItems, resolveHeaders } from '../util'
import { loopFps } from '../util/fps'


export default {
  components: { Home, Page, Sidebar, Navbar, PageSidebar, Footer },

  data() {
    return {
      isSidebarOpen: false
    }
  },

  computed: {
    shouldShowNavbar() {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
      )
    },

    shouldShowPageSidebar() {
      const { frontmatter } = this.$page

      return (//false&&
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.pageSidebarItems.length
      )
    },

    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },

    pageSidebarItems() {
      return resolveHeaders(this.$page)
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    }
  },

  mounted() {
    // console.log(config,this.pageSidebarItems, 'config')
    loopFps()
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })
  },

  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    }
  }
}
</script>

<style lang="stylus">
#fps
 position fixed
 right 0
 bottom 5px
 box-sizing border-box
 padding 0 6px
 width 120px
 text-align center
 user-select none

::-webkit-scrollbar 
	width 6px
	height 6px
	background-color #282C34

::-webkit-scrollbar-thumb 
	 background-color #3eaf7c
	 border-radius 20px
	 box-shadow inset 0 0 0 #ffffff

::selection
  background rgb(255 145 0.1)
</style>
