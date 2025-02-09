import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema({
    hash: {type: String, required: true},
    height: {type: Number, required: true},
    body: {type: String, required: true},
    time: {type: String, required: true},
    previousBlockHash: {type: String, default: null},
});

const Block = mongoose.model('Blocks', blockSchema);

export default Block;
