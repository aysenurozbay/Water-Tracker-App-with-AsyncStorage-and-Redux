import { Button, Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DonutChart from '../components/DonutChart'
import GlassIcon from '../icons/GlassIcon'
import { getData, storeData, updateData } from '../helpers/AsyncStorageHelper'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { fetchInitialData, updateAsyncStorageData, waterTracker } from '../store/waterTracker'

const width = Dimensions.get('window').width

const HomeScreen = () => {
  const dispatch = useDispatch()

  const handlePress = async (amount: number) => {
    dispatch(waterTracker.actions.updateAmount({ amount }))

    dispatch(updateAsyncStorageData(amount))
  }

  const waterAmount = useSelector((state: RootState) => state.waterTracker.waterAmount)

  React.useEffect(() => {
    dispatch(fetchInitialData())
  }, [dispatch])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Water Tracker </Text>
      <DonutChart delay={100} max={2000} radius={130} percentage={waterAmount} />
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
    backgroundColor: '#001d3d',
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    width: width - 40,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    borderRadius: 50,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#0077b6',
    fontSize: 30,
    textAlign: 'center',
  },
  title: {
    color: '#ade8f4',
    fontWeight: '700',
    fontSize: 40,
    fontFamily: 'Roboto',
  },
})
