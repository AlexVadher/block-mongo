import Block from './block.js';
import SHA256 from 'crypto-js/sha256.js';
import BlockModel from '../model/block.model.js';

class Blockchain {
    constructor() {
        this.chain = [];
        this.height = -1;
        this.initializeChain();
    }

    async initializeChain() {
        const blocks = await BlockModel.find().sort({height: 1});
        if (blocks.length > 0) {
            this.chain = blocks;
            this.height = blocks.length - 1;
        } else {
            const block = new Block({data: 'Genesis Block'});
            await this.addBlock(block);
        }
    }

    addBlock(block) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            block.height = self.chain.length;
            block.time = new Date().getTime().toString();
            if (self.chain.length > 0) {
                block.previousBlockHash =
                    self.chain[self.chain.length - 1].hash;
            }
            let errors = await self.validateChain();
            if (errors.length > 0) {
                reject(new Error('The chain is not valid: ', errors));
            }
            block.hash = SHA256(JSON.stringify(block)).toString();
            self.chain.push(block);
            resolve(block);
            this.save(block);
        });
    }

    validateChain() {
        let self = this;
        const errors = [];
        return new Promise(async (resolve, reject) => {
            self.chain.map(async (block) => {
                try {
                    let isValid = await block.validate();
                    if (!isValid) {
                        errors.push(
                            new Error(`The block ${block.height} is not valid`),
                        );
                    }
                } catch (err) {
                    errors.push(err);
                }
            });
            resolve(errors);
        });
    }

    async save(block) {
        const blockData = new BlockModel(block);
        await blockData.save();
    }

    print() {
        let self = this;
        for (let block of self.chain) {
            console.log(block.toString());
        }
    }
}

export default Blockchain;
