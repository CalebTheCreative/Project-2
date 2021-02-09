module.exports = function(sequelize, DataTypes) {
  const Cookings = sequelize.define("Cookings", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    cooked: DataTypes.BOOLEAN
  });

  Cookings.associate = function(models) {
    Cookings.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Cookings;
};
