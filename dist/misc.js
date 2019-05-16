function calculatePlanetTravelTime(p1_x, p1_y, p2_x, p2_y) {
    let distSquare = (p1_x - p2_x) * (p1_x - p2_x) + (p1_y - p2_y) * (p1_y - p2_y);
    let dist = Math.round(Math.sqrt(distSquare));
    return dist;
}
export { calculatePlanetTravelTime };
