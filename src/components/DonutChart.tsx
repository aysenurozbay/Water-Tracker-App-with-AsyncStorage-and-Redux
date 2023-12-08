import { StyleSheet, View, Animated, TextInput, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Svg, { G, Circle } from 'react-native-svg'
import { getData } from '../helpers/AsyncStorageHelper'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)
interface IDonutChartProps {
  percentage?: number
  radius?: number
  strokeWidth?: number
  duration?: number
  delay: number
  max: number
  color?: string
}

const DonutChart = ({ percentage = 0, radius = 40, strokeWidth = 20, duration = 1500, color, delay = 0, max = 1200 }: IDonutChartProps) => {
  const halfCircle = radius + strokeWidth
  const circleCircumference = 2 * Math.PI * radius

  const circleRef = useRef<Circle>()
  const inputRef = React.useRef<TextInput>()
  const animatedValue = useRef(new Animated.Value(0)).current

  const animation = (toValue: number) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start()

    //git gel yapması için
    // start(() => {
    //   animation(toValue === 0 ? percentage : 0)
    // })
  }
  React.useEffect(() => {
    animation(percentage)
    animatedValue.addListener(v => {
      const maxPerc = (100 * v.value) / max
      const strokeDashoffset = circleCircumference - (circleCircumference * maxPerc) / 100
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}`,
        })
      }
      if (circleRef?.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset,
        })
      }
    })

    return () => {
      animatedValue.removeAllListeners()
    }
  })
  return (
    <View>
      <Svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation={'-90'} origin={`${halfCircle} ,${halfCircle}`}>
          <AnimatedCircle
            ref={circleRef}
            cx='50%'
            cy='50%'
            r={radius}
            fill='transparent'
            stroke={color ? color : '#0d47a1'}
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeDashoffset={circleCircumference}
            strokeDasharray={circleCircumference}
          />
          <Circle cx={'50%'} cy={'50%'} fill={'transparent'} stroke={'#fff'} strokeWidth={strokeWidth} r={radius} strokeOpacity={0.2} />
        </G>
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid='transparent'
        editable={false}
        defaultValue='0'
        style={[StyleSheet.absoluteFillObject, { fontSize: radius / 2, color: color ? color : '#fff' }, styles.text]}
      />
    </View>
  )
}

export default DonutChart

const styles = StyleSheet.create({
  text: { fontWeight: '900', textAlign: 'center' },
})
