import express from "express";

const APP = express();
const PORT = process.env.PORT || 3000;

APP.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
