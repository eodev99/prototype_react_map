class AreaGroup{
    constructor(uid, color, areas){
        this.uid = uid
        this.color = color;
        this.areas = areas; //array of areas in the group
    }

    addArea(areaId) {
        this.areas.push(areaId)
    }

    removeArea(areaId) {
        this.areas.filter((area) => area !== areaId)
    }

    getAreas(){
        return this.areas
    }
}

export default AreaGroup