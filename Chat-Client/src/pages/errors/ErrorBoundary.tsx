import { Component } from "react"
import { ErrorLayout } from "../layouts/ErrorLayout"

// import
interface IErrorBoundaryState {
  error?: {
    error: any
    errorInfo: any
  }
}

function ErrorPart(props: { error: any; errorInfo: any }) {
  const errorLines = (props.errorInfo.componentStack || "").split("\n")
  return (
    <div>
      <ErrorLayout>
        <div className="boxErrorLayout">
          {/* below is inventd, to test error */}
          <div className="boxError">
            <div className="error">
              <h1>Whoops!</h1>
              <h2>Something went wrong.</h2>
              <div className="error-details">
                {errorLines.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ErrorLayout>
    </div>
  )
}

export class ErrorBoundary extends Component<
  Record<string, unknown>,
  IErrorBoundaryState
> {
  constructor(props: { children: any }) {
    super(props)
    this.state = {
      error: undefined,
    }
  }
  render() {
    if (!this.state.error) return this.props.children as any
    return (
      <ErrorPart
        error={this.state.error.error}
        errorInfo={this.state.error.errorInfo}
      />
    )
  }
}
