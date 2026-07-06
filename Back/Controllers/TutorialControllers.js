import TutorialService from "../Services/TutorialServices.js";

const createTutorial = async (req, res, next) => {
  try {
    const tutorial = await TutorialService.createTutorial(req.body);

    res.status(201).json({
      message: "Tutorial criado com sucesso",
      data: tutorial,
    });
  } catch (error) {
    next(error);
  }
};
const deleteTutorial = async (req, res, next) => {
  try {
    const tutorialId = req.params.id;
    await TutorialService.deleteTutorial(tutorialId);

    res.status(200).json({
      message: "Tutorial deletado com sucesso",
    });
  } catch (error) {
  }
};

const updateTutorial = async (req, res, next) => {
  try {
    const tutorialId = req.params.id;
    const updatedTutorial = await TutorialService.updateTutorial(tutorialId, req.body);

    res.status(200).json({
      message: "Tutorial atualizado com sucesso",
      data: updatedTutorial,
    });
  } catch (error) { 
  }
};

const getAllTutorials = async (req, res, next) => {
  try {
    const tutorials = await TutorialService.getAllTutorials();
    res.status(200).json(tutorials);
  } catch (error) {
    next(error);
  }
};
    

export default {
  createTutorial,
  deleteTutorial, 
  updateTutorial,
  getAllTutorials
};
