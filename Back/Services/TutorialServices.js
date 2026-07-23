/**
 * TutorialServices.js
 * -------------------
 * Regra de negócio dos tutoriais: criar, excluir, atualizar e listar.
 * Cada tutorial tem só dois campos hoje: Title e Description (ver
 * Models/Tutorial.js). Todas as funções aqui mexem direto no model —
 * nenhuma chama Controllers (isso já foi um bug corrigido, ver histórico).
 */
import Tutorial from "../Models/Tutorial.js";

const createTutorial = async (data) => {
  const { Title, Description } = data;

  if (!Title || !Description) {
    const error = new Error("Título e descrição são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  return Tutorial.create({
    Title: Title,
    Description: Description,
  });
};

// Antes: chamava TutorialController.deleteTutorial(tutorialId), o que
// criava uma chamada circular (Controller -> Service -> Controller -> ...).
// Agora: mexe direto no model, como as outras funções deste arquivo já fazem.
const deleteTutorial = async (tutorialId) => {
  if (!tutorialId) {
    const error = new Error("Informe o id do tutorial");
    error.statusCode = 400;
    throw error;
  }

  const tutorial = await Tutorial.findByIdAndDelete(tutorialId);

  if (!tutorial) {
    const error = new Error("Tutorial não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return tutorial;
};

// Antes: validava Title/Description mas nunca salvava nada (faltava o
// findByIdAndUpdate). Agora atualiza de verdade e devolve o tutorial atualizado.
const updateTutorial = async (tutorialId, data) => {
  const { Title, Description } = data;

  if (!Title || !Description) {
    const error = new Error("Título e descrição são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  const tutorial = await Tutorial.findByIdAndUpdate(
    tutorialId,
    { Title, Description },
    { new: true, runValidators: true }
  );

  if (!tutorial) {
    const error = new Error("Tutorial não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return tutorial;
};

const getAllTutorials = async () => {
  const tutorials = await Tutorial.find();
  return tutorials;
};

export default {
  createTutorial,
  deleteTutorial,
  updateTutorial,
  getAllTutorials,
};