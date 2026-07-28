import express from "express";
import dotenv from "dotenv";
import compression from "compression";
import connectDB from "./config/db.js";
import cors from "cors";
import UserRoutes from "./Routes/UserRoutes.js";
import AuthRoutes from "./Routes/AuthRoutes.js";
import TutorialRoutes from "./Routes/TutorialRoutes.js";
import AdminRoutes from "./Routes/AdminRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Segurança: esconde a header "x-powered-by: Express"
app.disable("x-powered-by");

// Middlewares globais
app.use(cors());
app.use(compression());
app.use(express.json({ limit: "100kb" }));

// Rota de teste
app.get("/das", (req, res) => {
  res.json({ message: "FacilitaTech o sistema esta funcionando" });
});

// Rotas da aplicação
app.use("/User", UserRoutes);
app.use("/auth", AuthRoutes);
app.use("/Tutorial", TutorialRoutes);
app.use("/Admin", AdminRoutes);

// Middleware global de tratamento de erros (deve ter 4 parâmetros)
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Erro interno do servidor",
  });
});

// Inicialização do banco de dados e do servidor
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);