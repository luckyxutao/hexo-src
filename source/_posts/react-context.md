---
title: React上下文(Context)
date: 2018-04-10 16:37:39
categories:
- 基础
tags:
- react
- 源码
- 题
---

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

### 什么时候用
需要全局共享的，如：redux->store或者主题及当前认证的用户等


### API介绍
* 创建一个 Context 对象
```javascript
const MyContext = React.createContext(defaultValue);
```
* 每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。
```javascript
<MyContext.Provider value={/* 某个值 */}>
```
* 消费一个Context，订阅context变更
```javascript
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

* 简化context订阅，但只能订阅一个
```javascript
class MyClass extends React.Component {
  static contextType = MyContext
  componentDidMount() {
    let value = this.context;
    /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* 基于 MyContext 组件的值进行渲染 */
  }
}
```

* 消费多个 Context
```javascript
// Theme context，默认的 theme 是 “light” 值
const ThemeContext = React.createContext('light');

// 用户登录 context
const UserContext = React.createContext({
  name: 'Guest',
});

class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;

    // 提供初始 context 值的 App 组件
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

```