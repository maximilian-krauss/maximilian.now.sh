// npm
const { MongoClient } = require('mongodb');

// mine
const { mongodbUri } = require('./config').load();
const mongodbCollection = 'service-tracking';
const defaultServiceEntity = { outgoing: 0, incoming: 0 };

const incrementField = async (service, field) => {
  const db = await MongoClient.connect(mongodbUri);
  const collection = db.collection(mongodbCollection);
  const storedDocument = await collection.findOne({ service });

  const entity = {
    service,
    ...defaultServiceEntity,
    ...storedDocument
  };

  if (!entity.hasOwnProperty(field)) {
    throw new Error(`Field ${field} does not exist!`);
  }

  entity[field]++;

  await collection.replaceOne({ service }, entity, { upsert: true });
  await db.close();
};

module.exports.incrementIncoming = async service => await incrementField(service, 'incoming');
module.exports.incrementOutgoing = async service => await incrementField(service, 'outgoing');
module.exports.getData = async () => {
  const db = await MongoClient.connect(mongodbUri);
  const collection = db.collection(mongodbCollection);
  const documents = await collection.find().toArray();

  await db.close();

  return documents.map(item => {
    return {
      serivce: item.service,
      incoming: item.incoming,
      outgoing: item.outgoing
    };
  });
};
