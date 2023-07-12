import dotenv from "dotenv";

dotenv.config();

import app from "./app";

const PORT = process.env.PORT;

app.listen(PORT, function () {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
