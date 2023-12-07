import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeData = async (value: number) => {
  const convertedNumber = value.toString()

  try {
    await AsyncStorage.setItem('waterAmount', convertedNumber)
  } catch (e) {
    // saving error
  }
}

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('waterAmount')
    return value !== null ? parseInt(value, 10) : 0
  } catch (error) {
    console.error('Veri alınamadı:', error)
    return 0
  }
}
export const updateData = async (amount: number) => {
  try {
    const value = await getData()

    const updatedData = value + amount
    storeData(updatedData)
  } catch (error) {
    console.error('Veri alınamadı:', error)
    return null
  }
}
