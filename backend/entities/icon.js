import typeorm from 'typeorm';

const Icon = new typeorm.EntitySchema({
  name: 'Icon',
  columns: {
    icon_id: {
      primary: true,
      type: Number,
      generated: true,
    },
    link: {
      type: String,
      unique: true,
    },
  },
});

export default Icon;
