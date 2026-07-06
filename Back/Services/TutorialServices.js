import TutorialController from "../Controllers/TutorialControllers.js";
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
  const tutorial = await TutorialController.deleteTutorial(tutorialId);
  return tutorial;
}

const updateTutorial = async (tutorialId, data) => {
  const { Title, Description } = data;

  if (!Title || !Description) {
    const error = new Error("Título e descrição são obrigatórios");
    error.statusCode = 400;
    throw error;
  }
}

const getAllTutorials = async () => {
  const tutorials = await Tutorial.find();
  return tutorials;
};

export default {
  createTutorial,
  deleteTutorial,
  updateTutorial,
  getAllTutorials
};
