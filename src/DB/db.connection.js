import { Sequelize } from "sequelize";
import chalk from "chalk";
export const sequelize = new Sequelize("homework_5", "root", "", {
    host:"localhost",
    dialect:"mysql"
})

export const testDBConnection = async () => {
    await sequelize.authenticate()
    .then(() => {
        console.log(chalk.green("Database connected successfully"));
    })
    .catch((err) => {
        console.error(chalk.red("Unable to connect to the database:"), err);
    });
}

export const testSync = async () => {
    await sequelize.sync({alter:true,force:false})
    .then(() => {
        console.log(chalk.green("Database synchronized successfully"));
    })
    .catch((err) => {
        console.error(chalk.red("Unable to synchronize with the database:"), err);
    });
}
