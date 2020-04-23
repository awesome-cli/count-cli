export const isHidden = (file: string) => /(^|\/)\.[^\/\.]/g.test(file);
