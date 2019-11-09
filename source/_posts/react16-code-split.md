---
title: react16系列-代码分割
date: 2019-08-07 09:29:01
categories:
- 前端
tags:
- react16
- react
- 题
---
### import()
> 动态 import() 语法目前只是一个 ECMAScript (JavaScript) 提案， 而不是正式的语法标准。预计在不远的将来就会被正式接受。

当 Webpack 解析到该语法时，它会自动地开始进行代码分割。如果你使用 Create React App，该功能已配置好，你能立刻使用这个特性。Next.js 也已支持该特性而无需再配置。
```javascript
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```
### react.lazy
```javascript
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));
function LazyComp(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <section>
      <OtherComponent />
      <AnotherComponent />
    </section>
  </Suspense>
  )
}
export default class App extends React.Component{
  state={
    showLazy:false
  }
  render(){
    return (
      <div>
        {this.state.showLazy?<LazyComp />:null}
        <img alt="" onClick={()=>{this.setState({showLazy:true})}} src={logo} />
      </div>
    );
  }
}
```