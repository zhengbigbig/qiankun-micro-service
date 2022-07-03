import { configure } from 'mobx'

configure({
  useProxies: 'never',
  // 默认值，在外部修改 observable 会警告
  enforceActions: 'never',
  // 全局状态隔离，与子应用mobx共存
  isolateGlobalState: true,
})
