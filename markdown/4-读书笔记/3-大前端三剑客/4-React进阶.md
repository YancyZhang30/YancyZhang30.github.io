本章是React进阶原理篇，重点介绍React源码的下载编译与调试、React Fiber架构、React Diff算法原理、React Hook的实现原理及手动实现自己的轻量级的React等。

## react源码

React的源码目录主要有三个文件夹：

fixtures（一些测试Demo，方便React编码时测试）；

packages（React的主要源码内容）；

scripts（和React打包、编译、本地开发相关的命令）；

![](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P623_31133.jpg)

![](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-T624_43579.jpg)

## react架构原理

由于JavaScript语言本身的设计原因，JavaScript一直作为浏览器辅助脚本来使用，如何使用JavaScript语言开发高性能的面向浏览器端的应用程序，对于前端架构来讲是一直是一个很难解决的问题。

React框架的设计初衷就是要使用JavaScript语言来构建“快速响应”的大型Web应用程序，但是“快速响应”主要受下面两方面的原因影响。

(1)CPU的瓶颈：当项目变得庞大、组件数量繁多、遇到大计算量的操作或者设备性能不足时会使页面掉帧，导致卡顿。
(2)IO的瓶颈：发送网络请求后，由于需要等待数据返回才能进一步操作而导致不能快速响应。

> 说明：浏览器有多个线程：JS引擎线程、GUI渲染线程、HTTP请求线程、事件处理线程、定时器触发线程，其中JS引擎线程和GUI渲染线程是互斥的，所以JS脚本执行和浏览器布局、绘制不能同时执行。超过16.6ms就会让用户感知到卡顿。

对于浏览器来讲，页面的内容都是一帧一帧绘制出来的，浏览器刷新率代表浏览器1秒绘制多少帧。原则上说1s内绘制的帧数越多，画面表现就越细腻。

当每秒绘制的帧数(FPS)达到60时，页面是流畅的，当小于这个值时，用户会感觉到卡顿。目前浏览器大多是60Hz（60帧／秒），每一帧耗时大约为16.6ms。那么在这一帧的(16.6ms)过程中浏览器又干了些什么呢？

![](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P625_31186.jpg)

(1)处理输入事件，能够让用户得到最早的反馈。

(2)处理定时器，需要检查定时器是否到时间，并执行对应的回调。

(3)处理Begin Frame（开始帧），即每一帧的事件，包括window.resize、scroll、media query change等。

(4)执行请求动画帧requestAnimationFrame(rAF)，即在每次绘制之前会执行rAF回调。

(5)进行Layout操作，包括计算布局和更新布局，即这个元素的样式是怎样的，它应该在页面如何展示。

(6)进行Paint操作，得到树中每个节点的尺寸与位置等信息，浏览器针对每个元素进行内容填充。

等待以上6个阶段都完成了，接下来处于空闲阶段(IdlePeriod)，可以在这时执行requestIdleCallback()方法（下面简称为RIC）里注册的用户任务。

RIC事件不是每一帧结束都会触发执行的，只有在一帧的16.6ms中做完了前面6件事且还有剩余时间时才会执行。如果一帧执行结束后还有时间执行RIC事件，则下一帧需要在事件执行结束才能继续渲染，所以RIC执行不要超过 30ms，如果长时间不将控制权交还给浏览器，则会影响下一帧的渲染，导致页面出现卡顿和事件响应不及时。

![](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P626_31197.jpg)

requestIdleCallback()方法只在一帧末尾有空闲时才会执行回调函数，它很适合处理一些需要在浏览器空闲时进行处理的任务，例如：统计上传、数据预加载、模板渲染等。

如果一直没有空闲，requestIdleCallback()就只能永远在等待状态吗？当然不是，它的参数除了回调函数之外，还有一个可选的配置对象，可以使用timeout属性设置超时时间；当到达这段时间后requestIdleCallback()的回调就会立即推入事件队列。

### react15架构

在React架构中，首次引入了**虚拟DOM**。采用虚拟DOM替代真实DOM的目的是为了提高页面的更新效率，采用更新时进行两次虚拟DOM树的比较算法。通过对比虚拟DOM，找出差异部分，从而只将差异部分更新到页面中，避免更新整体DOM以提高性能。

React 15从整体架构上可以分为协调器(Reconciler)和渲染器(Renderer)两部分。

在页面DOM发生更新时，就需要更新虚拟DOM，此时React协调器就会执行如下操作：

(1)调用函数式组件、类组件的render()方法，将返回的JSX转化为虚拟DOM。

(2)将虚拟DOM和上次更新时的虚拟DOM对比。

(3)通过对比找出本次更新中变化的虚拟DOM。

(4)通知Renderer将变化的虚拟DOM渲染到页面上。

React 15版本使用的是Stack Reconciliation（栈调和器），它采用了递归、同步的方式。栈的优点在于用少量的代码就可以实现Diff功能，并且非常容易理解，但是由于递归执行，所以更新一旦开始，中途就无法中断。当调用层级很深时，如果递归更新时间超过了屏幕刷新时间间隔，用户交互就会感觉到卡顿。

