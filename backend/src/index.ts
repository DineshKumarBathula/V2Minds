import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Import CORS
import noteRoutes from "./routes/noteRoutes";

const app = express();
const port = 3001;

app.use(cors()); // Use CORS
app.use(bodyParser.json());
app.use("/api", noteRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
