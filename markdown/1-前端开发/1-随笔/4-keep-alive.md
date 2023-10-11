# KeepAlive

`<KeepAlive>` 是一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例。

## 前言
默认情况下，一个组件实例在被替换掉后会被销毁。这会导致它丢失其中所有已变化的状态——当这个组件再一次被显示时，会创建一个只带有初始状态的新实例。

但是在实际项目中，例如有以下场景：个人主页 -> 商品列表页 -> 详情页面 -> 返回商品列表页（`重新请求列表数据，第一页开始`）。

这样的交互其实是不合理的，我们从详情页面返回列表页面应该保留原来的位置，并且不用重新从第一页请求列表数据。

此时我们可以用keep-alive组件来缓存列表页面，但是我们从个人主页到列表页，不需要缓存，所以我们还需要借助vue-router和pinia来动态控制缓存的组件（页面）。
![pPuKbMn.md.png](https://s1.ax1x.com/2023/08/12/pPuKbMn.png)
## KeepAlive组件
KeepAlive组件在vue3中用法：
`<KeepAlive>` 默认会缓存内部的所有组件实例，但我们可以通过 include 和 exclude prop 来定制该行为。这两个 prop 的值都可以是一个以英文逗号分隔的字符串、一个正则表达式，或是包含这两种类型的一个数组：
```vue
<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```
其中view是一个变量，我们应该给它赋值我们导入的组件变量，而a,b则是我们的组件名称，vue3的setup语法糖中无法定义组件的name，所以我们需要添加一个标签，来定义组件的名称。
```vue
<script lang="ts">
export default defineComponent({
  name: 'GoodsList',
})
</script>
```
官网例子：
```vue
<script setup>
import { shallowRef } from 'vue'
import CompA from './CompA.vue'
import CompB from './CompB.vue'

const current = shallowRef(CompA)
</script>

<template>
  <div class="demo">
    <label><input type="radio" v-model="current" :value="CompA" /> A</label>
    <label><input type="radio" v-model="current" :value="CompB" /> B</label>
    <KeepAlive>
      <component :is="current"></component>
    </KeepAlive>
  </div>
</template>
```

:::tip
在 3.2.34 或以上的版本中，使用 `<script setup>` 的单文件组件会自动根据文件名生成对应的 name 选项，无需再手动声明。
:::

## KeepAlive和VueRouter
通常我们KeepAlive组件是和VueRouter一起使用的：
```vue
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useKeepAlive } from '@/stores/keepAlive'

const keepAliveStore = useKeepAlive()
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive :include="keepAliveStore.caches">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>
```
这里我们将需要缓存的页面放在pinia中，这样我们可以在任何页面控制需要缓存的页面。
KeepAlive.ts
```ts
import { defineStore } from 'pinia'

export const useKeepAlive = defineStore('keepAliveStore', {
  state: () => ({
    caches: [] as string[],
  }),
  getters: {},
  actions: {
    add(name: string) {
      if (!this.caches.includes(name)) {
        this.caches.push(name)
      }
    },
    remove(name: string) {
      this.caches = this.caches.filter((item: any) => item !== name)
    },
    clear() {
      this.caches = []
    },
  },
})
```
这里为了防止一个页面同时被缓存多次，所以如果存在，就不添加了，当然也可以使用set来实现。

接着在list页面，我们控制，如果是跳转详情页面，则缓存list页面，如果是返回主页，则不缓存list页面。
```js
onBeforeRouteLeave((to: any, from: any) => {
  // 如果返回首页，则去除列表页面缓存
  if (to.name === 'home') {
    keepAliveStore.remove('GoodsList')
  } else {
    keepAliveStore.add('GoodsList')
  }
})
```


