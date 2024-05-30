const express = require('express');
const cors=require('cors')
const bodyParser = require('body-parser');
const { MongoClient , ObjectId} = require('mongodb');

const app = express();
const port = 3000;

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to the database");
    } catch (error) {
        console.error(error);
    }
}

connectToDatabase();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




  
app.post('/', async (req, res) => {
    try {
        const database = client.db("test2");
        const collection = database.collection("documents2");
        
        const doc = req.body;

        const result = await collection.insertOne(doc);

        // Retrieve the inserted document
        const insertedDoc = await collection.findOne({ _id: result.insertedId });

        // Send back the inserted document as the response
        res.status(200).json([insertedDoc]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error inserting document');
    }
});





// Route to get all documents
app.get('/', async (req, res) => {
    try {
        const database = client.db("test2");
        const collection = database.collection("documents2");

        const documents = await collection.find({}).toArray();
        res.status(200).json(documents);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving documents');
    }
});






app.delete('/documents/:id', async (req, res) => {
    try {

        const database = client.db("test2");
        const collection = database.collection("documents2");

        const documentId = req.params.id;
        const result = await collection.deleteOne({ _id: new ObjectId(documentId) });

        if (result.deletedCount === 1) {
            res.status(200).send('Document successfully deleted');
        } else {
            res.status(404).send('Document not found');
        }
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).send('Error deleting document');
    }
});





app.put('/documents/:id', async (req, res) => {
    try {
        const database = client.db("test2");
        const collection = database.collection("documents2");

        const documentId = req.params.id;
        const updateData = req.body;

        console.log(updateData)

        const result = await collection.updateOne(
            { _id: new ObjectId(documentId) },
            { $set: updateData }
        );

        if (result.matchedCount === 1) {
            res.status(200).send('Document successfully updated');
        } else {
            res.status(404).send('Document not found');
        }
    } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).send('Error updating document');
    }
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});