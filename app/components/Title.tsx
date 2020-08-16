import React from "react"
import { Link } from "blitz"

type TitleProps = {
  text: string
}

const Title = (props: TitleProps) => {
  return (
    <Link href="/todos">
      <a className="text-4xl mb-2">{props.text}</a>
    </Link>
  )
}

export default Title
