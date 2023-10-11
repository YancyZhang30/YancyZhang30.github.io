```text
old：a b d

new：a c d b
```
1. 第一次
oldS = a
oldE = d

newS = a
newE = b

oldS和newS匹配，则将dom中的a节点放到第一个，已经是第一个了就不管了，此时dom的位置为：a b d

oldS和newS均后移

2. 第二次
oldS = b
oldE = d

newS = c
newE = b

oldS和newE匹配，就将原本的b节点移动到最后，因为E是最后一个节点，他们位置要一致，
这就是上面说的：当其中两个能匹配上那么真实dom中的相应节点会移到Vnode相应的位置，此时dom的位置为：a d b

oldS后移，newE前移

3. 第三次
oldS = d
odlE = d

newS = c
newE = d

oldE和E匹配，位置不变此时dom的位置为：a d b

4. 第四次
oldS++
oldE--
oldS > oldE

遍历结束，说明oldCh先遍历完。就将剩余的节点根据自己的的index插入到真实dom中去，此时dom位置为：a c d b