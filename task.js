

const fs = require('fs');
const { argv } = require('process');

const dataFile = fs.readFileSync('./data/helpful-reviews.json', { encoding: 'utf8', flag: 'r' }).split('\n');
const asinStore = {}, errors = [], allMatches = [];
let countArg, taskMode, totalMatches = 0;

if (argv[2] != undefined) {
    taskMode = 'task1';
    countArg = Number(argv[2]);
} else {
    taskMode = 'task2'
}

// store datafile information in object with asin as key
dataFile.forEach(row => {
    try {
        if (!row.length) {
            return;
        }
        const rowData = JSON.parse(row);
        const asinData = rowData['asin'];
        if (!asinStore[asinData]) {
            asinStore[asinData] = {
                // just in case there are different values for title or image for the same ASIN, add to a set - see 'Opportunities' below
                product_title: new Set(),
                main_image_url: new Set(),
                aggregate: 0,
                reviews: []
            };
        }
        const { sentence, helpful, product_title, main_image_url } = rowData;
        asinStore[asinData]['reviews'].push({ sentence, helpful });
        // storing in a set will prevent duplicates
        asinStore[asinData]['product_title'].add(product_title);
        asinStore[asinData]['main_image_url'].add(main_image_url);
    } catch (err) {
        errors.push(err)
        return;
    }
})

// review asin store and calculate as needed, find matches for task 1
Object.keys(asinStore).forEach(asin => {
    asinStore[asin]['aggregate'] = getAggregate(asinStore[asin]['reviews']);
    asinStore[asin]['average'] = getAverage(asinStore[asin]['reviews']);
    if (asinStore[asin].reviews.length === countArg) {
        totalMatches++;
        allMatches.push(`${asin} ## Title: ${Array.from(asinStore[asin].product_title).join(';')}`);
    }
})

// output for task 1 or task 2
if (taskMode === 'task1') {
    console.log("######## TASK 1 ##################################################################")
    // task 1 all products with X reviews
    if (countArg >= 0) {
        if (totalMatches) {
            console.log()
            console.log(`#### Product${(totalMatches > 1) ? 's' : ''} with ${countArg} reviews:`)
            console.log()
            console.log(allMatches.join('\n'))
        }
        console.log()
        console.log(`#### Found ${totalMatches} match${(totalMatches > 1) ? 'es' : ''} for ${countArg} reviews.`)
        console.log()
    } else {
        console.log(`Cound not process TASK 1 with argument: ${argv[2]}`)
    }
} else {
    console.log("######## TASK 2 ##################################################################")
    // task 2  display all products sorted by highest to lowest aggregate
    const sortedKeys = Object.keys(asinStore).sort((a, b) => {
        return asinStore[b]['aggregate'] - asinStore[a]['aggregate'];
    })

    sortedKeys.forEach((asin) => {
        const { aggregate, average, product_title } = asinStore[asin];
        console.log(asin, `## Title: ${Array.from(product_title).join(';')} ## Aggregate ${aggregate} ## Average: ${average}`)
    })
}

// any errors?
if (errors.length) {
    console.log({ errors })
}

/**
 * Get aggregate of reviews for a single ASIN
 * @param {*} reviews 
 * @returns aggregate of reviews
 */
function getAggregate(reviews) {
    const aggregate = reviews.reduce((aggregate, thisreview) => {
        if (Number(thisreview.helpful) > 0) {
            aggregate += thisreview.helpful
        }
        return aggregate
    }, 0);
    return parseInt(aggregate * 100) / 100
}

/**
 * Get average of reviews for a single ASIN
 * @param {*} reviews 
 * @returns average of reviews
 */
function getAverage(reviews) {
    const aggregate = getAggregate(reviews);
    if (aggregate > 0) {
        return parseInt(aggregate / reviews.length * 100) / 100
    }
    return 0;
}

