const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mediaRoutes = require("./video-api/routes/mediaRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Use the media routes
app.use("/api/media", mediaRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
