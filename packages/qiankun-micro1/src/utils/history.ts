import { createBrowserHistory, History, LocationDescriptorObject, LocationState, Path } from 'history'
import { PromptProps } from 'react-router-dom'
import * as H from 'history'

export interface QianKunParentProps {
  history?: H.History
  container?: HTMLElement
  setPrompt?: (prompt: PromptProps) => void
}

interface HistoryWithPro extends History {
  /**
   * 打开新页面，带上前缀地址 basename
   * @param url 需要打开的url
   */
  open: (url: string) => void
  /**
   * 设置路由拦截
   */
  setPrompt: (props: PromptProps) => void
  /**
   * 当前项目的basename
   */
  basename: string
  /** 推入新的url */
  push: (path: Path | LocationDescriptorObject, state?: LocationState) => void
}
let history: HistoryWithPro = {
  ...createBrowserHistory(),
  open: () => {},
  setPrompt: () => {},
  basename: ''
}

const prefix = ''
/**
 * 项目初始化时调用, 修改了history.push的规则， 以/app开头的路径会走主应用路由
 * @param basename 项目的basename, 例如 /app/contentCenter
 * @param parentProps 乾坤的主应用路由, 如果不传还是使用自身路由
 */
export const configHistory = (basename: string, parentProps: QianKunParentProps): HistoryWithPro => {
  const realBaseName = prefix + basename
  const tempHistory = createBrowserHistory({
    basename: realBaseName
  })
  const open = (url: string) => {
    if (url.startsWith('/app')) {
      // 以/app开头的路径自动带上/panGu前缀
      window.open(prefix + url)
    } else if (url.startsWith(prefix) || url.startsWith('http')) {
      // 以/panGu或http开头的路径直接打开
      window.open(url)
    } else {
      // 其他路径则拼上完整basename，例如: /panGu/app/contentCenter + /member/list
      window.open(realBaseName + url)
    }
  }
  const setPrompt = parentProps.setPrompt || history.setPrompt
  history = { ...tempHistory, open, setPrompt, basename: realBaseName }
  const proHistory = parentProps.history || tempHistory
  history.push = (path: Path | LocationDescriptorObject, state?: LocationState) => {
    // 以/app开头的路径走父路由，其它走自己的路由
    if (typeof path === 'string') {
      if (path.startsWith('/app') || path.startsWith('/login')) {
        proHistory.push(path, state)
      } else {
        tempHistory.push(path, state)
      }
    } else {
      if (path.pathname?.startsWith('/app')) {
        proHistory.push(path)
      } else {
        tempHistory.push(path)
      }
    }
  }
  return history
}

/**
 * js中获取路由方法
 */
export const getHistory = (): HistoryWithPro => {
  return history
}
