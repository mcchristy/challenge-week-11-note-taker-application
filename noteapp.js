const express = require('express');
const frontRoutes = require('./Routes/frontRoutes');
const noteapiRoutes = require('./Routes/noteapiRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("Develop/public"));

app.use("/api",frontRoutes);

app.use('/', noteapiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost: + PORT`);
});

