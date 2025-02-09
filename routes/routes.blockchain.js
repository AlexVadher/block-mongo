import exoress from 'express';
import blockchain from '../controllers/blockchain.controller.js';
import router from 'express';

const routes = router();

routes.post('/create-block', blockchain.createBlock);

export default routes;
