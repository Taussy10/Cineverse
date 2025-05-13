import { Link, router } from 'expo-router';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { icons } from '~/constants/icons';
import { useState } from 'react';

// interface propsType {
//   image: string;
//   rating: number;
//   title: string;
// }

// const MovieCard = ({ image, rating, title }: propsType) => {
// const PopularMoviesCards = ({ id, poster_path, vote_average, original_title, release_date }: Movie) => {
const PopularMoviesCards = ({data}) => {
  console.log('data from popular movies:', data);

  return (
    <View>
      <Text className="  mb-3 mt-5  text-xl font-bold text-white">Trending Movies</Text>

      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item, index }) => {
        //   console.log('item :', item.poster_url);

          return (
            // <TouchableOpacity onPress={ router.push({
            //   pathname: '/movie/[id]',
            //   params: id
            // })}>
            //   </TouchableOpacity>
            // <Link href={`movie/${id}`} asChild>
            <TouchableOpacity
              activeOpacity={0.6}
              className=" mb-6 mr-6 "
                onPress={() =>
                  router.push({
                    pathname: '/movies/[id]',
                    // We have to write params in curlies
                    params: { id: item.movie_id.toString() },
                  })
                }
            >
              <Image
                source={{
                  uri: item.poster_url
                    ? item.poster_url
                    : 'https://imgs.search.brave.com/_Svg6-LpfcJeA2e4HQl40eXQb6pFpYAn8H2ueohz8oc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2LzU3LzM3LzAx/LzM2MF9GXzY1NzM3/MDE1MF9wZE5lRzVw/akk5NzZaYXNWYktO/OVZxSDFyZm95a2RZ/VS5qcGc',
                }}
                // source={{ uri: item.poster_url }}
                className="  h-52 w-44 rounded-xl"
                resizeMode="cover"
              />
              {/*Movie Details*/}
              <View>
                <Text
                  numberOfLines={1} // Just show text will take only one line
                  className=" text-xl font-bold mt-2 text-white text-center ">
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
            // </Link>
          );
        }}
      />
    </View>
  );
};

export default PopularMoviesCards;
