# Vue 知识点归纳

## 数据 data

> Vue 组件的 `data` 为什么要使用函数 return 出来一个对象?

1. new Vue({}) 是一个根实例，不会被复用，可以直接使用对象
2. 单独的 vue 组件可能会被复用，如果其中的 `data` 直接使用对象，它是引用类型，在一个地方修改会影响其它地方的使用，所以希望每次用到这个 vue 组件都能返回一份独一无二的数据

## 指令

1. 指令就是一个标志位，vue 程序被标记了什么标志，vue 底层根据这个标志来做相应的逻辑处理

## 组件

1. 如果 Vue 组件的 DOM 中传递了未声明的属性，会默认挂载到组件 template 模板的根节点上面

    ```html
    <todo-item v-for="item in list" id="my" data-test="test" :title="item.title" :del="item.del"></todo-item>
    ```

2. Vue 注册的组件名必须是全局唯一的

## 自定义事件

1. 在子组件的原生事件中通过 `this.$emit('my-event', this.val)` 抛出 `my-event` 事件和参数，在父组件中通过 `@my-event="handle"` 接收这个自定义事件和参数，然后在该事件的 `handle(val) { console.log(val) }` 方法中获取传递过来的参数值

## 插槽slot

1. slot 是传递复杂内容的一种方式，因为在模板语法中无法使用简单的属性传递复杂的内容，所以才设计了这么一种 API 传递复杂的内容
2. 作用域插槽本质上传递的是一个返回组件的函数，在组件内部通过 `slot` 的形式调用了函数，并且给函数传递了参数 `value` 去返回一个标签

## 数据流和双向绑定

1. vue 双向绑定本质上还是单向数据流，`v-model` 只是一种简写方式，目的是让我们写更少的代码完成同样的功能
2. `v-model` 本质只是 `value` 与 `input` 事件结合起来的一种语法糖，帮我们简化代码

### 自定义组件的 v-model

1. 新增 `model` 属性，告诉 vue 底层，`v-model` 是哪个属性和哪个事件的简写方式

    ```jsx
    Vue.component('base-checkbox', {
      model: {
        prop: 'checked',
        event: 'change'
      },
      props: {
        checked: Boolean // 需要在组件的 props 选项里声明 checked 这个 prop
      },
      template: `
        <input
          type="checkbox"
          v-bind:checked="checked"
          v-on:change="$emit('change', $event.target.checked)"
        >
      `
    })
    ```

## 虚拟 DOM 操作

1. 引入数据中间层避免直接操作 DOM，不在关注 DOM 元素，仅仅关注数据 state，所有的事件操作的对象都是数据，然后由 vue 底层将数据映射到 DOM 上，数据的变化导致 DOM 的更新，DOM 的更新变动非常耗性能，影响用户体验
2. 为了在数据变化后尽可能减少 DOM 的更新，提出了虚拟 DOM 概念
3. 数据不是直接反映到真实 DOM 节点上，而是先通过数据和模板生成一个类似 DOM 树的结构，称为虚拟 DOM
4. 虚拟 DOM 经过一定的算法机制，计算出老的 DOM 树与即将要更新的 DOM 树之间要改变的 DOM，然后根据算法尽可能地复用已有的 DOM，减少 DOM 更新带来的性能消耗，这样就涉及到了两个 DOM 树的比对
5. 虚拟 DOM 的 Diff 算法基于两个简单的建设:
   1. 两个相同的组件产生类似的DOM结构，不同的组件产生不同的DOM结构
   2. 同一层级的一组节点，他们可以通过唯一的 id 进行区分
6. Diff 算法比对同层 DOM 节点，节点类型不一致则删除并新建新的节点，节点类型相同则会重新设置该节点的属性，从而实现节点的更新
7. 如果使用 `key` 来给每个节点做一个唯一标识，Diff 算法就可以正确的识别此节点，找到正确的位置区插入新的节点
8. `key` 的作用主要是为了高效的更新虚拟 DOM 。另外 vue 中在使用相同标签名元素的过渡切换时，也会使用到 key 属性，其目的也是为了让 vue 可以区分它们，否则 vue 只会替换其内部属性而不会触发过渡效果
9. 建议尽可能在使用 v-for 时提供 key attribute，除非遍历输出的 DOM 内容非常简单

### 为什么不能用 index 作为 key

```jsx
<template>
  <div v-for="(item, index) in list" :key="index" >{{item.name}}</div>
</template>

const list = [
    {
        id: 1,
        name: "Person1"
    },
    {
        id: 2,
        name: "Person2"
    },
    {
        id: 3,
        name: "Person3"
    },
    {
        id:4,
        name:"Person4"
    }
]
```

上面组件，删除 `Person4` 是正常的，但是如果我删除 `Person2` 就会出现问题。因为删除 Person2 之后，除了 Person1 之外，剩下的 Person3、Person4，因为被发现与相应 `key` 的绑定关系有变化，所以被重新渲染，这会影响性能。

如果此时 `list` 的 `item` 是 select 的选项，其中 Person3 是选中的，这个时候 Person2 被删除了，用 `index` 作为 `key` 就会变成是 Person4 选中的了，这就产生了 bug 。

如果使用唯一 `id` 作为 `key` ，删除 Person2 后，剩下的元素因为与 `key` `的关系没有发生变化，都不会被重新渲染，从而达到提升性能的目的。此时，list` 的 `item` 作为 select 的选项，也不会出现上面所描述的 bug 。
