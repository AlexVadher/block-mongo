import blockchain from '../service/blockchain.js';
import Block from '../service/block.js';

let blockchainInstance = new blockchain();

async function createBlock(req, res) {
    try {
        const {data} = req.body;
        if (!data) {
            return res.status(400).send('Data is required');
        }
        const block = new Block({data});
        await blockchainInstance.addBlock(block);
        return res.status(201).send(block);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export default {createBlock};
