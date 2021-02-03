module.exports = function(sequelize, DataTypes) {
    const Movies = sequelize.define("Movies", {
        name: { 
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        watched: DataTypes.BOOLEAN,
    });
    return Movies;
  };
  