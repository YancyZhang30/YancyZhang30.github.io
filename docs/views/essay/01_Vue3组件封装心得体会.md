---
title: Vue3组件封装心得体会
author: YancyZhang
date: '2023-08-04'
categories:
  - 前端开发
tags:
  - Vue3组件开发
sidebar: 'auto'
---
## 前言

最近在公司参与一个移动端h5项目的开发，使用的是vant4组件库，但是许多通用的业务组件还是得自己封装，有时候封装的组件不光自己页面会使用，项目中的其他同事也会使用，所以，对于组件的质量和复用性要求比较高，我也在组件的封装过程中学到了许多，使用的vue版本是vue3.2，组合式api配合TypeScript。

## Vue3 SFC
```vue
<script setup>
import { ref } from 'vue'
const greeting = ref('Hello World!')
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

vue单文件组件由三部分构成，一个.vue文件，既可以是一个页面，也可以是页面的一部分（也就是组件）。

我们需要封装的组件也就是一个vue单文件组件，在需要使用到的页面引入即可，为了保证组件的适用性，我们通过设置组件的参数、插槽和事件等，来实现不同页面都能够适用组件。

封装组件主要包含三部分：prop、event和slot。
## definProps与defineEmits
### defineProps
defineProps 是一个仅 `<script setup>` 中可用的编译宏命令，并不需要显式地导入。声明的 props 会自动暴露给模板。defineProps 会返回一个对象，其中包含了可以传递给组件的所有 props：

```javascript
const props = defineProps(['title'])
console.log(props.title) // 输出父组件传递的title参数
```

#### TypeScript类型参数

为了使组件更加利于维护，我们需要使用TypeScript来确定props的类型。

```vue
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true，default: ''},
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
```

也可以通过泛型来实现。

```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number // 相当于require: false
}

const props = defineProps<Props>()
</script>
```

#### withDefaults

当使用基于类型的声明时，我们失去了为 props 声明默认值的能力。这可以通过 `withDefaults` 编译器宏解决，引用类型需要通过函数返回默认值：

```javascript
export interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```
::: tip 注意:
1、defineProps() 宏中的参数不可以访问 `<script setup>` 中定义的其他变量，因为在编译时整个表达式都会被移到外部的函数中。

2、泛型引用的类型，不可以是外部导入的类型。
:::

![2232560025-62b25f1520428_fix732 (815×746) (segmentfault.com)](https://image-static.segmentfault.com/223/256/2232560025-62b25f1520428_fix732)

### defineEmits
defineEmits用于定义父组件在该组件上定义的事件。
```js
const emit = defineEmits(['change', 'delete'])

// 更加严谨
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 3.3+：另一种更简洁的语法
const emit = defineEmits<{
  change: [id: number] // 具名元组语法
  update: [value: string]
}>()
```
vue组件应该遵循单向数据流的原则，props 因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递。这避免了子组件意外修改父组件的状态的情况，不然应用的数据流将很容易变得混乱而难以理解。

所以我们不能在组件内部修改父组件传下来的props，如果子组件需要改变父组件状态或者让父组件完成操作，最常见的方式就是emit出去自身定义的事件，父组件响应事件，并作出处理即可。

```vue
// 父组件 Parent.vue
<template>
  <Child :name="name" @update="handleUpdate" />
</template>

<script setup lang=ts>
// import……

const name = ref('child')

const handleUpdate = (val: string) => {
  name.value = val
}
</script>
```
```vue
// 子组件 Child.vue
<template>
  <p>My name is {{ name }}</p>
  <button @click="updateName">Update Name</button>
</template>

<script setup lang=ts>
// import……

const props = defineProps({
  name: {
    type: string,
  }
})

const emits = defineEmits(['update'])

