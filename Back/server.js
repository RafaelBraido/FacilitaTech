
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import UserRoutes from "./Routes/UserRoutes.js";
import AuthRoutes from "./Routes/AuthRoutes.js";
// import AdminRoutes from "./Routes/AdminRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());

app.get("/das", (req, res) => {
  res.json({ message: "FacilitaTech o sistema esta funcionando" });
});


app.use("/User", UserRoutes);
app.use("/auth", AuthRoutes)
// app.use("/admin", AdminRoutes)

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.log("Erro ao iniciar o servidor:", error.message);
  }
};

startServer();