const insert = async (database, collection, data) => {
  
  try {
    const currentCollection = database.collection(collection);
    await currentCollection.insertOne(data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
  
};

const getOne = async (database, collection, query) => {
    
    try {
      const currentCollection = database.collection(collection);
      const result = await currentCollection.findOne(query);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
    
};

const updateOne = async (database, collection, query, data) => {
  try {
    const updateDoc = {
      $set: { ...data },
    };
    const options = { upsert: false };
    const currentCollection = database.collection(collection);
    const result = await currentCollection.updateOne(query, updateDoc, options);
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = { insert, getOne, updateOne };