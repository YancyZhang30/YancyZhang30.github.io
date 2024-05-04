# Lodash
Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。
```bash
npm i --save lodash

npm i --save --dev @types/lodash
```

## 语言相关
## cloneDeep
```ts
_.cloneDeep(value)
```
这个方法类似_.clone，除了它会递归拷贝 value。（注：也叫深拷贝）。
### isNil
```ts
_.isNil(value)
```
检查 value 是否是 null 或者 undefined。

##