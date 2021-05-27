import app from "./app";

const port: number = 5000 || process.env.PORT;

app.listen(port, () => {
  console.info(`Server running on ${port}`);
});
