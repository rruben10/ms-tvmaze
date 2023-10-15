import express from 'express';
import Routes from './routes/Routes';
//import config from './config/configLoader';

const app = express();

app.use(Routes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
