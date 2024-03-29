import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    vendorId: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },

        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        updatedById: { type: String },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    paymentMethod: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    delivery: {
      deliveredItems: [
        {
          name: {
            type: String,
            qty: Number,
          },
        },
      ],
      isDelivered: {
        type: String,
        required: true,
        default: "No",
      },
      deliveredAt: {
        type: Date,
      },
      deliveryId: {
        type: String,
      },
    },

    createdAt: {
      type: Date,
    },
  },
  {
    timestamp: true,
  }
);

orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const randomId = nanoid(8).toUpperCase();
    this.delivery.deliveryId = randomId;
  }
});

const VendorOrder = mongoose.model("VendorOrder", orderSchema);

export default VendorOrder;
