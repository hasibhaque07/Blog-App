import { check, validationResult } from "express-validator";

export const loginValidator = [
    check('username')
        .isLength({ min: 1 })
        .withMessage("Username is required"),
    check("password")
        .isLength({ min: 1 })
        .withMessage("Password is required"),
];

export const loginValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if(Object.keys(mappedErrors).length === 0){
        next();
    }
    else{
        res.status(400).json({
            errors: mappedErrors,
        })
    }
}