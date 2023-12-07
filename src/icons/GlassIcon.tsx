import React from 'react'
import Svg, { Path } from 'react-native-svg'

interface IGlassIconProps {
  size: number
  fill: string
}

const GlassIcon = ({ size, fill = '#000', ...props }: IGlassIconProps) => {
  return (
    <Svg height={size} width={size} viewBox='0 0 14 14' fill={fill} {...props}>
      <Path d='M1.175.277a.75.75 0 0 1 .56-.25h10.53a.75.75 0 0 1 .746.836l-.545 4.71v.003l-.7 6.039a2.665 2.665 0 0 1-2.662 2.358H4.877a2.665 2.665 0 0 1-2.662-2.358v-.002l-.689-6.038L.99.862a.75.75 0 0 1 .186-.585Zm10.249 1.25l-.372 3.213H2.941l-.366-3.213h8.849Z' />
    </Svg>
  )
}
export default GlassIcon
