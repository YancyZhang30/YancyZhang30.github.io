# TypeScript进阶

## 基础用法

## 进阶用法
### 泛型
在 TypeScript 中，泛型允许我们在定义函数、类或接口时使用参数化类型，从而增加代码的灵活性和重用性。

以下是 TypeScript 中泛型的一些常见用法：

1. 函数中使用泛型：
```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString"); // 明确指定泛型类型
let output2 = identity("myString"); // 类型推断

```
2. 接口中使用泛型：
```typescript
interface Container<T> {
  value: T;
}

let container: Container<number> = { value: 5 };
```
3. 类中使用泛型：
```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```
4. 泛型约束：
```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```