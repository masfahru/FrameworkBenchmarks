const { MongoClient } = require('mongodb');

let db = null;
const projection = { _id:0 };

const getConnection = () => {
	if (!db) {
		const uri = `mongodb://tfb-database:27017`;

		const client = new MongoClient(uri);

		db = client.db('hello_world');
	}
	return db;
}

exports.fortunes = () => {
	return getConnection().collection('fortune').find({}, { projection }).toArray();
};

exports.find = id => {
	return getConnection().collection('world').findOne({ id }, { projection });
}

exports.update = obj => {
	return getConnection().collection('world').replaceOne({ id:obj.id }, obj);
}
