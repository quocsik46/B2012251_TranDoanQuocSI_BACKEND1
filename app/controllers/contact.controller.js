// exports.create = (req, res) => {
//     res.send({message: "create handler"});

const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");

// };
exports.create = async (req, res, next) =>{
    if (!req.body?.name){
        return next (new ApiError(400, "Name can not be empty"));
    }
    try{
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.create(req.body);
        return res.send(documents);
    } catch (error){
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};
// exports.findAll = (req, res) => {
//     res.send({message: "findAll handler"});
// };
exports.findAll = async (req, res, next) =>{
    let documents = [];

    try{
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if(name){
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch(error){
        return next (
            new ApiError (500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};
// exports.findOne = (req, res) => {
//     res.send({message: "findOne handler"});
// };
exports.findOne = async (req, res, next) => {
    try{
        const contactService =new ContactService(MongoDB.client);
        const documents = await contactService.findById(req.params.id);
        if(!documents){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(documents);
    } catch(error){
        return next(
            new ApiError(500, 'Error retriveving contact with id=${req.params.id}')
        )
    };
};
// exports.update = (req, res) => {
//     res.send({message: "update handler"});
// };
exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length ===0){
        return next( new ApiError(400, "Data to update can not be empty"));
    }

    try{
        const contactService =new ContactService(MongoDB.client);
        const documents = await contactService.update(req.params.id, req.body);
        if(!documents){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was update succesfully"});
    } catch(error){
        return next(
            new ApiError(500, 'Error updating contact with id=${req.params.id}')
        );
    }
};
// exports.delete = (req, res) => {
//     res.send({message: "delete handler"});
// };
exports.delete = async (req, res, next) => {
    try{
        const contactService =new ContactService(MongoDB.client);
        const documents = await contactService.delete(req.params.id);
        if(!documents){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was deleted succesfully"});
    } catch(error){
        return next(
            new ApiError(
                500,
                 'Could not delete contact with id=${req.params.id}'
            )
        );
    }
};

// exports.findAllFavorite = (req, res) => {
//     res.send({message: "findAllFavorite handler"});
// };
exports.findAllFavorite = async (req, res, next) =>{
    try{
        const contactService =new ContactService(MongoDB.client);
        const documents = await contactService.findALLFavorite();
        return res.send(documents);
    } catch(error){
        return next(
            new ApiError(500, 'An error occurred while retrieving favorite contacts')
        );
    }
};
// exports.deleteAll = (req, res) => {
//     res.send({message: "deleteAll handler"});
// };
exports.deleteAll = async (_req, res, next) => {
    try{
        const contactService =new ContactService(MongoDB.client);
        const documents = await contactService.deleteAll();
        return res.send({
            message: "%d Contact were deleted succesfully", deletedCount });
            // ${deletedCount}
    } catch(error){
        return next(
            new ApiError(500, 'An error occurred while removing all contacts')
        );
    }
};

