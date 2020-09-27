module.exports = (sequelize, DataTypes) => {
  const ZipQueries = sequelize.define('ZipQueries', {
    zipcode: DataTypes.STRING(20),
  }, {
    tableName: 'zip_queries'
  });

  return ZipQueries;
}