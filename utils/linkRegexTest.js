const RegExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\\/])*)?/;
const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const linkRegexTest = (link) => {
  RegExp.test(link);
};

const emailRegexTest = (email) => {
  emailRegExp.test(email);
}

module.exports = { linkRegexTest, emailRegexTest, RegExp };
