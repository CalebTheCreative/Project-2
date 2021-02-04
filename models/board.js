module.exports = function(sequelize, DataTypes) {
  const Board = sequelize.define("Board", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    played: DataTypes.BOOLEAN
  });

  Board.associate = function(models) {
    Board.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Board;
};
