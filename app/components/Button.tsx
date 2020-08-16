import React, { useCallback } from "react"

type ButtonProps = {
  text: string
  type?: "button" | "submit"
  buttonType?: "primary" | "secondary" | "danger"
  onClick?: () => any
}

const Button = (props: ButtonProps) => {
  const getButtonTypeClassNames = useCallback(() => {
    if (props.buttonType === "primary") {
      return "bg-blue-500 hover:bg-blue-700"
    } else if (props.buttonType === "secondary") {
      return "bg-gray-500 hover:bg-gray-700"
    } else if (props.buttonType === "danger") {
      return "bg-red-500 hover:bg-red-700"
    }
  }, [props.buttonType])

  return (
    <button
      onClick={props.onClick}
      type={props.type || "button"}
      className={`${getButtonTypeClassNames()} text-white font-bold py-2 px-4 rounded`}
    >
      {props.text}
    </button>
  )
}

Button.defaultProps = {
  buttonType: "primary",
}

export default Button
