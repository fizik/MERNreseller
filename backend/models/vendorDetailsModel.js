import mongoose from "mongoose";

const vendorSchema = mongoose.Schema(
  {
    vendorId: {
      type: String,
      required: true,
    },
    shopName: {
      type: String,
    },
    warehouseAddress: {
      country: {
        type: String,
        reguired: true,
      },
      city: {
        type: String,
        reguired: true,
      },
      address: {
        type: String,
        reguired: true,
      },
      postalCode: {
        type: String,
        reguired: true,
      },
    },
    returnAddress: {
      country: {
        type: String,
        reguired: true,
      },
      city: {
        type: String,
        reguired: true,
      },
      address: {
        type: String,
        reguired: true,
      },
      postalCode: {
        type: String,
        reguired: true,
      },
    },
  },
  {
    timestamp: true,
  }
);

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
