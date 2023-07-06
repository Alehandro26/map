import db from "../../public/db.json";

export function getData(data) {
    const { points } = db;
    if (points) {
      data.value = points;
    }
}