const updateName = () => {
  emits('update', 'new name')
}
</script>
```
我们还可以在提交事件之前进行一次校验：
```vue
<script setup>
const emit = defineEmits({
  // 没有校验
  click: null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```
## props与attributes
在Vue中，props和attributes都是用于组件之间传递数据的关键概念，但它们有一些区别。

1. 定义方式：props是组件的自定义属性，可以通过在组件上使用特殊的props选项进行定义。而attributes是HTML元素的通用属性，可以通过在标签上直接设置属性来实现。
2. 数据类型：props只能接受字符串或数组作为值，用于传递静态数据或配置选项。而attributes可以接受任何类型的数据，包括字符串、数字、布尔值、对象、数组等。
3. 传递方式：props是通过父组件传递给子组件的，子组件通过props选项来接收并使用这些数据。而attributes是直接设置在HTML元素上的，可以通过DOM API来访问和操作。
4. 动态更新：props的值是静态的，不能在子组件内部进行修改。而attributes的值可以在运行时动态修改，通过DOM API进行操作。
5.事件传递：props可以传递事件给子组件，子组件可以通过定义的事件处理函数来接收和响应这些事件。而attributes不支持事件传递。

总的来说，props主要用于组件之间的数据传递和配置选项，而attributes主要用于HTML元素的通用属性设置。

```vue
<template>
  <Child :childName="" class="child-class" @click="handleClick" />
</template>

// 其中childName和click其实都是我们传递给子组件的props，
   而class则是html标签原生的属性。
```
但是在vue中，可以认为attributes其实是包好了props和emits的。
### 透传 Attributes
“透传 attribute”指的是传递给一个组件，却没有被该组件声明为 props 或 emits 的 attribute 或者 v-on 事件监听器。最常见的例子就是 class、style 和 id。

当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上。

这对于二次封装其他已有组件时，其实是非常方便的，如果我们只是希望被封装的底层组件接受到attributes，那么无需在二次封装的组件中声明，直接在最底层组件(即被二次封装的组件)声明并使用即可。

::: tip
注意：和单根节点组件有所不同，有着多个根节点的组件没有自动 attribute 透传行为。如果 $attrs 没有被显式绑定，将会抛出一个运行时警告。
需要显示地声明透传到哪一个节点上，通过在标签上添加v-bind="$attrs"即可。
:::
```vue
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```
## 插槽slot
我们已经了解到组件能够接收任意类型的 JavaScript 值作为 props，但组件要如何接收模板内容呢？在某些场景中，我们可能想要为子组件传递一些模板片段，让子组件在它们的组件中渲染这些片段。

所谓模板片段，就是我们组件中可能存在一些高度自定义的部分，样式和布局可能根据业务不同而存在差异，或者这个组件本身就是一个容器，例如elementplus的弹框组件。

通过插槽，组件可以更加灵活，并具有高复用性。

:::tip
插槽内容无法访问子组件的数据。Vue 模板中的表达式只能访问其定义时所处的作用域，这和 JavaScript 的词法作用域规则是一致的。换言之：

父组件模板中的表达式只能访问父组件的作用域；子组件模板中的表达式只能访问子组件的作用域。
:::
### 具名插槽
有时在一个组件中包含多个插槽出口是很有用的。例如element的弹框，其实默认的内容都是放在了el-diolog的"body"中，也就是默认插槽，其实它也是有隐式名字的（default）,不命名的插槽，默认都放在default插槽区域（无需在组件中声明name）。
```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```
而其他具有名字的插槽，需要在slot标签上添加name属性，在父组件中使用时，要为具名插槽传入内容，我们需要使用一个含 v-slot 指令的 `<template>` 元素，并将目标插槽的名字传给该指令：
```vue
<BaseLayout>
  <template v-slot:header>
    <!-- header 插槽的内容放这里 -->
  </template>
</BaseLayout>
```
v-slot可简写为#，即：
```vue
<BaseLayout>
  <template #header>
    <!-- header 插槽的内容放这里 -->
  </template>
</BaseLayout>
```
### 作用域插槽
插槽的内容无法访问到子组件的状态。

然而在某些场景下插槽的内容可能想要同时使用父组件域内和子组件域内的数据。要做到这一点，我们需要一种方法来让子组件在渲染时将一部分数据提供给插槽。

例如我们在使用elementPLUS的表格组件Table时，一定遇到过需要自定义表格内容的需求。
```vue
<el-table-column label="Name" width="180">
  <template #default="scope">
    <div>name: {{ scope.row.name }}</div>
    <div>address: {{ scope.row.address }}</div>
  </template>
</el-table-column>
```
上面的代码表示，我需要在当前列同时显示name和address，但是el-table-column默认只能显示prop参数传递的字段，所以需要我们通过插槽自定义内容，并且获取当前行的数据，这就用到了作用域插槽。

我们可以像对组件传递 props 那样，向一个插槽的出口上传递attributes：
```vue
<!-- <MyComponent> 的模板 -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```
当需要接收插槽 props 时，默认插槽和具名插槽的使用方式有一些小区别。
```vue
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```
这里的slotProps可以自定义名称，这与函数的签名类似。

具名作用域插槽的工作方式也是类似的，插槽 props 可以作为 v-slot 指令的值被访问到：v-slot:name="slotProps"。当使用缩写时是这样：
```vue
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>
```
这里#default与v-slot效果是一样的，但是使用#default可以使组件更加利于理解。

所以我们可以理解el-table-column其实是默认插槽上存在row属性，代表当前行的数据对象，在父组件中使用作用域插槽即可获取当前行数据了！
## 组件v-model
v-model 可以在组件上使用以实现双向绑定。
对于原生组件：
```vue
<input v-model="searchText" />
// 等价于
<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>
```
当使用在一个自定义组件上时，v-model 会被展开为如下的形式：
```vue
<CustomInput v-model="searchText" />
// 等价于
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
```
要让这个例子实际工作起来，`<CustomInput>` 组件内部需要做两件事：

1. 将内部原生 `<input>` 元素的 value attribute 绑定到 modelValue prop
2. 当原生的 input 事件触发时，触发一个携带了新值的 update:modelValue 自定义事件

```vue
<!-- CustomInput.vue -->
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

所以使用v-model，我们即可很方便地实现表单组件或者其他组件的值双向绑定。

例如elementPLUS的表单组件，几乎都使用了v-model来实现组件中的值和表单中的值双向绑定，从而我们只需设置v-model即可，不需要手动地修改表单的状态。

### 多个v-model绑定
v-model如果未命名，则默认是modelValue，当存在多个v-model时，我们可以通过v-model:[name]的形式，实现多个双向绑定：
```vue
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```
```vue
<script setup>
defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```
### v-model修饰符
[v-model内置修饰符](https://cn.vuejs.org/guide/essentials/forms.html#modifiers)

#### 自定义修饰符
来创建一个自定义的修饰符 capitalize，它会自动将 v-model 绑定输入的字符串值第一个字母转为大写：
```vue
<MyComponent v-model.capitalize="myText" />
```
组件的 v-model 上所添加的修饰符，可以通过 modelModifiers prop 在组件内访问到。在下面的组件中，我们声明了 modelModifiers 这个 prop，它的默认值是一个空对象：
```vue
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

defineEmits(['update:modelValue'])

console.log(props.modelModifiers) // { capitalize: true }
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```
注意这里组件的 modelModifiers prop 包含了 capitalize 且其值为 true，因为它在模板中的 v-model 绑定 v-model.capitalize="myText" 上被使用了。

有了这个 prop，我们就可以检查 modelModifiers 对象的键，并编写一个处理函数来改变抛出的值。在下面的代码里，我们就是在每次 <input /> 元素触发 input 事件时将值的首字母大写：
```vue
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```
#### 多v-model修饰符
对于又有参数又有修饰符的 v-model 绑定，生成的 prop 名将是 arg + "Modifiers"。举例来说：
```vue
<MyComponent v-model:title.capitalize="myText">
```
对应的组件内部声明应该是`titleModifiers`：
```js
const props = defineProps(['title', 'titleModifiers'])
defineEmits(['update:title'])

console.log(props.titleModifiers) // { capitalize: true }
```
当我们更新title时，只需要判断titleModifiers即可。