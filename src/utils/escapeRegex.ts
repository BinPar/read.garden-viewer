const escapeRegex = (src: string): string => src.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

export default escapeRegex;
