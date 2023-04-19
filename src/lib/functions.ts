export const get_random = (array: any) => array[Math.floor(Math.random()*array.length)]

// replace spaces with underscores for happy images
export const image_url = (string: string) => string.replace(/ /g, "_")