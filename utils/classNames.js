/**
 * function to remove falsies or empty strings from className
 * @param {classes: []}
 * @returns {classes: str}
 */
const classNames = (...classes) => classes.filter(Boolean).join(" ");
export default classNames;
