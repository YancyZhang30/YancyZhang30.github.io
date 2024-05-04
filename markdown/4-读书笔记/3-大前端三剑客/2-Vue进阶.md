这本书关于vue的内容，前面主要是将常用的api列出来，并举出了实际的例子，在vue官网都可以找到。

第八章是关于vue的进阶内容，没想到有vue3响应式源码的解析，感觉非常不错。

## reactive实现原理
Vue 3中采用Proxy实现数据代理，核心就是拦截get()方法和set()方法，当获取值时收集effect()函数，当修改值时触发对应的effect()函数重新执行。
[![reactive.png](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P421_20779.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P421_20779.jpg)

### reactive函数
[![reactive function](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P422_20798.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P422_20798.jpg)

`createReactiveObject()`函数创建并返回一个Proxy代理对象，但是基础数据类型并不会被转换成代理对象，而是直接返回原始值。同时会将已经生成的代理对象缓存进传入的proxyMap，当这个代理对象已存在时不会重复生成，而会直接返回已有对象。

createReactiveObject()函数通过`TargetType`来判断target目标对象的类型，Vue 3仅会对Array、Object、Map、Set、WeakMap、WeakSet生成代理，其他对象会被标记为INVALID，并返回原始值。

当目标对象通过类型校验后，会通过new Proxy()生成一个代理对象Proxy,handler参数的传入也与targetType相关，并最终返回已生成的Proxy对象。

函数签名：

[![函数签名](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-T422_20850.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-T422_20850.jpg)

根据传入的target的类型判断该使用哪种handler，如果是Set或Map，则采用collectionHandlers，如果是普通对象或数组，则采用baseHandlers。

### Proxy拦截器：mutableHandlers()方法
对于普通对象和数组代理拦截，使用baseHandler，即mutableHandlers()。mutableHandlers()可拦截5种方法。
1. 在`get/has/ownKeys` trap里通过track()方法收集依赖
2. 在`deleteProperty/set` trap里通过trigger()方法触发通知。

[![Proxy拦截器：mutableHandlers](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P423_20858.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P423_20858.jpg)

### Proxy拦截器：collectionHandlers()方法
collectionHandlers.ts文件包含Map、WeakMap、Set、WeakSet的处理器对象，分别对应完全响应式的Proxy实例、浅层响应的Proxy实例、只读Proxy实例。

[![Proxy拦截器：collectionHandlers()方法](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P424_20881.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P424_20881.jpg)

### 依赖收集与派发更新

创建响应式代理对象的目的是能够在该对象的值发生变化时，`通知`所有引用了该对象的地方进行同步，以便对值进行修改。

[![依赖收集与派发更新](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P425_20905.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P425_20905.jpg)

在Vue 2中，进行依赖收集时，收集的是watcher，而Vue 3已经没有了watcher的概念，取而代之的是`effect（副作用函数）`。

effect作为reactive的核心，主要负责`收集依赖`，以及`更新依赖`。

#### 依赖收集：track
依赖收集方法定义在reactivity模块的effect.ts代码中，`track()`方法通过使用WeakMap存储用户自定义函数的订阅者来实现依赖收集。

[![track](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P426_20916.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P426_20916.jpg)

`targetMap`是一个全局WeakMap对象，作为一个依赖收集容器，用于存储`target[key]`相应的dep依赖。`targetMap.get(target)`获取target对应的depsMap,`depsMap内部`又是一个Map,key为target中的属性，depsMap.get(key)则为Set结构存储的`target[key]`对应的dep,dep中则存储了`所有依赖的effects`。

#### 依赖更新派发：trigger
依赖收集完毕，接下来当target的属性值被修改时会触发`trigger`，获得相应的依赖并执行effect。

(1)首先校验一下target有没有被收集依赖，若没有收集依赖，则执行return。

(2)根据不同的操作执行clear、add、delete、set，将合规的effect加入effects set集合中。

(3)遍历effects set集合，执行effect()函数。

[![trigger](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P427_20931.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P427_20931.jpg)
[![triiger](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P428_20983.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P428_20983.jpg)

> 但是这个effect中的run到底做了些什么呢？？？

### Vue3响应式原理总结
Vue 3的响应式原理相比较Vue 2来讲，并没有本质上的变化，在语法上更新了部分函数和调用方式，在性能上有很大的提升。

(1)Vue 3用ES6的Proxy重构了响应式，如new Proxy(target,handler)。

(2)在Proxy的get handle里执行track()用来跟踪收集依赖（收集activeEffect）。

(3)在Proxy的set handle里执行trigger()用来触发响应（执行收集的effect）。

(4)effect副作用函数代替了watcher。

## Vue2 Diff算法 (双端Diff算法)
传统Diff算法通过循环递归对节点进行依次对比，效率低下，算法复杂度达到O(n3)，主要原因在于其追求完全比对和最小修改，而React、Vue则放弃了完全比对及最小修改，实现了从O(n3)到O(n)。

优化措施主要有两种：分层Diff优化、同层节点优化。

同层节点优化方式主要用在React 16之前的版本中；采用双端比较算法，这种方式主要用在如snabbdom库和Vue 2框架中。

分层Diff：不考虑跨层级移动节点，让新旧两棵VDOM树的比对无须循环递归（复杂度大幅优化，直接下降一个数量级的首要条件）。这个前提也是Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计。

[![分层diff](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P429_21001.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P429_21001.jpg)

Vue 2版本中的虚拟DOM和Diff算法借鉴了snabbdom库，在同层节点中，采用了双端比较的算法，复杂度为O(n)。双端Diff算法是通过在新旧子节点的首尾定义4个指针，然后不断地对比找到可复用的节点，同时判断需要移动的节点。

### 双端Diff算法原理
双端Diff算法是一种同时对新旧两组子节点的两个端点进行比较的算法，这里需要4个索引值，分别指向新旧两组子节点的端点。

[![双端diff](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P430_21009.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P430_21009.jpg)

，如何开始进行双端Diff比较呢？可以对比节点的类型(tag)及唯一标识符key。双端对比的实现方式就是通过4个指针分别记录新旧VNode列表的开始索引和结束索引，然后通过移动这些记录索引位置的指针并比较索引位置记录的VNode找到可以重复使用的节点，并对节点进行移动。

[![双端diff](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P431_21040.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P431_21040.jpg)

在双端Diff比较中，每轮都分为4个步骤。

第1步：首首比较。比较old VNodes的一组子节点中的第1个节点p1与new VNodes子节点中的第1个子节点p4，看一看它们是否相同。由于两个节点的key值不同，所以不相同，不可以复用，于是什么都不做，进行下一步比较。

第2步：尾尾比较。比较old VNodes的一组子节点的最后一个子节点p4与new VNodes子节点中的最后一个子节点p3，看一看它们是否相同，由于两个节点的key值不同，所以不相同，不可以复用，于是什么都不做，进行下一步比较。

第3步：首尾比较。比较old VNodes的一组子节点的第1个子节点p1与new VNodes子节点中的最后一个子节点p3，看一看它们是否相同，由于两个节点的key值不同，所以不相同，不可以复用，于是什么都不做，进行下一步比较。

第4步：尾首比较。比较old VNodes的一组子节点的最后一个子节点p4与new VNodes子节点中的第1个子节点p4，看一看它们是否相同，由于两个节点的key值相同，所以可以进行DOM复用。同时oldEndIdx向左移动一位(oldEndIndx－－)，newStartIdx也向右移动一位(newStartIdx++)。

经过上面的4个步骤，在第4步时找到了相同的节点，说明对应的真实DOM节点可以复用，对于可以复用的DOM节点，只需通过DOM移动操作便可完成更新。

### 非理性状态的处理方式
前面中用的是一个比较理想的例子，双端Diff算法的每轮比较的过程都分为4个步骤。在前面的例子中，每轮循环都会命中4个步骤中的一个，这是一种非常理想的情况，但实际上，并非所有情况都是理想状态。

[![非理性状态](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P438_21225.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P438_21225.jpg)

按照双端Diff算法的思路进行第1轮比较时，会发现无法命中4个步骤中的任何一步。

由于在两个头部和两个尾部的4个节点中都没有找到可以复用的节点，所以尝试从非头部、非尾部的节点查找是否有可以复用的节点。

如何查找呢？可以通过遍历旧节点组，寻找与新子节点组中的头部节点拥有相同key值的节点。

[![代码](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P439_21236.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P439_21236.jpg)

这里用新子节点组中的头部节点p2到旧节点组中查找时，在旧索引1的位置找到可以复用的节点，如图8-21所示。意味着，节点p2原本就不是头部节点，但是在更新之后，它变成了头部节点，所以需要将节点p2对应的真实DOM节点移动到当前的旧节点组的头部节点p1所对应的真实DOM节点之前。

[![移动节点](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P440_21257.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P440_21257.jpg)

## Vue3 Diff算法（快速Diff算法）
Vue 3的Diff算法借鉴了ivi和inferno这两个框架所采用的Diff算法，该算法中有两个理念。第1个是相同的前置与后置元素的预处理；第2个则是最长递增子序列。

### 快速Diff算法原理
Vue 3 Diff算法基本思路：在真正执行Diff算法之前进行预处理，去除相同的前缀和后缀，剩余的元素用一个数组（存储在新children中）维护，然后求解数组最长递增子序列，用于DOM移动操作。最后比对新children中剩余的元素与递增子序列数组，移动不匹配的节点。

### 相同的前置与后置元素的预处理
在真正执行Diff算法之前首先进行相同前置和后置元素的预处理，此优化是由Neil Fraser提出的，预处理比较容易实现而且可带来比较明显的性能提升。如对两段文本进行Diff之前，可以先对它们进行全等比较。

如果两个文本全等，就无须进入核心Diff算法的步骤。在下面的例子中，首先进行预处理，找到两个数组中相同的前置(prefix)和后置(suffix)元素，如图所示。
[![图8-22](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P441_21272.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P441_21272.jpg)
这里可以发现在X和Y两个数组中，前置元素A和后置元素E、F都是相同的，所以可以将这样的Diff情况转变为如图所示。去除相同的前置和后置元素后，真正需要处理的是[B,C,D]和[D,B,C]，复杂性会大大降低。
[![图8-23](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P441_21275.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P441_21275.jpg)

### 最长递增子序列
接下来需要将原数组中的[B,C,D]转化成[D,B,C]。Vue 3中对移动次数进行了进一步优化。下面对这个算法进行介绍：
[![BCD](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P441_21278.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P441_21278.jpg)

首先遍历新列表，通过key去查找在原有列表中的位置，从而得到新列表在原有列表中位置所构成的数组。例如原数组中的[B,C,D]，新数组为[D,B,C]，得到的位置数组为[3,1,2]，现在的算法就是通过位置数组判断最小化移动次数。

然后计算最长递增子序列，最长递增子序列是经典的动态规划算法。为什么最长递增子序列就可以保证移动次数最少呢？因为在位置数组中递增就能保证在旧数组中的相对位置的有序性，从而不需要移动，因此递增子序列最长可以保证移动次数最少。

对于前面得到的位置数组[3,1,2]，可得到最长递增子序列[1,2]，满足此子序列的元素不需要移动，而对没有满足此子序列的元素进行移动即可。对应的实际的节点即将D节点移动至B和C的前面即可。实现最长递增子序列，如代码示例所示。

[![最长递增子序列](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P441_21286.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P441_21286.jpg)