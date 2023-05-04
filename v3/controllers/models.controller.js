const modelsService = require("../services/models.service");
const { ObjectId } = require("mongodb");

function validateModelData(modelData) {
    let err = null;

    if (!modelData) {
        err = new Error("Не передано данных о модели");
    }
    if (!modelData.userName || typeof modelData.userName !== "string") {
        err = new Error("Не передано имя пользователя или в неверном формате (must be string)");
    }
    if (!modelData.modelName || typeof modelData.modelName !== "string") {
        err = new Error("Не передано имя модели или в неверном формате (must be string)");
    }
    if (!modelData.code || typeof modelData.code !== "object") {
        err = new Error("Не передан JSON модели или в неверном формате (must be object)");
    }
    if (modelData.description && typeof modelData.description !== "string") {
        err = new Error("описание должно быть в формате строки");
    }
    if (modelData.comments && typeof modelData.comments !== "object") {
        err = new Error("Комментарии должны быть в формате массива");
    }

    return err;
}

async function getAllModels(req, res, next) {
    try {
        const models = await modelsService.getAllModels();
        res.send(models);
    }
    catch (err) {
        next(err);
    }
}

async function getModelById(req, res, next) {
    const modelId = req.params.id;

    if (!ObjectId.isValid(modelId)) {
        const err = new Error("Не валидный ID модели");
        next(err);
    }

    try {
        const model = await modelsService.getModelByID();
        res.send(model);
    }
    catch (err) {
        next(err)
    }
}

async function addNewModel(req, res, next) {
    const modelData = req.body;

    const error = validateModelData(modelData);
    if (error !== null) {
        res.statusCode = 400;
        next(error);
    }

    const insertModelData = {...modelData};
    insertModelData.description = insertModelData.description ?? "";
    insertModelData.comments = insertModelData.comments ?? [];

    const date = new Date();
    insertModelData.created = date;
    insertModelData.modified = date;

    try {
        const insertRes = await modelsService.addNewModel(insertModelData);

        if (insertRes.insertedId) {
            res.send(insertRes.insertedId);
        }
        else {
            const err = new Error("Ошибка при добавлении модели");
            res.statusCode = 500;
            next(err);
        }
    }
    catch (err) {
        next(err);
    }
}

async function updateModel(req, res, next) {
    if (!req.body.modelData) {
        res.statusCode = 400;
        const err = new Error("не передан modelData");
        next(err);
    }

    const modelData = req.body.modelData;
    const modelId = req.body.modelId;

    if (!modelId || !ObjectId.isValid(modelId)) {
        res.statusCode = 400;
        const err = new Error("Не валидный ID модели");
        next(err);
    }

    const error = validateModelData(modelData);
    if (error !== null) {
        next(error);
    }

    const insertModelData = {...modelData};

    insertModelData.modified = new Date();

    try {
        const result = await modelsService.updateModel(modelId, insertModelData);

        if (result.modifiedCount === 1) {
            res.send(result);
        }
        else {
            const err = new Error("Изменено больше одного элемента");
            next(err);
        }
    }
    catch (err) {
        next(err);
    }
}

async function deleteModelById(req, res, next) {
    const modelId = req.params.id;

    if (!ObjectId.isValid(modelId)) {
        const err = new Error("Не валидный ID модели");
        res.statusCode = 400;
        next(err);
    }

    try {
        const result = await modelsService.deleteModel(modelId);

        let error = null;
        if (result.deletedCount > 1) {
            error = new Error("Удалено больше одного элемента");
        }
        else if (result.deletedCount === 0) {
            error = new Error("Элемент не удалён");
        }
        if (error !== null) {
            next(error);
        }

        res.send(result);
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    getAllModels,
    getModelById,
    addNewModel,
    updateModel,
    deleteModelById,
}