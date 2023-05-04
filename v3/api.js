const express = require("express");
const commentsController = require("./controllers/comments.controller");
const apiKeysController = require("./controllers/api-key.controller");
const modelsController = require("./controllers/models.controller");
const authController = require("./controllers/authorization.controller");
const errorController = require("./controllers/errros.controller");

const router = express.Router();

// Api Keys
router.post("/login", apiKeysController.getApiKey);
router.delete("/logout", apiKeysController.deleteApiKey);

// Comments
router.get("/comments", commentsController.getComments);
router.get("/comments/:id", commentsController.getComment);
router.post("/comments", commentsController.postComments);

// Models
router.get("/models", modelsController.getAllModels);
router.get("/models/:id", modelsController.getModelById);

router.post("/models", authController.checkApiKey, modelsController.addNewModel);
router.put("/models/:id", authController.checkApiKey, modelsController.updateModel);
router.delete("/models/:id", authController.checkApiKey, modelsController.deleteModelById);

router.use(errorController.errorLogger);
router.use( (req, res) => {
    res.status(400).send();
})

module.exports = router;