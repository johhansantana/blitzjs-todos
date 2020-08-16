import React from "react"

type Props = {
  children: any
}

const MainLayout = (props: Props) => {
  return <div className="flex flex-col items-center justify-center">{props.children}</div>
}

export default MainLayout
