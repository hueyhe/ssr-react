import './context';
import { app } from './app';

const port = 7766;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
