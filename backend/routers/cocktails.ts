import express from "express";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import Cocktail from "../models/Cocktail";
import {CocktailInterface} from "../types";
import { Types } from "mongoose";
import permit from "../middleware/permit";
import User from "../models/User";

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        const cocktails = await Cocktail.find({ isPublished: true }).populate('user');
        res.send(cocktails);
        return;
    }

    const user = await User.findOne({token});

    try {
        if(req.query.user) {
          const cocktails = await Cocktail.find({user: req.query.user}).populate('user');
            res.send(cocktails);
            return;
        }
        if (user && user.role === 'admin') {
          const cocktails = await Cocktail.find().populate('user');
          res.send(cocktails);
          return;
        } else {
            const cocktails = await Cocktail.find({ isPublished: true }).populate('user');
            res.send(cocktails);
            return;
        }
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.get('/:id', async (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        const cocktails = await Cocktail.findById({ _id: req.params.id, isPublished: true }).populate('user');
        res.send(cocktails);
        return;
    }

    try {
        const user = await User.findOne({token});

        if (user && user.role === 'admin') {
            const cocktails = await Cocktail.findById(req.params.id).populate('user');
            res.send(cocktails);
            return;
        } else {
            const cocktails = await Cocktail.findById({ _id: req.params.id, isPublished: true }).populate('user');
            res.send(cocktails);
        }
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.post('/:id/rating', auth, permit('user'), async (req, res, next) => {
    const reqWithUser = req as RequestWithUser;

    if (!reqWithUser.user) {
        res.status(401).send({error: 'Token not provided!'});
        return;
    }
    const { id } = req.params;

    try {
        const cocktail = await Cocktail.findById(id);

        if (!cocktail) {
            res.status(404).json({ error: "Cocktail not found" });
            return;
        }

        const userId = new Types.ObjectId(reqWithUser.user._id);

        const existingRatingIndex = cocktail.rating.findIndex((r) =>
            r.user.equals(userId)
        );

        if (existingRatingIndex !== -1) {
            cocktail.rating[existingRatingIndex].rate = req.body.rate;
        } else {
            cocktail.rating.push({ user: userId, rate: req.body.rate });
        }

        await cocktail.save();
        res.send(cocktail);

    } catch (e) {
        next(e);
    }
});

cocktailsRouter.post('/', imagesUpload.single('image'), auth,  async (req, res, next) => {
    const reqWithUser = req as RequestWithUser;

    if (!reqWithUser.user) {
        res.status(401).send({error: 'Token not provided!'});
        return;
    }

    const parsedIngredients = req.body.ingredients ? JSON.parse(req.body.ingredients) : [];

    const newCocktail: CocktailInterface = {
        user: reqWithUser.user._id,
        title: req.body.title,
        description: req.body.description,
        ingredients: parsedIngredients,
        image: req.file ? 'images/' + req.file.filename : null,
    };

    try {
        const cocktail = new Cocktail(newCocktail);
        await cocktail.save();
        res.send(cocktail);
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);

        if (!cocktail) {
            res.status(404).send({ error: 'Cocktail not found!' });
            return;
        }

        cocktail.isPublished = !cocktail.isPublished;
        await cocktail.save();

        res.send({ message: `Cocktail ${cocktail.isPublished ? 'published' : 'unpublished'} successfully`, cocktail });
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.delete('/:id', auth,  permit('admin'), async (req, res, next) => {

    const {id} = req.params;

    try {
        const cocktail = await Cocktail.findByIdAndDelete(id);

        if (!cocktail) {
            res.status(404).json({error: "Cocktail not found"});
            return;
        }

        res.send({message: "Cocktail deleted"});
    } catch (e) {
        next(e);
    }
});

export default cocktailsRouter;