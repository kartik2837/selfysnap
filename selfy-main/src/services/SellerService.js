// const Seller = require("../models/Seller");
// const Address = require("../models/Address");
// const jwtProvider = require("../utils/jwtProvider");
// const bcrypt = require("bcrypt");
// const UserRoles = require("../domain/UserRole");
// const SellerError = require("../exceptions/SellerError");

// class SellerService {

//   async getSellerProfile(jwt) {
//     const email = jwtProvider.getEmailFromJwt(jwt);
//     return this.getSellerByEmail(email);
//   }

//   async createSeller(sellerData) {
//     const existingSeller = await Seller.findOne({ email: sellerData.email });
//     if (existingSeller) {
//       throw new SellerError("Seller already exists, use a different email");
//     }

//     let savedAddress;

//     // Always create new address for seller
//     savedAddress = await Address.create(sellerData.pickupAddress);

//     const newSeller = new Seller({
//       email: sellerData.email,
//       pickupAddress: savedAddress._id, // store only ObjectId
//       sellerName: sellerData.sellerName,
//       GSTIN: sellerData.GSTIN,
//       role: UserRoles.SELLER,
//       mobile: sellerData.mobile,
//       password: await bcrypt.hash(sellerData.password, 10),
//       bankDetails: sellerData.bankDetails,
//       businessDetails: sellerData.businessDetails,
//     });

//     return await newSeller.save();
//   }

//   async getSellerById(id) {
//     const seller = await Seller.findById(id).populate("pickupAddress");
//     if (!seller) {
//       throw new SellerError("Seller not found");
//     }
//     return seller;
//   }

//   async getSellerByEmail(email) {
//     const seller = await Seller.findOne({ email }).populate("pickupAddress");
//     if (!seller) {
//       throw new SellerError("Seller not found");
//     }
//     return seller;
//   }

//   async getAllSellers(status) {
//     return await Seller.find({ accountStatus: status }).populate("pickupAddress");
//   }

//   // ✅ FIXED UPDATE METHOD
//   async updateSeller(existingSeller, sellerData) {

//     // 1️⃣ If pickupAddress object is sent → update or create Address separately
//     if (sellerData.pickupAddress && typeof sellerData.pickupAddress === "object" && !sellerData.pickupAddress._id) {

//       if (existingSeller.pickupAddress) {
//         // Update existing address
//         await Address.findByIdAndUpdate(
//           existingSeller.pickupAddress._id || existingSeller.pickupAddress,
//           sellerData.pickupAddress,
//           {
//             new: true,
//             runValidators: true,
//           }
//         );
//         // Remove it from sellerData so we don't try to overwrite the ref with the object
//         delete sellerData.pickupAddress;
//       } else {
//         // Create new address if missing
//         const newAddress = await Address.create(sellerData.pickupAddress);
//         // Link the new address ID back to sellerData
//         sellerData.pickupAddress = newAddress._id;
//       }
//     }

//     // 2️⃣ Update remaining seller fields
//     const updatedSeller = await Seller.findByIdAndUpdate(
//       existingSeller._id,
//       sellerData,
//       {
//         new: true,
//         runValidators: true,
//       }
//     ).populate("pickupAddress");

//     return updatedSeller;
//   }

//   async deleteSeller(id) {
//     const seller = await Seller.findById(id);
//     if (!seller) {
//       throw new SellerError("Seller not found with id " + id);
//     }

//     // Optional: delete linked address also
//     if (seller.pickupAddress) {
//       await Address.findByIdAndDelete(seller.pickupAddress);
//     }

//     await Seller.deleteOne({ _id: id });
//   }

//   async verifyEmail(email, otp) {
//     const seller = await this.getSellerByEmail(email);
//     seller.isEmailVerified = true;
//     return await seller.save();
//   }

//   async updateSellerAccountStatus(sellerId, status) {
//     const seller = await this.getSellerById(sellerId);
//     seller.accountStatus = status;
//     return await seller.save();
//   }

