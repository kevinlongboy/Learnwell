/*************************************** PROFILE PICTURES ***************************************/
import Blair from "../assets/profile-pictures/Blair.png"
import Chuck from "../assets/profile-pictures/Chuck.png"
import Dan from "../assets/profile-pictures/Dan.png"
import Default from "../assets/profile-pictures/Default.png"
import Demo from "../assets/profile-pictures/Demo.png"
import Dorota from "../assets/profile-pictures/Dorota.png"
import Eric from "../assets/profile-pictures/Eric.png"
import Georgina from "../assets/profile-pictures/Georgina.png"
import Ivy from "../assets/profile-pictures/Ivy.png"
import Jenny from "../assets/profile-pictures/Jenny.png"
import Lola from "../assets/profile-pictures/Lola.png"
import Nate from "../assets/profile-pictures/Nate.png"
import Nelly from "../assets/profile-pictures/Nelly.png"
import Serena from "../assets/profile-pictures/Serena.png"
import Vanessa from "../assets/profile-pictures/Vanessa.png"

export const profilePictures = [
    { name: "Blair", url: Blair },
    { name: "Chuck", url: Chuck },
    { name: "Dan", url: Dan },
    { name: "Demo", url: Demo },
    { name: "Default", url: Default },
    { name: "Dorota", url: Dorota },
    { name: "Eric", url: Eric },
    { name: "Georgina", url: Georgina },
    { name: "Ivy", url: Ivy },
    { name: "Jenny", url: Jenny },
    { name: "Lola", url: Lola },
    { name: "Nate", url: Nate },
    { name: "Nelly", url: Nelly },
    { name: "Serena", url: Serena },
    { name: "Vanessa", url: Vanessa },  
];


/*************************************** ACCOUNT ITEMS ***************************************/
export const accountItems = [
    {id: 1, name: "My Discussions"},
    {id: 2, name: "Profile"},
    {id: 3, name: "Log Out"},
];


/*************************************** VALIDATE URL ***************************************/
export function validateUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
}


/*************************************** NORMALIZE ARRAY ***************************************/
// normalize function to turn array of objects into object of objects:
// uses "id" specifically as key
// { 1: { id: 1, ...}, 2: { id: 2, ...}, 3: { id: 3 ...}, ... }
export function normalizeArray(arr) {
    let obj = {};
    if (Array.isArray(arr)) arr.forEach(el => obj[el.id] = el);
    return obj;
};


/******************************* STATE ABBREVIATIONS *******************************/
// Great for controlled inputs
export const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA',
    'CZ', 'CO', 'CT', 'DE', 'DC',
    'FL', 'GA', 'GU', 'HI', 'ID',
    'IL', 'IN', 'IA', 'KS', 'KY',
    'LA', 'ME', 'MD', 'MA', 'MI',
    'MN', 'MS', 'MO', 'MT', 'NE',
    'NV', 'NH', 'NJ', 'NM', 'NY',
    'NC', 'ND', 'OH', 'OK', 'OR',
    'PA', 'PR', 'RI', 'SC', 'SD',
    'TN', 'TX', 'UT', 'VT', 'VI',
    'VA', 'WA', 'WV', 'WI', 'WY'
];


/************************************ GET CURRENT DATE IN "CCYY-DD-YY" *************************************/
export function getTodayISO(arr) {

    const todayRaw = new Date();
    const todayISORaw = todayRaw.toISOString();
    const todayISO = todayISORaw.slice(0, 10)

    return todayISO
}


/*********************************** CONVERT ISO STRING TO "Month Year" ************************************/
export function convertDate(iso) {

    let year = iso.slice(0, 4);
    let month = iso.slice(5, 7);

    if (month === 1) {
        month = 'January'
    } else if (month === 2) {
        month = 'February'
    } else if (month === 3) {
        month = 'March'
    } else if (month === 4) {
        month = 'April'
    } else if (month === 5) {
        month = 'May'
    } else if (month === 6) {
        month = 'June'
    } else if (month === 7) {
        month = 'July'
    } else if (month === 8) {
        month = 'August'
    } else if (month === 9) {
        month = 'September'
    } else if (month === 10) {
        month = 'October'
    } else if (month === 11) {
        month = 'November'
    } else if (month === 12) {
        month = 'December'
    }

    return month.concat(' ', year)
    // Output: "January 2024"
}

