export const jsonLoader = (source) => {
    return `export default ${JSON.stringify(source)}`
};
