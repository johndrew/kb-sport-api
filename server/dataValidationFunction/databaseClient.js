const Sequelize = require('sequelize');
const {
  lte: lessThanOrEqual,
  eq: equal,
} = Sequelize.Op;
const logger = require('../../logger');

class DatabaseClient {
  constructor() {
    this.instance = null;
    this.rankingTableModel = null;
    this.rankingTypeModel = null;
  }

  defineModels() {
    this.rankingTypeModel = this.instance.define('RankingTypes', {
      PriorityWeight: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      RankingTypeName: {
        type: Sequelize.STRING,
      },
    }, {
      timestamps: false,
    });
    this.rankingTableModel = this.instance.define('RankingTable', {
      MinimumRepetitions: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      Ranking: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      EventType: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      Duration: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      WeightCategory: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      KettlebellWeight: {
        type: Sequelize.INTEGER,
      },
      Division: {
        type: Sequelize.STRING,
      },
      Gender: {
        type: Sequelize.STRING,
        primaryKey: true,
      }
    }, {
      freezeTableName: true,
      timestamps: false,
    });
  }

  defineRelationships() {
    this.rankingTableModel.belongsTo(this.rankingTypeModel, {
      foreignKey: 'Ranking',
    });

    this.rankingTypeModel.hasMany(this.rankingTableModel, {
      foreignKey: 'PriorityWeight',
    });
  }

  async setup() {
    logger.info('Setting up database connection');
    this.instance = new Sequelize('rankingTable2018', 'root', 'password', {
      host: 'localhost',
      port: 3306,
      dialect: 'mysql',
    });

    logger.info('Authenticating database');
    await this.instance.authenticate();

    logger.info('Defining models');
    this.defineModels();

    logger.info('Defining Relationships');
    this.defineRelationships();
  }

  async close() {
    await this.instance.close();
  }

  async getRanking({ weightClass, gender, event, duration, kettlebellWeight, repetitions } = {}) {
    const rankingTableId = 'Ranking';
    const result = await this.rankingTableModel.findAll({
      limit: 1,
      order: [rankingTableId],
      attributes: [rankingTableId],
      include: [
        {
          model: this.rankingTypeModel,
        }
      ],
      where: {
        MinimumRepetitions: {
          [lessThanOrEqual]: repetitions,
        },
        EventType: {
          [equal]: event,
        },
        Duration: {
          [equal]: duration,
        },
        WeightCategory: {
          [equal]: weightClass,
        },
        KettlebellWeight: {
          [equal]: kettlebellWeight,
        },
        Gender: {
          [equal]: gender,
        },
      },
    });
    if (!result) {
      logger.warn('No data returned');
      return null;
    }
    if (result.length == 0) {
      logger.warn('No results found');
      return null;
    }
    const priorityWeight = result[0].dataValues[rankingTableId];

    const rankingTypeNameId = 'RankingTypeName';
    const rankingName = await this.rankingTypeModel.findOne({
      attributes: [rankingTypeNameId],
      where: {
        PriorityWeight: priorityWeight,
      }
    });

    return rankingName.dataValues[rankingTypeNameId];
  }

  async getRankings(listOfSearchParams) {
    return Promise.all(listOfSearchParams.map(this.getRanking.bind(this)));
  }
}

module.exports = new DatabaseClient();
