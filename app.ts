import express from 'express';
import Routes from './routes/Routes';
import  {connectToDatabase} from './database/db';
//import config from './config/configLoader';

const app = express();

connectToDatabase();

app.use(express.json());
app.use(Routes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
