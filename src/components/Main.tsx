import { BoxProps } from "@chakra-ui/react"

type MainProps = BoxProps
export const Main = ({children}:MainProps) => {
  return (
    <div>{children}</div>
  )
}
