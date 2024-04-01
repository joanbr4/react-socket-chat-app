import { ReactNode } from "react"

export function ErrorLayout(props: { children?: ReactNode }) {
  return <div className="boxErrorLayout">{props.children}</div>
}
