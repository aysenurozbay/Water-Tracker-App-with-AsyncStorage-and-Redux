import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import DonutChart from '../components/DonutChart'
import GlassIcon from '../icons/GlassIcon'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { fetchInitialData, resetAsyncStorageData, updateAsyncStorageData, waterTracker } from '../store/waterTracker'

const width = Dimensions.get('window').width

const HomeScreen = () => {
  const dispatch = useDispatch()

  const handlePress = async (amount: number) => {
    dispatch(waterTracker.actions.updateAmount({ amount }))

    dispatch(updateAsyncStorageData(amount))
  }
  const handleResetButton = async () => {
    dispatch(resetAsyncStorageData())
  }

  const waterAmount = useSelector((state: RootState) => state.waterTracker.waterAmount)

  React.useEffect(() => {
    dispatch(fetchInitialData())
  }, [dispatch])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Water Tracker </Text>
        <Text style={styles.subtitle}>Keep Drinking </Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <DonutChart delay={100} max={2000} radius={150} percentage={waterAmount} />
        <TouchableOpacity onPress={() => handleResetButton()} activeOpacity={0.2} style={{ marginVertical: 10 }}>
          <Text style={styles.resetText}>SIFIRLA</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText} onPress={() => handlePress(-200)}>
          -
        </Text>
        <GlassIcon size={40} fill='#fff' />
        <Text style={styles.buttonText} onPress={() => handlePress(200)}>
          +
        </Text>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#48cae4',
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    width: width,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    borderRadius: 50,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
  },
  title: {
    color: '#ade8f4',
    fontWeight: '700',
    fontSize: 40,
    fontFamily: 'Roboto',
  },
  subtitle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 17,
    fontWeight: '300',
  },
  resetText: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 17,
  },
})
