## `<style scoped>`
单文件组件中的style标签一般都会带有scope属性，从而达到样式私有模块化的目的。

scoped原理：
1. 给HTML的DOM节点加一个不重复data属性(形如：data-v-123)来表示他的唯一性。
2. 在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的data属性选择器（如[data-v-123]）来私有化样式。
3. 如果组件内部包含有其他组件，只会给`其他组件`的`最外层标签`加上当前组件的data属性。


## :deep()

项目开发中因为ui设计常常需要修改vue常用的组件库（element，antD等等）, 这就需要用到样式穿透。

直接在带scoped标签中写样式是不行的。

例如：
```vue
<template>
  <div>
    <el-input class="input-box" />
  </div>
</template>

<style scoped lang="scss">
.input-box {
  .el-input {
    background-color: red;
  }
}
</style>
```
经过scoped的处理, 他在进行PostCss转化的时候把元素选择器默认放在了最后, 选择器变成了：

```css
.el-input input[data-v-xxxx] {
  backgorund-color: red;
}
```
Vue 提供了样式穿透:deep() 他的作用就是用来改变 属性选择器的位置:
```css
.input-box {
  :deep(.el-input) {
    background-color: red;
  }
}
```
处理后便变成了：
```css
.el-input[data-v-xxxx] input {
  backgorund-color: red;
}
```