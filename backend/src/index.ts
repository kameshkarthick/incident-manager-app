import app from './app';
import { sequelize } from './config/db';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(' Failed to connect to DB:', err);
    process.exit(1);
  }
}

startServer();