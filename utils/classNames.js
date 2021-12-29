/**
 * funtion to remove falsies or empty strings from className
 * @param {classess: []}
 * @returns {classes: str}
 */
const classNames = (...classes) => {
  console.log(classes);
  return classes.filter(Boolean).join(" ");
};

export default classNames;
