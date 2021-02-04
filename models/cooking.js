module.exports = function(sequelize, DataTypes) {
  const Cooking = sequelize.define("Cooking", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    cooked: DataTypes.BOOLEAN
  });

  Cooking.associate = function(models) {
    Cooking.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Cooking;
};
