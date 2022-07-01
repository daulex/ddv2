
export const array_move = (arr, old_index, new_index) => {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        let k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
};

export function findGetParameter(parameterName) {
    let result = null,
        tmp = [];
    window.location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}


export function key_to_date(key){
    let res = key.split("_");

    res = new Date( Date.parse(`${res[1]}-${res[2]}-${res[3]}`) );

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return res.toLocaleDateString(undefined, options);
}

// export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// motivational quotes
export const notices_praise = [
    "Amazing! You've completed your goal.",
    "You're doing great!",
    "One step closer to your goal!",
    "Keep it up!",
    "Kick ass",
    "You're awesome!",
    "Sweet!"
];