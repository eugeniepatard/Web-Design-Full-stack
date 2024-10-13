import typeorm from 'typeorm';

const User = new typeorm.EntitySchema({
  name: 'User',
  columns: {
    user_id: {
      primary: true,
      type: Number,
      generated: true,
    },
    email: {
      type: String,
      unique: true,
    },
    firstname: { type: String },
    lastname: { type: String },
    icon_id: { type: Number, nullable: true },
    password: { type: String },
    ratings: { type: String, nullable: true },
  },
});

export default User;
