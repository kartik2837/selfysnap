const router = require("express").Router();
const AddressController = require("../controllers/addressController");
const authMiddleware = require("../middlewares/userAuthMiddleware");

// 🔐 Protected Routes (Login Required)

router.post("/", authMiddleware, AddressController.create);

router.get("/", authMiddleware, AddressController.getAll);

router.get("/:id", authMiddleware, AddressController.getById);

router.put("/:id", authMiddleware, AddressController.update);

router.delete("/:id", authMiddleware, AddressController.delete);

module.exports = router;
