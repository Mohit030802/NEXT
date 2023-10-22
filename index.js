const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const _ = require('lodash');
const FILE_PATH = './data.json';

const makeCommit = async (n) => {
    if (n === 0) {
        await simpleGit().push();
        return;
    }

    // Generate a random day within June 2023 (from 1st to 30th).
    const day = _.random(1, 30);
    
    // Set the month and year to June 2023 and use the random day.
    const DATE = moment(`2023-6-${day}`, 'YYYY-MM-DD').format();

    const data = {
        date: DATE
    }

    console.log(DATE);

    jsonfile.writeFile(FILE_PATH, data, (err) => {
        if (err) {
            console.error(err);
        } else {
            simpleGit()
                .add([FILE_PATH])
                .commit(DATE, { '--date': DATE })
                .then(() => makeCommit(n - 1));
        }
    });
};

makeCommit(20);