const BancoDeDados = async (req, res, next) => {
  try {
    const user = await authService.BancoDeDados(req.body);

    res.status(201).json({
      message: "Cria um novo passo a passo no banco de dados",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const GuiaEspecifico = async (req, res, next) => {
  try {
    const user = await authService.GuiaEspecifico(req.body);

    res.status(201).json({
      message: "Altera as informações de um guia específico",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const DeleteGuia = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Deleta um guia do sistema." });
  } catch (error) {
    next(error);
  }
}

export default {
  BancoDeDados,
  GuiaEspecifico,
  DeleteGuia
}