const mongoose = require('mongoose');
const User = require('./models/user')

async function updateCollection() {
    try {
        const mongoDbUrl = process.env.MONGODB_URL || 'mongodb://0.0.0.0/acebook';
    
        await mongoose.connect(mongoDbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    
        // Update all documents to include the new field
        const updateResult = await User.updateMany({}, { $set: { newField: 'some value' } });
        console.log(`${updateResult.nModified} documents updated`);
    
        } catch (error) {
        console.error('Error:', error);
        } finally {
        mongoose.disconnect();
        }
    }
    
updateCollection();
