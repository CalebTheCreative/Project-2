module.exports = function(sequelize, DataTypes) {
  const Movies = sequelize.define("Movies", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    watched: DataTypes.BOOLEAN,
    tmdbID: DataTypes.INTEGER
  });

  Movies.associate = function(models) {
    Movies.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Movies;
};
