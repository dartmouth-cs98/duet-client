

export const getAvgObjectInArray = (arr) => {
    // code snippet taken from 
    // https://codereview.stackexchange.com/questions/141530/calculate-average-of-array-of-objects-per-key-value-using-reduce/141533
    // basically averages each key
    let avg = Array.from(arr.reduce(
        (acc, obj) => Object.keys(obj).reduce( 
            (acc, key) => typeof obj[key] == "number"
                ? acc.set(key, (acc.get(key) || []).concat(obj[key]))
                : acc,
        acc),
    new Map()), 
        ([attribute, values]) =>
            ({ attribute, average: values.reduce( (a,b) => a+b ) / values.length })
    );
    return avg
};
