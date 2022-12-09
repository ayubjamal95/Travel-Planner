interface IStopStations{

    id: number
    type: string
}
interface IAddress{

    address: string
    longitude: number
    latitude: number
    type: string
}
interface IPoi{
    id: number
    longitude: number
    latitude: number
    type: string
}

export {IStopStations, IAddress,IPoi}