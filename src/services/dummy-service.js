const helper = () => {
    const num = Math.floor(Math.random() * 10);
    return num%2==0;
}

const execute = () => {
    const result = helper();
    if (result) {
        return "The number is even";
    } else {
        return "The number is odd";
    }
}

module.exports = {
    helper,
    execute
}