根据Diff算法实现形式的不同，调和过程被划分为以React 15为代表的“栈调和”及以React 16为代表的“Fiber调和”。

### react16架构
由于React 15的更新流程是同步执行的，一旦开始更新直到页面渲染前都不能中断。

为了解决同步更新长时间占用线程导致页面卡顿的问题，以及探索运行时优化的更多可能，React 16版本中提出了两种解决方案：Concurrent（并行渲染）与Scheduler（调度）。

(1)Concurrent：将同步的渲染变成可拆解为多步的异步渲染，这样可以将超过16ms的渲染代码分几次执行。

(2)Scheduler：调度系统，支持不同渲染优先级，对Concurrent进行调度。当然，调度系统对低优先级任务会不断提高优先级，所以不会出现低优先级任务总得不到执行的情况。为了保证不产生阻塞的感觉，调度系统会将所有待执行的回调函数存在一份清单中，在每次浏览器渲染时间分片间尽可能地执行，并将没有执行完的内容保留到下个分片处理。

React 16版本中重新定义一个Fiber数据结构代替之前的VNode对象，使用Fiber实现了React自己的组件调用栈，它以链表的形式遍历组件树，这种链表的方式可以灵活地暂停、继续和丢弃执行的任务。

React 16进行了模式的设置，分别为Legacy模式、Concurrent模式、Blocking模式，其中Concurrent模式是启用Fiber分片的异步渲染方式，而Legacy模式则仍采用React 15版本的同步渲染模式，Blocking则是介于二者之间的模式，React有意按照这样一种渐进的方式进行过渡。

由于新的架构建立在Fiber之上，该版本架构又被称为React Fiber架构。架构的核心利用了60帧原则，内部实现了一个基于优先级和requestIdleCallback的循环任务调度算法。

为了更好地提升页面以便能够流畅渲染，把更新过程分为render和commit两个阶段。

![](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P628_31238.jpg)

(1)render阶段：该阶段包括调度器和协调器。主要任务是构建Fiber对象和构建链表，在链表中标记Fiber要执行的DOM操作，这个过程是可中断的。

(2)commit阶段：渲染真实的DOM，根据构建好的链表执行DOM操作，这个阶段是不可中断的。

#### scheduler
scheduler过程会对诸多的任务进行优先级排序，让浏览器的每一帧优先执行高优先级的任务（例如动画、用户单击输入事件等），从而防止React的更新任务太大而影响到用户交互，保证页面的流畅性。

#### reconciler
在reconciler过程中，会开始根据优先级执行更新任务。这一过程主要根据最新状态构建新的Fiber树，与之前的Fiber树进行`Diff对比`，对Fiber节点标记不同的副作用，对应渲染过程中真实DOM的增、删、改。

#### commit
在render阶段中，最终会生成一个effectList数组，用于记录页面真实DOM的新增、删除和替换等及一些事件响应，commit会根据effectList对真实的页面进行更新，从而实现页面的改变。

> 注意：实际上，只有在Concurrent模式中才能体会到Scheduler的任务调度核心逻辑，但是这种模式直到React 17都没有暴露稳定的API，只是提供了一个非稳定版的unstable_createRoot()方法。

### React Fiber的协调过程
主要是根据最新状态构建新的`Fiber树`，与之前的Fiber树进行`Diff对比`，对Fiber节点标记不同的副作用，对应渲染过程中真实DOM的增、删、改。

#### 1)构建Fiber对象
Fiber可以理解为一种数据结构，React Fiber是采用链表实现的。

![fiber](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P629_31245.jpg)

![fiber](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P629_31253.jpg)

Fiber单元之间的关联关系组成了Fiber树，Fiber树是根据虚拟DOM树构造出来的，树形结构完全一致，只是包含的信息不同。

![fiber tree](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P630_31259.jpg)

例如真实DOM转fiber树：

![dom](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P630_31267.jpg)

![fiber tree](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P630_31295.jpg)

Fiber树在首次渲染时会一次性生成。在后续需要Diff时，会根据已有树和最新虚拟DOM的信息，生成一棵新的树。
这棵新树每生成一个新的节点都会将控制权交给主线程，去检查有没有优先级更高的任务需要执行。如果没有，则继续构建树的过程。

如果在此过程中有优先级更高的任务需要进行，则FiberReconciler会丢弃正在生成的树，在空闲时再重新执行一遍。在构造Fiber树的过程中，Fiber Reconciler会将需要更新的节点信息保存到Effect List中，在阶段二执行时，会批量更新相应的节点。

#### 2)构建列表
在React Fiber中用链表遍历的方式替代了React 16之前的栈递归方案。在React 16中使用了大量的链表。

链表的特点：通过链表可以按照顺序存储内容，链表相比顺序结构数据格式的好处如下：

