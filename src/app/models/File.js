import  {Model} from'sequelize';
import Sequelize from'sequelize';
import urlConfig from'../../config/url';



class File extends Model {
  static init (sequelize) {
    super.init({
      name: Sequelize.STRING,
      path: Sequelize.STRING,
      url: {
        type: Sequelize.VIRTUAL, get() { return process.env.APP_URL+'/files/'+this.path; }
      }
    },
    {
      sequelize,
    });
    console.log(urlConfig.port);
    return this;
  }
}

export default File;