import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { compare, hash } from 'bcrypt';

export type UserDocument = User & Document & {
  correctPassword: (candidatePassword: string, userPassword: string) => Promise<boolean>;
  isPasswordChanged: (JWTTimeStamp: number) => boolean;
};

export enum Rote {
  USER = 'user',
  ADMIN = 'admin'
}

@Schema()
export class User {
  @Prop({
    type: String,
    required: [true, '0xE000000'],
    validate: {
      validator: value => /^([\u0600-\u06FF]{2,}\s+)+$/.test(value),
      message: '0xE000001'
    }
  })
  firstname: string;

  @Prop({
    type: String,
    required: [true, '0xE000002'],
    validate: {
      validator: value => /^([\u0600-\u06FF]{2,}\s+)+$/.test(value),
      message: '0xE000003'
    }
  })
  lastname: string;

  @Prop({
    type: String,
    validate: {
      validator: value => /^\+989[0-9]{9}$/.test(value),
      message: '0xE000004'
    }
  })
  phoneNumber?: string;

  @Prop({
    type: Boolean,
    default: true
  })
  isPhoneNumberValidated: boolean;

  @Prop({
    type: String,
    validate: {
      validator: value => /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(value),
      message: '0xE000005'
    },
    required: [true, '0xE000006'],
    unique: [true, '0xE000007']
  })
  email: string;

  @Prop({
    type: Boolean,
    default: false
  })
  isEmailVerified: boolean;

  @Prop({
    type: String,
    required: [true, '0xE000008'],
    validate: {
      validator: value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/.test(value),
      message: '0xE000009'
    },
    select: false
  })
  password: string;

  @Prop({
    type: String,
    enum: {
      values: [Rote.USER, Rote.ADMIN],
      message: '0xE00000A'
    },
    default: Rote.USER
  })
  rote: Rote;

  @Prop({
    type: Date,
    select: false
  })
  passwordChangedAt?: Date;

  @Prop({
    type: String,
    select: false
  })
  passwordResetToken?: string;

  @Prop({
    type: String,
    select: false
  })
  passwordResetTokenExpires?: Date;

  @Prop({
    type: String,
    select: false
  })
  verifyEmailToken?: string;

  @Prop({
    type: Date,
    select: false
  })
  verifyEmailExpires?: Date
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await compare(candidatePassword, userPassword);
};

UserSchema.methods.isPasswordChanged = function (JWTTimeStamp: number) {
  if (this.passwordChangedAt)
    if (this.passwordChangedAt.getTime() / 1000 > JWTTimeStamp)
      return true;
  return false;
};

UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password'))
    return next();
  this.password = await hash(this.password, 12);
  next();
});

UserSchema.pre<UserDocument>('save', function (next) {
  if (this.isModified('password') && !this.isNew) {
    this.passwordChangedAt = new Date();
    this.passwordResetToken = undefined;
    this.passwordResetTokenExpires = undefined;
  }
  next();
});

UserSchema.pre<UserDocument>('save', function (next) {
  if (this.isModified('isEmailVerified') && !this.isNew) {
    this.verifyEmailToken = undefined;
    this.verifyEmailExpires = undefined;
  }
  next();
});
