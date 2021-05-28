import app from "./app";

const port: number = 5000 || process.env.PORT;

const server = app.listen(port, () => {
  console.info(`Server running on ${port}`);
});

process.on("unhandledRejection", (err: Error, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
