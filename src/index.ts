import app from './app';
import 'dotenv/config';
import newDateMethods from '@utils/newDateMethods';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(
  `Listening you I'm on port ${PORT}, my young padawan!`,
));

console.log(newDateMethods.changeFormat('20-02-03', ''));
