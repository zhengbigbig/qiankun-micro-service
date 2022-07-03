import React from 'react'
import ResultPage from '../ResultPage'

interface ErrorBoundaryState {
  hasError: boolean
}
/**
 * 错误边界
 */
class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
  static getDerivedStateFromError() {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true }
  }
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error: Error) {
    console.error('父应用捕获异常', error)
  }

  render() {
    if (this.state.hasError) {
      return <ResultPage status={500} />
    }
    return this.props.children
  }
}

export default ErrorBoundary
