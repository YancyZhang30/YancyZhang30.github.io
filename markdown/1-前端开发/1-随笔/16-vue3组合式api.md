# vue3组合式api

## 组合式函数Composables
打开你的vscode, 随便粘贴复制出一段代码，你会看见是这种吧。

![组合式api](https://pic1.zhimg.com/80/v2-b65fd21fecaacaebab76fa4f08cb8f78_1440w.webp)

在复杂的业务逻辑的压力下，很容易就会写出这种流水账代码，更糟糕的是可能会有类似于使用一个reactive包裹页面中所有数据，然后在按顺序写methods、computed、watch、生命周期函数的代码，那这和vue2有什么区别呢？

然而，理想的vue3组合式代码，应该是：
![理想组合式api](https://pic4.zhimg.com/80/v2-9ea3c41929cd69c43f98da90176dcba3_1440w.webp)

vue3官网也提出了**通过抽取组合式函数改善代码结构**
>在 Vue 应用的概念中，“组合式函数”(Composables) 是一个利用 Vue 的组合式 API 来封装和复用有状态逻辑的函数。

>抽取组合式函数不仅是为了复用，也是为了代码组织。随着组件复杂度的增高，你可能会最终发现组件多得难以查询和理解。组合式 API 会给予你足够的灵活性，让你可以基于逻辑问题将组件代码拆分成更小的函数：

```js
<script setup>
import { useFeatureA } from './featureA.js'
import { useFeatureB } from './featureB.js'
import { useFeatureC } from './featureC.js'

const { foo, bar } = useFeatureA()
const { baz } = useFeatureB(foo)
const { qux } = useFeatureC(baz)
</script>
```

## 实际业务应用

//TODO
