require('dotenv').load({ silent: true });

const app = require('../app');
const port = process.env.PORT || '3000';

app.set('port', port);

app.listen(port, () => {
  console.log(`Server is running and listening on http://localhost:${port}`);
});
