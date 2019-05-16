function calculatePlanetTravelTime(p1_x : number, p1_y : number, p2_x : number, p2_y : number)
{
    let distSquare = (p1_x - p2_x) * (p1_x - p2_x) + (p1_y - p2_y) * (p1_y - p2_y);
    let dist = Math.round(Math.sqrt(distSquare));

    return dist;
}

export {calculatePlanetTravelTime };
