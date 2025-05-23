import {View, Text, Image, TextInput,} from 'react-native';
import { useState } from 'react';
import { icons } from '~/constants/icons';

interface propsType {
  // optional
  onPress?: () => void;
  placeholder: string;
  inputValue: string;
  onChangeText: (text: string) => void;
}

// If you are defining props externally  then define like this either by interface or type
const SearchBar = ({ onPress, placeholder, inputValue, onChangeText }: propsType) => {
  console.log('InputValue :', inputValue);

  // If you want to define Inline interface then define in {object}
  // const SearchBar = ({onPress, placeholder}:{onPress:()=> void; placeholder: string}) => {
  return (
    <View
      className="flex-row items-center  rounded-full  bg-secondary px-5 py-4
    ">
      <Image
        source={icons.search}
        className="  size-5"
        resizeMode="contain"
        // Changes the color of all non-transparent pixels to the tintColor.
        // Don't know what does it mean ? Color of image outline
        tintColor="#ab8bff"
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        className="  ml-2 flex-1  text-white  "
        onPress={onPress}
        value={inputValue}
        onChangeText={onChangeText}
      />

      {/* <Text className=' text-white'>SearchBar</Text> */}
    </View>
  );
};

export default SearchBar;
