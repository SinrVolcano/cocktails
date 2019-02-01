export const parseMeasure = (measure: string): string => {
    const findCountrRegexp = /\d+ \d+\/\d+|\d+\/\d+|\d+/g;
    const findMeasureName = /\s(qt|cl|tsp|tblsp|cup|oz|shot|jigger|lb)(?![a-z][^s])/g;
    const count: Array<string> | null = (measure).match(findCountrRegexp);
    const measureName: Array<string> | null = (measure).match(findMeasureName);
    if (!count || !measureName) {
        return measure;
    }
    const decimalCount: number = mixedNumberToDecimal(count[0]);
    const newMeasure = convertToMetricMeasure(measureName[0].trim(), decimalCount);
    console.log(newMeasure)
    return measure.replace(findCountrRegexp, newMeasure.count).replace(findMeasureName, ` ${newMeasure.name}`);
}


const convertToMetricMeasure = 
    (measureName: string, measureCount: number): {count: string, name: string} => {
    let count = null;
    let name = 'мл';
    switch(measureName) {
        case 'oz':
            count = measureCount * 30;            
            break;
        case 'qt':
            count = measureCount * 950;
            break;            
        case 'cl':
            count = measureCount * 10;
            break;
        case 'tsp':
        case 'tblsp':
            count = measureCount;
            name = 'чайная ложка';
            break;
        case 'cup':
            count = measureCount * 240;
            break;
        case 'shot':
        case 'jigger':
            count = measureCount * 45;
            break;
        case 'lb':
            count = measureCount * 450;
            name = 'г';
            break;
        case 'ml':
            name = 'мл';
            break;            
        default:
            count = null;
            name = '';
            break;
    }
    console.log(count);
    console.log(name)
    return {
        count: count ? count.toString() : '',
        name,
    }
}

const mixedNumberToDecimal = (count: string): number => {
    const numbers = count.split(/[\s\/]/g).map(num => parseInt(num));
    if (numbers.length === 1) {
        return numbers[0];
    } else if(numbers.length === 2) {
        return numbers[0] / numbers[1]
    }
    return numbers[0] + numbers[1] / numbers[2];
}