(1)操作更高效，例如顺序调整、删除，只需改变节点的指针指向即可。

(2)不仅可以根据当前节点找到下一个节点，在多向链表中，还可以找到它的父节点或者兄弟节点。

但链表也不是完美的，缺点如下：

 (1)比顺序结构数据更占用空间，因为每个节点对象都保存着指向下一个对象的指针。

 (2)不能自由读取，必须找到它的上一个节点。

 React用`空间换时间`，更高效的操作可以根据优先级进行操作。同时，可以根据当前节点找到其他节点，在下面提到的`挂起和恢复过程`中起到了关键作用。

 #### 3)Fiber树的遍历流程
React采用child链表（子节点链表）、sibling链表（兄弟节点链表）、return链表（父节点链表）`多条单向链表遍历`的方式来代替`n叉树的深度优先遍历`。

![fiber link](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P631_31305.jpg)

在协调的过程中，不再需要依赖系统调用栈。因为单向链表遍历严格按照链表方向，同时每个节点都拥有唯一的下一节点，所以在中断时，不需要维护整理调用栈，以便恢复中断。只需保护对中断时所对应的Fiber节点的引用，在恢复中断时就可以继续遍历下一个节点（不管下一个节点是child、sibling还是return）。

### React Fiber的调度机制
React调度器模块(Scheduler)的职责是进行任务调度，只需将任务和任务的优先级交给它，它就可以帮助开发者管理任务，以及安排任务的执行。

对于多个任务，它会先执行优先级高的。对于单个任务采用执行一会儿，中断一下，如此往复。用这样的模式，来避免一直占用有限的资源执行耗时较长的任务，解决用户操作时页面卡顿的问题，实现更快的响应。

为了实现多个任务的管理和单个任务的控制，调度引入了两个概念：`时间片`和`任务优先级`。

任务优先级让任务按照自身的紧急程度排序，这样可以让优先级最高的任务最先被执行；时间片规定的是单个任务在这一帧内最大的执行时间(yieldInterval=5ms)，任务的执行时间一旦超过时间片，则会被打断，转而去执行更高优先级的任务，这样可以保证页面不会因为任务执行时间过长而产生掉帧或者影响用户交互。

React在Diff对比差异时会占用一定的JavaScript执行时间，调度器内部借助`MessageChannel`实现了在浏览器绘制之前指定一个时间片，如果React在指定时间内没有对比完，调度器就会强制将`执行权`交给浏览器。

#### 1)时间片
在浏览器的一帧中JS的执行时间如图：

![time](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P633_31330.jpg)

requestIdleCallback是在浏览器`重绘／重排`之后，如果还有空闲才可以执行的时机。实际上，React调度器并`没有直接使用requestIdleCallback`这个现成的API，而是通过`Message Channel`实现了requestIdleCallback接口的功能，如果当前环境不支持Message Channel，就采用`setTimeout`实现。这样设计的主要原因是因为requestIdleCallback接口存在`兼容问题和触发时机不稳定的问题`。

在源码中，每个时间片的默认时间被设置为5ms，但是这个值会根据设备的帧率调整。

![fps](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P633_31338.jpg)

#### 2)调度的优先级
调度优先级，本质上根据任务开始时间和过期时间利用小顶堆的优先队列而进行时间分片处理及调度。

![scheduler](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-T634_43598.jpg)

小顶堆源码：

![type](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P634_31401.jpg)

![code](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P635_31420.jpg)

![code](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P636_31451.jpg)

### React Scheduler（调度）实现
接下来使用setTimeout和Message Channel两种方式实现一个简单的React的调度器功能。

#### 使用setTimeout实现
setTimeout可以设置间隔的毫秒数。

![setTimeout](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P636_31465.jpg)

#### 使用Message Channel实现
调度器中定义了两个任务最小堆：`timerQueue`和`taskQueue`，分别存储着`未过期的任务`和`过期的任务`。每个任务可以设置优先级，处理时会给每个任务设置一定的执行延迟。

![message channel](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P637_31486.jpg)
![message channel](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P638_31498.jpg)
![message channel](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P639_31513.jpg)
![message cahnnel](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P640_31525.jpg)

使用Message Channel来生成宏任务，使用宏任务将主线程还给浏览器，以便浏览器更新页面。浏览器更新页面后继续执行未完成的任务。

在JS中可以实现调度的方式有多种，如使用setTimeout(fn,0)，递归调用setTimeout()，但是这种方式会使调用间隔变为4ms，从而导致浪费了4ms。也可以使用requestAnimateFrame()，该方法依赖浏览器的更新时间，如果上次任务调度不是requestAnimateFrame()触发的，将导致在当前帧更新前进行两次任务调度。当页面更新的时间不确定时，如果浏览器间隔了10ms才更新页面，则这10ms就浪费了。

> 这里需要注意，不能使用微任务，因为微任务将在页面更新前全部执行完，所以达不到将主线程还给浏览器的目的。