/*********************************** CONVERT ISO STRING TO "Month Day, Year" ************************************/
export function convertExactDate(iso) {

    let year = iso.slice(0, 4);
    let month = parseInt(iso.slice(5, 7));
    let day = iso.slice(8, 10);

    if (month === 1) {
        month = 'January'
    } else if (month === 2) {
        month = 'February'
    } else if (month === 3) {
        month = 'March'
    } else if (month === 4) {
        month = 'April'
    } else if (month === 5) {
        month = 'May'
    } else if (month === 6) {
        month = 'June'
    } else if (month === 7) {
        month = 'July'
    } else if (month === 8) {
        month = 'August'
    } else if (month === 9) {
        month = 'September'
    } else if (month === 10) {
        month = 'October'
    } else if (month === 11) {
        month = 'November'
    } else if (month === 12) {
        month = 'December'
    }

    if (day.length === 2 && day[0] === '0') {
        day = day[1]
    }

    return `${month} ${day}, ${year}`
    // Output: "January 1, 2024"
}


/*********************************** CONVERT ISO STRING TO "Mon DD" ************************************/
export function convertInformalDate(iso) {

    let month = iso.slice(5, 7);
    let day = iso.slice(8, 10);

    if (month === 1) {
        month = 'Jan'
    } else if (month === 2) {
        month = 'Feb'
    } else if (month === 3) {
        month = 'Mar'
    } else if (month === 4) {
        month = 'Apr'
    } else if (month === 5) {
        month = 'May'
    } else if (month === 6) {
        month = 'Jun'
    } else if (month === 7) {
        month = 'Jul'
    } else if (month === 8) {
        month = 'Aug'
    } else if (month === 9) {
        month = 'Sep'
    } else if (month === 10) {
        month = 'Oct'
    } else if (month === 11) {
        month = 'Nov'
    } else if (month === 12) {
        month = 'Dec'
    }

    if (day[0] === '0') {
        day = day[1]
    }

    return `${month} ${day}`
    // Output: "Jan 1"
}

/*********************************** CONVERT ISO STRING TO "Mon DD" ************************************/
export function convertSemiFormalDate(iso) {

    let year = iso.slice(0, 4);
    let month = iso.slice(5, 7);
    let day = iso.slice(8, 10);

    if (month === 1) {
        month = 'Jan'
    } else if (month === 2) {
        month = 'Feb'
    } else if (month === 3) {
        month = 'Mar'
    } else if (month === 4) {
        month = 'Apr'
    } else if (month === 5) {
        month = 'May'
    } else if (month === 6) {
        month = 'Jun'
    } else if (month === 7) {
        month = 'Jul'
    } else if (month === 8) {
        month = 'Aug'
    } else if (month === 9) {
        month = 'Sep'
    } else if (month === 10) {
        month = 'Oct'
    } else if (month === 11) {
        month = 'Nov'
    } else if (month === 12) {
        month = 'Dec'
    }

    // if (day[0] === '0') {
    //     day = day[1]
    // }

    return `${month}. ${day}, ${year}`
    // Output: "Jan. 1, 2024"
}


/****************************** CALCULATE NUMBER OF DAYS BETWEEN TO DATES ******************************/
export function calculateNumberOfDays(startDate, endDate) {
    // To set two dates to two variables
    var date1 = new Date(startDate);
    var date2 = new Date(endDate);

    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    //To display the final no. of days (result)
    return Difference_In_Days
}
// courtesy: GeeksForGeeks:
// https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/


/************************************ CALCULATE TOTAL COST OF STAY *************************************/
export function calculateGrandTotal(subtotal) {
    let cleaning = 25
    let service = 50

    let total = cleaning + service + subtotal

    return total
}
