export default function CustomError(message: any){
    console.error(message)
    throw new Error(message)

}