# Dayjs

## 安装&使用
```bash
 npm install dayjs
```
```js
import dayjs from 'dayjs'
console.log(dayjs())
```
## 格式化
Day.js对象是不可变的，也就是说，以某种方式改变Day.js对象的所有API操作都将返回它的一个新实例。

```js
const now = dayjs()
```
等同于 dayjs(new Date()) 的调用，获取当前时间。

```js
dayjs().format()
// 默认返回的是 ISO8601 格式字符串 '2020-04-02T08:02:17-05:00'

dayjs('2019-01-25').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]')
// 'YYYYescape 2019-01-25T00:00:00-02:00Z'

dayjs('2019-01-25').format('DD/MM/YYYY') // '25/01/2019'

dayjs().format('YYYY-MM-DD HH:mm:ss') // 2019-01-25 00:00:00
```
:::tip
HH代表24小时格式得消失，hh代表12小时格式的小时。
:::

## 取值/赋值
```js
dayjs().second(30).valueOf() // => new Date().setSeconds(30)
dayjs().second() // => new Date().getSeconds()
```
### 秒
```js
// dayjs().millisecond()
dayjs().millisecond(1)
dayjs().millisecond()

// dayjs().millisecond()
dayjs().second(30).valueOf() // => new Date().setSeconds(30)
dayjs().second() // => new Date().getSeconds()
```
### 分钟
传入0到59的数字。 如果超出这个范围，它会进位到小时。
```js
dayjs().minute()
dayjs().minute(59)
```
### 小时
传入0到23的数字。 如果超出这个范围，它会进位到天数。
```js
dayjs().hour()
dayjs().hour(12)
```
### 天
接受1到31的数字。 如果超出这个范围，它会进位到月份。
```js
dayjs().date()
dayjs().date(1)
```
### 星期
传入 number 从0(星期天)到6(星期六)。 如果超出这个范围，它会进位到其他周。
```js
dayjs().day()
dayjs().day(0)
```
### 月
获取或设置月份。

传入0到11的 number。 如果超出这个范围，它会进位到年份。
```js
dayjs().month()
dayjs().month(0)
```
### 年
获取或设置年份里第几天。

传入1到366的数字。

如果超出这个范围，它会进位到下一年。
```js
dayjs.extend(dayOfYear)

dayjs('2010-01-01').dayOfYear() // 1
dayjs('2010-01-01').dayOfYear(365) // 2010-12-31
```
## 比较
### 时间差
```js
const date1 = dayjs('2019-01-25')
const date2 = dayjs('2018-06-05')
date1.diff(date2) // 20214000000 默认单位是毫秒

date1.diff('2018-06-05', 'month') // 7

date1.diff('2018-06-05', 'month', true) // 7.645161290322581
```
 - week	w	周
 - day	d	星期(星期日0，星期六6)
 - month	M	月份(0-11)
 - quarter	Q	季度，依赖 QuarterOfYear 插件
 - year	y	年
 - hour	h	小时
 - minute	m	分钟
 - second	s	秒
 - millisecond	ms	毫秒

### 是否之前/后
这表示 Day.js 对象是否在另一个提供的日期时间之前。
```js
dayjs().isBefore(dayjs('2011-01-01'))// 默认毫秒
dayjs().isBefore('2011-01-01', 'year')// 毫秒以外的单位
```
是否之后。
```js
dayjs().isAfter(dayjs('2011-01-01')) // 默认毫秒
dayjs().isAfter('2011-01-01', 'year')
```
是否相同。
```js
dayjs().isSame(dayjs('2011-01-01')) // 默认毫秒
dayjs().isSame('2011-01-01', 'year') //同理
```
相同或之前/后。
```js
dayjs().isSameOrBefore(dayjs('2011-01-01')) // 默认毫秒
dayjs().isSameOrBefore('2011-01-01', 'year')

dayjs().isSameOrAfter(dayjs('2011-01-01')) // 默认毫秒
```
是否两者之间。
```js
dayjs.extend(isBetween)
dayjs('2010-10-20').isBetween('2010-10-19', dayjs('2010-10-25'))
dayjs().isBetween('2010-10-19', '2010-10-25', 'year')
```