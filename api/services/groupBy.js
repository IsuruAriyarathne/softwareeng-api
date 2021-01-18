exports.groupBy = (items, arr,type) =>{
    let uniqueItems = items.map(item => item['stationID'])
    let result = []
    uniqueItems.forEach(id => {
        let temp = arr.filter(element => element['stationID'] == id)
        let tempObj = {}
        tempObj['stationID'] = id
        tempObj[type] = temp  
        result.push(tempObj)
    });
    return result;
}
exports.groupByAmmunition = (items, arr) =>{
    let uniqueItems = items.map(item => {
        return {'ammoModelID':item['ammoModelID'],'remain':0,'ammoModel':item.name}
    }) //ammoModelID
    arr.forEach(ele =>{
        let index = uniqueItems.findIndex(obj => obj.ammoModelID == ele.ammoModelID)
        uniqueItems[index]['count'] += ele.remain 
    })
    
    return uniqueItems;
}
exports.groupByWeapon = (items, arr) =>{
    let uniqueItems = items.map(item => {
        return {'weaponID':item['weaponModelID'],'count':0,'weaponModel':item.name}   
    })
    arr.forEach(ele =>{
        let index = uniqueItems.findIndex(obj => obj.weaponID == ele.weaponModelID)
        uniqueItems[index]['count'] += 1 
    })
    ;
    return uniqueItems;
}