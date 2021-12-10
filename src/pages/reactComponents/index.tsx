import { FC } from "react";

import { Buttons, Tables } from "./components";

interface Props {};

export const ReactComponents: FC<Props> = () => {
  return (
    <div>
      <Buttons />
      <Tables />
    </div>
  )
}
