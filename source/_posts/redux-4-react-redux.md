---
title: react-redux
date: 2019-11-06 08:42:29
categories:
- react
tags:
- redux
- react-redux
- 原理
---

### What

> Official React bindings for Redux

<!-- more -->
![](/assets/blogImg/redux-async.png)
### Usage
+ 通过Provider将React根组件包裹起来
```javascript
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
```
+ 通过connect组件将container组件与readux作绑定
```javascript
import * as actions from "./action";
export default connect(
  state => { //映射当前需要的state，形参state是整个应用的
    return {
      counterData: state.Counter2
    };
  },
  dispatch => {
    return bindActionCreators({...actions,push}, dispatch); //将actionCreators绑上dispatch
  }
)(Counter);
```
### Provider
+ [`Context`](https://zh-hans.reactjs.org/docs/context.html) 提供了一个`无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法`。
+ 声明一个全局的ReactContext(ReactReduxContext)对象
+ 创建一个Provider组件将children包裹起来，使children`无论在何层级都能拿到Provider的value`

```javascript
//创建一个全局的ReactContext(ReactReduxContext)对象
export const ReactReduxContext = React.createContext(null);
//创建一个Provider组件将children包裹起来，使children无论在何层级都能拿到Provider的value
render() {
    return (
    <ReactReduxContext.Provider value={{ store: this.props.store }}>
        {this.props.children}
    </ReactReduxContext.Provider>
    );
}
```
### connect
本质上是一个[`高阶组件`](https://reactjs.org/docs/higher-order-components.html)，返回一个新组件
+ 新组件会监听store变化，如果变化则将获取最新state并`重新渲染`
+ mapStateProps保证新组件只设置`需要的state，而不是整个state`
+ mapDispatchToProps将结果作为props传入新组件

```javascript
export default function(mapStateProps, mapDispatchToProps) {
  return function wrapWithConnect(WrappedComponent) {
    return class extends React.Component {
      state = mapStateProps(this.context.store.getState());
      static contextType = ReactReduxContext;
      componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => {
          this.setState(mapStateProps(this.context.store.getState()));
        });
      }
    shouldComponentUpdate() {
        if (this.state === mapStateProps(this.context.store.getState())) {
        return false;
        }
        return true;
    }
      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        const boundedActionCreators = mapDispatchToProps(this.context.store.dispatch)
        return <WrappedComponent {...this.state} {...boundedActionCreators} />;
      }
    };
  };
}
```