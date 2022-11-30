const express = require('express');

const { validation, auth, upload, ctrlWrapper } = require("../../middlewares");
const { joiSchema, vreifyEmailSchema } = require("../../model/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/verify", validation(vreifyEmailSchema), ctrlWrapper(ctrl.resendVerifyEmail));

module.exports = router;