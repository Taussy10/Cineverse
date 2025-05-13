import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '~/constants/images'
import { icons } from '~/constants/icons'

const Saved = () => {
  return (
    // It's not compusory to use px-4 only top of 
    // container can be use it only for content depending on the condition 
    // in this case we don't want to do anything with gradient(BG) that's why 
      <SafeAreaView
       className=' flex-1  bg-primary'>
        <Image source={images.bg}
        className=' absolute z-50 w-full flex-1'
        />
        <View className='mt-20 w-full flex-row justify-center items-center'>
        <Image source={icons.logo} className='size-12  ' />
        </View>

        <View className='mt-20  px-4 '>
         <Text className=' text-white'>Saved</Text>
        </View>
       </SafeAreaView>
  )
}

export default Saved;