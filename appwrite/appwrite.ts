import { Client, ID,  Databases, Query } from 'react-native-appwrite';

// Know what is the use of new key word
const client = new Client();
const databases = new Databases(client);

export const config = {
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,

  databaseId: process.env.EXPO_PUBLIC_APPWRITE_MOVIES_DATABASE_ID!,
  collectionId: process.env.EXPO_PUBLIC_APPWRITE_METRICS_COLLECTION_ID!,

  //  galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  // reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  // propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
};

client
.setEndpoint(config.endpoint)
.setProject(config.projectId)
.setPlatform(config.platform);

// Track the searces made by user
export const updateSearchCount = async (query:string, movie: Movie) => {
  try {
    console.log("HEllo frooom appwrite");
    
    // We need to check whether that movie text exist or not
    //  according to query we typed on filed

    // if exist ? then increase the count
    const allDocuments = await databases.listDocuments(
        config.databaseId, 
        config.collectionId,
        [ Query.equal('searchTerm', query.trim()) ]
    );
    console.log("Show me exist existed search query :",allDocuments);
    
    // IF not exist 
    // update function matters on same data as it created 
    // url , name , searchterm and other things 
 if (allDocuments.documents.length >0) {
  // Then get the first movie from all movies documents 
  const existingMovie = allDocuments.documents[0]
  
  // Then update it in that document id count + 1 
  const updateDocument = await databases.updateDocument(
    config.databaseId,
    config.collectionId,
    existingMovie.$id,
    {
      // and increase the count
      count: existingMovie.count +1,
    }
  );
  console.log("UpdateDocument :",updateDocument);
  
 }
//  If exist then 
 else{
  // create a new document
 const createDocument =  await databases.createDocument(
    config.databaseId,
    config.collectionId,
    ID.unique(),
    {
      "searchTerm":query.trim(),
      "count": 1,
      "poster_url": `https://image.tmdb.org/t/p/w500${movie.poster_path}` ,
      "title": movie.original_title,
      "movie_id": movie.id
    }
  )
  console.log("CreateDocument :",createDocument);
  
 }
} catch (error) {
    console.log("Error from updateSearchCount in appwrite.tsx :",error);
    throw new Error("Error while updating search count")
}
  

};


const fetchPopularMovies = () => {
  try {
    
  } catch (error) {
    console.log("Failed to fetch popular movies",error);
    
    
  }
}