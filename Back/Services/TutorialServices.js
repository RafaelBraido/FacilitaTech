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