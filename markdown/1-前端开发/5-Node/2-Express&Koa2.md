# Express和Koa

## 一、中间件

中间件就是一个函数（其实函数就是一个中间件），最后通过`next()`执行下一个中间件。

```javascript
app.use((req, res, next) => {
    console.log('处理 /api 路由')
    next()
})

// 如果访问的是/api/user，也会执行这个中间件，因为命中了父路由
app.use('/api', (req, res, next) => {
    console.log('处理 /api 路由')
    next()
})

// 也可以用这种方式来注册，如果是get、或者是post请求，并且命中了路由，就去执行里面的中间件
app.get('/api', (req, res, next) => {
    console.log('get /api 路由')
    next()
})

app.post('/api', (req, res, next) => {
    console.log('post /api 路由')
    next()
})


// 模拟登录验证
function loginCheck(req, res, next) {
  setTimeout(() => {
    // 如果模拟登陆失败，执行以下逻辑
    if () {
        console.log('模拟登陆失败')
        res.json({
          errno: -1,
          msg: '登录失败'
        })
    } else {
        // 如果模拟登陆成功，执行以下逻辑
        console.log('模拟登陆成功')
        next()
    }
  })
}
app.get('/api/get-cookie', loginCheck, (req, res, next) => {
  console.log('get /api/get-cookie')
  res.json({
    errno: 0,
    data: req.cookie
  })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler 四个参数，第一个参数为异常信息
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') = 'dev' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
```

## 二、Express与Koa2中间件机

首先需要明确的一点是: Express 为线型模型，而 Koa 则为洋葱型模型。

#### 线性模型

Express使用线性模型来处理中间件。当请求进入应用程序时，中间件函数按照添加的顺序依次执行。每个中间件函数可以通过调用`next()`方法将请求传递给下一个中间件，或者结束响应链。这种线性模型使得中间件的执行顺序非常直观和易于控制。

#### 洋葱模型

Koa使用洋葱模型（Onion Model）来处理中间件。每个中间件函数被包裹在其他中间件函数的内部，形成一个处理请求的洋葱状链式结构。

当请求进入应用程序时，中间件函数按照洋葱的层级从外到内依次执行，然后再从内到外返回。中间件函数可以在请求前后执行一些操作，比如记录日志、验证权限等。这种洋葱模型使得中间件的执行顺序具有一定的灵活性和可配置性。

## 三、实现记录每次请求响应时间

#### Express

```javascript
const express = require('express');
const app = express();

app.use((req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    console.log(`Request took ${responseTime}ms`);
  });

  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
```

#### Koa

```javascript
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  const startTime = Date.now();
  await next();
  const endTime = Date.now();
  const responseTime = endTime - startTime;
  console.log(`Request took ${responseTime}ms`);
});

app.use(async (ctx) => {
  ctx.body = 'Hello World!';
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
```

