module.exports = function(sequelize, DataTypes) {
  const VideoGames = sequelize.define("VideoGames", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    played: DataTypes.BOOLEAN
  });

  VideoGames.associate = function(models) {
    VideoGames.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return VideoGames;
};