//   async registerWithDelhivery(sellerId) {
//     const DelhiveryService = require('./DelhiveryService');

//     if (!process.env.DELHIVERY_API_TOKEN) {
//       throw new Error("Delhivery API Token is missing in .env file. Please add it to register sellers.");
//     }

//     const seller = await Seller.findById(sellerId).populate("pickupAddress");
//     if (!seller) throw new SellerError("Seller not found");

//     if (!seller.pickupAddress) {
//       throw new Error("Seller pickup address is missing. Please update pickup address before registering with Delhivery.");
//     }

//     if (seller.delhiveryWarehouseCode) {
//       return seller;
//     }

//     // Register warehouse in Delhivery
//     const sellerData = {
//       warehouseName: seller.businessDetails?.businessName || seller.sellerName,
//       businessName: seller.businessDetails?.businessName || seller.sellerName,
//       address: seller.pickupAddress.address,
//       pincode: seller.pickupAddress.pinCode,
//       mobile: seller.pickupAddress.mobile,
//       city: seller.pickupAddress.city,
//       state: seller.pickupAddress.state
//     };

//     const warehouseData = await DelhiveryService.createWarehouse(sellerData);

//     // Delhivery B2C (One) API success check
//     if (warehouseData.success === false || warehouseData.status === "error") {
//       const errorMsg = warehouseData.error?.join(', ') || warehouseData.rmk || "Warehouse registration failed";
//       throw new Error(errorMsg);
//     }

//     const warehouseCode = warehouseData.data?.name || warehouseData.name || warehouseData.warehouse_name;

//     if (!warehouseCode) {
//       throw new Error("Failed to get warehouse code from Delhivery response");
//     }

//     seller.delhiveryWarehouseCode = warehouseCode;
//     return await seller.save();
//   }
// }

// module.exports = new SellerService();



















const Seller = require("../models/Seller");
const Address = require("../models/Address");
const jwtProvider = require("../utils/jwtProvider");
const bcrypt = require("bcrypt");
const UserRoles = require("../domain/UserRole");
const SellerError = require("../exceptions/SellerError");

class SellerService {
  async getSellerProfile(jwt) {
    const email = jwtProvider.getEmailFromJwt(jwt);
    return this.getSellerByEmail(email);
  }

  /* ═══════════════════════════════════════════════
     🔥 CREATE SELLER (with documents)
     ═══════════════════════════════════════════════ */
  async createSeller(sellerData) {
    /* Duplicate check */
    const existingSeller = await Seller.findOne({ email: sellerData.email });
    if (existingSeller) {
      throw new SellerError("Seller already exists, use a different email");
    }

    /* Duplicate mobile check */
    const existingMobile = await Seller.findOne({ mobile: sellerData.mobile });
    if (existingMobile) {
      throw new SellerError("Mobile number already registered");
    }

    /* Create pickup address */
    let savedAddress;
    try {
      savedAddress = await Address.create(sellerData.pickupAddress);
    } catch (err) {
      throw new SellerError(`Address creation failed: ${err.message}`);
    }

    /* Create seller */
    const newSeller = new Seller({
      email: sellerData.email,
      pickupAddress: savedAddress._id,
      sellerName: sellerData.sellerName,
      GSTIN: sellerData.GSTIN,
      role: UserRoles.SELLER,
      mobile: sellerData.mobile,
      password: await bcrypt.hash(sellerData.password, 10),
      bankDetails: sellerData.bankDetails,
      businessDetails: sellerData.businessDetails,

      /* 🔥 Document support */
      documents: {
        gstCertificate: sellerData.documents?.gstCertificate || null,
        panCard: sellerData.documents?.panCard || null,
        bankProof: sellerData.documents?.bankProof || null,
        bankProofType:
          sellerData.documents?.bankProofType || "cancelled_cheque",
      },
    });

    return await newSeller.save();
  }

