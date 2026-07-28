
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

// Esconde o cabeçalho "X-Powered-By: Express" (boa prática simples de
// segurança — não ajuda um atacante a saber exatamente sua stack).
app.disable("x-powered-by");

app.use(cors());

// Comprime as respostas (gzip) — deixa tudo mais rápido para quem tem
// internet lenta, especialmente o JSON da lista de tutoriais/usuários.
app.use(compression());

// Limite de tamanho no corpo da requisição: evita que alguém mande um
// payload gigante só para sobrecarregar o servidor.
app.use(express.json({ limit: "100kb" }));

app.get("/das", (req, res) => {
  res.json({ message: "FacilitaTech o sistema esta funcionando" });
});

app.use("/User", UserRoutes);
app.use("/auth", AuthRoutes);
app.use("/Tutorial", TutorialRoutes);
app.use("/Admin", AdminRoutes);

// Middleware de erro central — toda rota que chama next(error) cai
// aqui. Sem isso, o Express usava o tratador padrão (HTML/texto em vez
// de JSON), e o front nunca via a mensagem de erro certa.
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Erro interno do servidor",
  });
});

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