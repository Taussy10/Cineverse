import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '~/constants/images';
import { icons } from '~/constants/icons';
import SearchBar from '~/components/search-bar';
import { useRouter } from 'expo-router';
import useFetch from '~/hooks/useFetch';
import { fetchMovieDetails, fetchMovies } from '~/components/services/api';
import MovieCard from '~/components/MovieCard';
import { useState, useEffect } from 'react';
import { fetchPopularMovies } from '~/appwrite/appwrite';
import PopularMoviesCards from '~/components/popular-movies-cards';

const Home = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(true);
  // For textInput we need tow things
  // 1.  storing value in text input
  // 2. Function that shows that this key has pressed by giving a prams
  // then store that key(params) in inputText

  // value is toring
  // problem is in key presssing
  const [searchQuery, setSearchQuery] = useState('');
  const [popularMovies, setPopularMovies] = useState([]);
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    // This query will take search props
  } = useFetch(() => fetchMovies({ query: searchQuery }));

  const fetchedPopularMoives = async () => {
    const result = await fetchPopularMovies();
    setPopularMovies(result);
  };
  useEffect(() => {
    fetchedPopularMoives();
  }, []);

  console.log('PopularMovies :', popularMovies);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };
  // const onRefresh = () => {
  //   setRefreshing(true);
  //   try {
  //     moviesLoading 
  //     setRefreshing(false)
  //   } catch (error){
  //   }
  //   // finally{
  //   //   setRefreshing(false)
  //   // }
  // };
  // What will be result ? movies
  // what will be text that we will pass? inputValue

  // Kya hai ? ek params hai jisme input value daalna hai:
  // sabse pehle search input se kuchh value nikalni hai
  // then input value ko store krna hai then usko change

  // console.log('Movies :', movies);

  return (
    // <SafeAreaView
    // Sometimes you don't need this for whole screenpx-4
    // className=' flex-1  bg-primary'>
    // {/* Divide screen in three parts
    // 1. Top: logo and search
    // 2. Popular movide row wise
    // 3. Showing only 3 movie par row
    // */}
    <SafeAreaView className="  flex-1  bg-primary">
      <StatusBar barStyle={'light-content'} />
      <Image source={images.bg} className=" absolute z-0 w-full flex-1" />

      {/* This flatlist is for whole screen */}
      <RefreshControl refreshing={refreshing} />
      <FlatList
        data={[1]}
        renderItem={() => (
          <ScrollView
            className=" flex-1 px-5 "
            contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}

            >
            <Image source={icons.logo} className="mx-auto mb-5  mt-20 h-10 w-12" />

            {/* Firstliy check are we loading movies ? Yes then show loading 
If no then check errors ? Yes then show error if no then show movies
*/}
            {moviesLoading ? (
              <ActivityIndicator color={'#0000ff'} size={'large'} className="  mt-5 self-center" />
            ) : moviesError ? (
              <Text>Error: {moviesError?.message} Failed</Text>
            ) : (
              <View className=" mt-5 flex-1  ">
                <SearchBar
                  onPress={() => router.push('/search')}
                  placeholder="Search through 300+ movies online"
                  inputValue={searchQuery}
                  onChangeText={handleSearch}
                />

                <>
                  {/* Look we need it's own componnet not inside Flatlist  */}
                  <PopularMoviesCards data={popularMovies} />

                  <Text className="  mb-3 mt-5  text-xl font-bold text-white">Latest Movies</Text>
                  {/* This flatlist will render all movies and for that we need title that's above Flatlist */}
                  <FlatList
                    data={movies}
                    // horizontal
                    numColumns={2}
                    // This will style each coloumn
                    // columnWrapperStyle= {{marginBottom: 80}}

                    // why keyExtractor? For every item can uniquely identified
                    // You can create id using index
                    // WHat is index? Flatlist run the loops
                    // on data then store each data in array that index
                    // keyExtractor={(index) => index}
                    // Custom id from data and if it's not string made it
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                      return (
                        // Why in percetage cause these absolute value deosn' follow blocks scope rules
                        // if the text 1000 then it take whole screen horizontally so needed
                        // so that it takes only 50% of screen
                        <View>
                          {/* We can't write here cause the whatever write will loop and will write but we won't static thing and only place  */}

                          <View className=" w-[50%]">
                            <MovieCard
                              // Just speraded the object then get it one by one in
                              //  MovieCard component
                              {...item}
                            />
                          </View>
                        </View>
                      );
                    }}
                  />
                </>
              </View>
            )}
          </ScrollView>
        )}
      />
    </SafeAreaView>
    // </SafeAreaView>
  );
};

export default Home;
