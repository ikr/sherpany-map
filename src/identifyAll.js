export default function (firstId, objs) {
    return objs.map(o => Object.assign({id: firstId++}, o))
}
