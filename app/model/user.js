'use strict';
module.exports = app => {
  const { DATE, STRING, UUID, INTEGER } = app.Sequelize;
  const User = app.model.define('g_user', {
    id: {
      type: UUID,
      primaryKey: true,
      allowNull: false,
    },
    roleId: {
      type: INTEGER(1),
      allowNull: false,
      defaultValue: 1,
      field: 'role_id',
    },
    gender: {
      type: INTEGER(1),
      allowNull: true,
      defaultValue: 1,
    },
    status: {
      type: INTEGER(1),
      allowNull: false,
      defaultValue: 1,
    },
    username: STRING(100),
    nickname: STRING(100),
    password: STRING(100),
    avatar: STRING(1000),
    email: STRING(1000),
    phone: STRING(1000),
    ip: STRING(1000),
    created_at: DATE,
    updated_at: DATE,
  }, {
    freezeTableName: true, // 非复数
    tableName: 'g_user',
  });

  return User;
};
