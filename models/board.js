module.exports = function(sequelize, DataTypes) {
    const Board = sequelize.define("Board", {
        name: { 
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        played: DataTypes.BOOLEAN,
    });
    return Board;
  };
  