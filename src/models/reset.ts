import { Schema, Document, Model, model } from "mongoose";
import { randomBytes, createHmac, timingSafeEqual, BinaryLike } from "crypto";

const PASSWORD_RESET_TIMEOUT = 1000 * 60 * 60;
const PASSWORD_RESET_BYTES = 40;

interface PasswordResetDocument extends Document {
  userId: string;
  token: string;
  expiredAt: Date;
  url: (plaintextToken: string) => string;
  isValid: (plaintextToken: string) => boolean;
}

interface PasswordResetModel extends Model<PasswordResetDocument> {
  plaintextToken: () => string;
  hashedToken: (plaintextToken: string) => string;
}

const passwordResetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    token: String,
    expiredAt: Date,
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

passwordResetSchema.pre<PasswordResetDocument>("save", function () {
  if (this.isModified("token")) {
    this.token = PasswordReset.hashedToken(this.token);
  }

  if (!this.expiredAt) {
    this.expiredAt = new Date(new Date().getTime() + PASSWORD_RESET_TIMEOUT);
  }
});

passwordResetSchema.methods.url = function (plaintextToken: string) {
  return `${process.env.APP_ORIGIN}/password/reset?id=${this.id}&token=${plaintextToken}`;
};

passwordResetSchema.methods.isValid = function (plaintextToken: string) {
  const hash = PasswordReset.hashedToken(plaintextToken);
  return (
    // @ts-ignore
    timingSafeEqual(Buffer.from(hash), Buffer.from(this.token)) &&
    // @ts-ignore
    this.expiredAt > new Date()
  );
};

passwordResetSchema.statics.plaintextToken = () => {
  return randomBytes(PASSWORD_RESET_BYTES).toString("hex");
};

passwordResetSchema.statics.hashedToken = (plaintextToken: string) => {
  return createHmac("sha256", process.env.APP_SECRET as BinaryLike)
    .update(plaintextToken)
    .digest("hex");
};

export const PasswordReset = model<PasswordResetDocument, PasswordResetModel>(
  "PasswordReset",
  passwordResetSchema
);
