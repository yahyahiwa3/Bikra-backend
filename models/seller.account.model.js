import mongoose from "mongoose";
import bcrypt from "bcrypt";
const sellerSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  role: { type: String, default: "seller" },
  // image: {
  //   type: String,
  //   default: `https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png`,
  // },
  // logo: {
  //   type: String,
  //   default: `data:image/jpeg;base64,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yKi4HBwRn5TdIa/mh3FKdBMCcNPmdiAjZO+k5IOnuATRCTizoiMMjRFMy8SwzxIGM4g5gCeAmWJg7lbzJhwZwBxEztTTed/dbyMGy7oxWLU2HFODCLXIJmImrEAis2J1GJ6/CbzGbWgk4yV2mkfUVG5AE4HnJB2agIK/JozKmUqggyG4wwAwRh3W2ZMlGYxZnHG0SnWGj4J8YgAYhLQImicAi9FYBCYwhFyid2S9nm4sFALBviYHdEaAAshom+NAjURCwPPJxJ3KBLObC4ILTAYBHgUpDbBBmyRI3IHMIzJK3qpb7QiIYKCDfEjuDHTGJH4WyVKAKClQ4jojCDiCNPVGGYTAM94hKnct3osbKMtZork92HnqQ4WAOgAkwJOygnkbYAeQHtbFGDCE81rssSF2UY3adlaMF4xt1CJEI6+UCDbDJxyVortEIud03eiwLY1iJwNLxCIyO25RNCEAAIAC5BeIJIE3Lu9oyBSRomhpZg2wdnC13AMGdBsxMhmd1qbCDUJr4Mys7l+6GWxXlqwFPO3Nguvuo9YJPK9E/wDPx//aAAwDAQACAAMAAAAQ888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888880O+uw888888888888888888888888888888888888888888888888888888888888888888888wemua2Q88888888888888888888888888888888888888888888888888888888888888888884W08884q0888888888888888888888888888888888888888888888888888888888888888888su88888eU888888888888888888888888888888888888888888888888888888888888888888o+88888+U8888888888888888888888888888888888888888888888888888888888888888EvI+8fONOWc5U88888888888888888888888888888888888888888888888888888888888884+/X/8Xt+40uiCoY88888888888888888888888888888888888888888888888888888888888QfuGHd/+0xDXnUS778888888888888888888888888888888888888888888888888888888888AD+EqTq+d/YnbUC2l8888888888888888888888888888888888888888888888888888888888QD9v9Dd25quIg8R2Z8888888888888888888888888888888888888888888888888888888888DpVq+I3/8AfuyYFMDg/PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPFxQvl6V6vnLjNdw+PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPDXklFvz7Q7PvflA5HwwfPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPIs/ASadevBPUtXOuPwlCfPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP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`,
  // },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: {
    name: { type: String },
    long: { type: String },
    lati: { type: String },
  },
  status: { type: String, default: "normal" },
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});
sellerSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
sellerSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;