  async getSellerById(id) {
    const seller = await Seller.findById(id).populate("pickupAddress");
    if (!seller) {
      throw new SellerError("Seller not found");
    }
    return seller;
  }

  async getSellerByEmail(email) {
    const seller = await Seller.findOne({ email }).populate("pickupAddress");
    if (!seller) {
      throw new SellerError("Seller not found");
    }
    return seller;
  }

  async getAllSellers(status) {
    return await Seller.find({ accountStatus: status }).populate(
      "pickupAddress"
    );
  }

  /* ✅ FIXED UPDATE METHOD */
  async updateSeller(existingSeller, sellerData) {
    /* 1️⃣ If pickupAddress object is sent → update or create Address separately */
    if (
      sellerData.pickupAddress &&
      typeof sellerData.pickupAddress === "object" &&
      !sellerData.pickupAddress._id
    ) {
      if (existingSeller.pickupAddress) {
        await Address.findByIdAndUpdate(
          existingSeller.pickupAddress._id || existingSeller.pickupAddress,
          sellerData.pickupAddress,
          { new: true, runValidators: true }
        );
        delete sellerData.pickupAddress;
      } else {
        const newAddress = await Address.create(sellerData.pickupAddress);
        sellerData.pickupAddress = newAddress._id;
      }
    }

    /* 2️⃣ Update remaining seller fields */
    const updatedSeller = await Seller.findByIdAndUpdate(
      existingSeller._id,
      sellerData,
      { new: true, runValidators: true }
    ).populate("pickupAddress");

    return updatedSeller;
  }

  async deleteSeller(id) {
    const seller = await Seller.findById(id);
    if (!seller) {
      throw new SellerError("Seller not found with id " + id);
    }

    if (seller.pickupAddress) {
      await Address.findByIdAndDelete(seller.pickupAddress);
    }

    await Seller.deleteOne({ _id: id });
  }

  async verifyEmail(email, otp) {
    const seller = await this.getSellerByEmail(email);
    seller.isEmailVerified = true;
    return await seller.save();
  }

  async updateSellerAccountStatus(sellerId, status) {
    const seller = await this.getSellerById(sellerId);
    seller.accountStatus = status;
    return await seller.save();
  }

  async registerWithDelhivery(sellerId) {
    const DelhiveryService = require("./DelhiveryService");

    if (!process.env.DELHIVERY_API_TOKEN) {
      throw new Error(
        "Delhivery API Token is missing in .env file. Please add it to register sellers."
      );
    }

    const seller = await Seller.findById(sellerId).populate("pickupAddress");
    if (!seller) throw new SellerError("Seller not found");

    if (!seller.pickupAddress) {
      throw new Error(
        "Seller pickup address is missing. Please update pickup address before registering with Delhivery."
      );
    }

    if (seller.delhiveryWarehouseCode) {
      return seller;
    }

    const sellerData = {
      warehouseName:
        seller.businessDetails?.businessName || seller.sellerName,
      businessName:
        seller.businessDetails?.businessName || seller.sellerName,
      address: seller.pickupAddress.address,
      pincode: seller.pickupAddress.pinCode,
      mobile: seller.pickupAddress.mobile,
      city: seller.pickupAddress.city,
      state: seller.pickupAddress.state,
    };

    const warehouseData = await DelhiveryService.createWarehouse(sellerData);

    if (warehouseData.success === false || warehouseData.status === "error") {
      const errorMsg =
        warehouseData.error?.join(", ") ||
        warehouseData.rmk ||
        "Warehouse registration failed";
      throw new Error(errorMsg);
    }

    const warehouseCode =
      warehouseData.data?.name ||
      warehouseData.name ||
      warehouseData.warehouse_name;

    if (!warehouseCode) {
      throw new Error("Failed to get warehouse code from Delhivery response");
    }

    seller.delhiveryWarehouseCode = warehouseCode;
    return await seller.save();
  }
}

module.exports = new SellerService();